import { PageBridge } from "./page-bridge.js";

export interface OpenBlankCanvasResult {
  success: boolean;
  message: string;
  nodeCount: number;
}

export interface OpenBlankCanvasOptions {
  editorUrl?: string;
}

/**
 * 在当前 Oasis IDE 中自动执行【工程 -> 开始工作 -> (若有弹窗确认) -> 新建空白页面】的完整流程，
 * 并等待画布通信 Bridge (__OASIS_UI_EDITOR_BRIDGE__) 初始化就绪。
 */
export async function openBlankCanvas(
  pageBridge: PageBridge,
  options: OpenBlankCanvasOptions = {}
): Promise<OpenBlankCanvasResult> {
  // 0. 若当前页面仍停留在空白页 (about:blank)，仅在配置了 editorUrl 时自动导航；否则提示用户打开并登录 IDE
  const currentHref = await pageBridge.evaluate<string>("location.href").catch(() => "about:blank");
  if (currentHref.startsWith("about:") || currentHref === "" || currentHref === "about:blank") {
    if (!options.editorUrl) {
      throw new Error(
        "当前浏览器停留在空白页，且 oasis.config.json 未配置 editorUrl。请先在已打开的 Chrome 窗口中访问对应的 Oasis IDE 地址并完成登录，或在 oasis.config.json 中配置 editorUrl 后重试。"
      );
    }
    await pageBridge.evaluate(`location.href = ${JSON.stringify(options.editorUrl)}`);
    await new Promise((r) => setTimeout(r, 2500));
    await pageBridge.waitForFunction("Boolean(document.body)", { timeoutMs: 15000 });
  }

  // 1. 检查当前是否已经停留在工作空间面板（已有“新建空白页面”在视口中）
  const isOpPanel = await pageBridge.evaluate<boolean>(`(() => {
    const el = Array.from(document.querySelectorAll("*"))
      .find(e => (e.innerText || "").trim() === "新建空白页面" && e.children.length === 0);
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  })()`);

  // 2. 若不在操作面板上，从左上角菜单开始进入
  if (!isOpPanel) {
    // 2.1 点击【工程】菜单
    const clickProject = await pageBridge.evaluate<{ success: boolean; reason?: string }>(`(() => {
      const el = document.querySelector(".menubar_projectMenu__6e2_s .p-menuitem-link") ||
                 Array.from(document.querySelectorAll(".p-menuitem-link, .p-menuitem-text"))
                   .find(e => (e.innerText || "").trim() === "工程");
      if (!el) return { success: false, reason: "未在顶部菜单栏找到【工程】" };
      (el.closest("a") || el).click();
      return { success: true };
    })()`);

    if (!clickProject.success) {
      throw new Error(clickProject.reason);
    }

    // 等待子菜单动画展开
    await new Promise((r) => setTimeout(r, 400));

    // 2.2 点击【开始工作】
    const clickStart = await pageBridge.evaluate<{ success: boolean; reason?: string }>(`(() => {
      const el = Array.from(document.querySelectorAll(".p-menuitem-text, .p-menuitem-label, .p-menuitem-link"))
        .find(e => (e.innerText || "").trim() === "开始工作");
      if (!el) return { success: false, reason: "未在菜单中找到【开始工作】选项" };
      (el.closest("a") || el).click();
      return { success: true };
    })()`);

    if (!clickStart.success) {
      throw new Error(clickStart.reason);
    }

    // 等待对话框或操作面板弹出
    await new Promise((r) => setTimeout(r, 600));

    // 2.3 检查是否弹出了“创建工作空间...确定要丢弃旧的工作空间”二次确认弹窗
    await pageBridge.evaluate(`(() => {
      const acceptBtn = document.querySelector(".p-confirm-dialog-accept, .menubar_confirmDialogCreateWorkspace__JoEGY .p-confirm-dialog-accept");
      if (acceptBtn) {
        acceptBtn.click();
      }
    })()`);

    // 等待旧工作空间卸载并展示操作面板
    await new Promise((r) => setTimeout(r, 800));
  }

  // 3. 点击【新建空白页面】操作卡片
  const clickNewBlank = await pageBridge.evaluate<{ success: boolean; x?: number; y?: number; reason?: string }>(`(() => {
    const textEl = Array.from(document.querySelectorAll("*"))
      .find(e => (e.innerText || "").trim() === "新建空白页面" && e.children.length === 0);
    if (!textEl) return { success: false, reason: "未在操作面板上找到【新建空白页面】选项" };
    
    const card = textEl.closest(".WorkspaceOperationPanel_operation__g5JIE, .p-card, div") || textEl;
    const r = card.getBoundingClientRect();
    return {
      success: true,
      x: r.x + r.width / 2,
      y: r.y + r.height / 2
    };
  })()`);

  if (!clickNewBlank.success) {
    throw new Error(clickNewBlank.reason);
  }

  // 使用 CDP 真实硬件鼠标点击事件，确保 React 合成事件完美触发
  if (clickNewBlank.x && clickNewBlank.y) {
    await pageBridge.connection.send("Input.dispatchMouseEvent", {
      type: "mousePressed",
      x: clickNewBlank.x,
      y: clickNewBlank.y,
      button: "left",
      clickCount: 1,
    });
    await pageBridge.connection.send("Input.dispatchMouseEvent", {
      type: "mouseReleased",
      x: clickNewBlank.x,
      y: clickNewBlank.y,
      button: "left",
      clickCount: 1,
    });
  }

  // 4. 轮询等待画布通信 Bridge 就绪 (最多等待 15 秒)
  const startTime = Date.now();
  while (Date.now() - startTime < 15000) {
    const ready = await pageBridge.evaluate<{ available: boolean; nodeCount: number }>(`(() => {
      const b = window.__OASIS_UI_EDITOR_BRIDGE__;
      if (!b) return { available: false, nodeCount: 0 };
      const avail = b.getAvailability();
      return {
        available: Boolean(avail && avail.ok && avail.data?.available),
        nodeCount: avail?.data?.nodeCount || 0
      };
    })()`);

    if (ready.available) {
      return {
        success: true,
        message: `已成功创建并进入新空白页面画布，Bridge 通信已就绪 (当前节点数: ${ready.nodeCount})`,
        nodeCount: ready.nodeCount,
      };
    }
    await new Promise((r) => setTimeout(r, 500));
  }

  throw new Error("点击【新建空白页面】后，画布 Bridge 未能在 15 秒内就绪，请检查画布渲染状态");
}
