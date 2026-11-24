import { PageBridge } from "./page-bridge.js";

export const OASIS_UI_EDITOR_BRIDGE_KEY = "__OASIS_UI_EDITOR_BRIDGE__";

export interface OasisBridgeAvailability {
  available: boolean;
  readonly: boolean;
  componentCount: number;
  nodeCount: number;
}

export interface OasisBridgeNodeDetails {
  nodeId: string;
  type: string;
  displayName: string;
  name: string;
  props: Record<string, unknown>;
  parentId: string | null;
  childIds: string[];
  linkedNodes: Record<string, string>;
  linkedNodeIds: string[];
  isCanvas: boolean;
  hidden: boolean;
  metadata: unknown;
}

export interface OasisBridgeSnapshot {
  selectedNodeId: string | undefined;
  serializedNodes: Record<string, any>;
  metadata: Record<string, any>;
}

export interface OasisBridgeResult<T = any> {
  ok: boolean;
  data?: T;
  code?: string;
  message?: string;
  mutationState?: string;
}

/**
 * 针对 Oasis 前端编辑器 window.__OASIS_UI_EDITOR_BRIDGE__ 的强类型操作封装
 */
export class OasisEditorBridge {
  constructor(public readonly pageBridge: PageBridge) {}

  /**
   * 等待页面上的编辑器 Bridge 初始化就绪
   */
  public async waitForReady(timeoutMs = 15000): Promise<void> {
    await this.pageBridge.waitForFunction(
      `Boolean(window.${OASIS_UI_EDITOR_BRIDGE_KEY} && window.${OASIS_UI_EDITOR_BRIDGE_KEY}.getAvailability().ok)`,
      { timeoutMs }
    );
  }

  /**
   * 通用调用封装：自动校验返回值中的 ok: true / false
   */
  private async invokeBridgeMethod<T = any>(methodName: string, args: any[] = []): Promise<T> {
    const res = await this.pageBridge.callWindowMethod<OasisBridgeResult<T>>(
      `${OASIS_UI_EDITOR_BRIDGE_KEY}.${methodName}`,
      args
    );

    if (!res) {
      throw new Error(`Oasis Bridge 方法调用无返回值: ${methodName}`);
    }

    if (res.ok === false) {
      throw new Error(`[OasisEditorBridge ${res.code || "ERROR"}] ${res.message || "未知错误"}`);
    }

    return res.data as T;
  }

  /**
   * 获取当前编辑器可用状态
   */
  public async getAvailability(): Promise<OasisBridgeAvailability> {
    return this.invokeBridgeMethod<OasisBridgeAvailability>("getAvailability");
  }

  /**
   * 获取整树快照
   */
  public async getSnapshot(): Promise<OasisBridgeSnapshot> {
    return this.invokeBridgeMethod<OasisBridgeSnapshot>("getSnapshot");
  }

  /**
   * 获取指定节点详情
   */
  public async getNode(nodeId: string): Promise<OasisBridgeNodeDetails> {
    return this.invokeBridgeMethod<OasisBridgeNodeDetails>("getNode", [nodeId]);
  }

  /**
   * 获取当前选中的节点 ID
   */
  public async getSelectedNode(): Promise<{ selectedNodeId: string | undefined }> {
    return this.invokeBridgeMethod<{ selectedNodeId: string | undefined }>("getSelectedNode");
  }

  /**
   * 列出所有支持的组件清单
   */
  public async listComponents(): Promise<{ components: any[] }> {
    return this.invokeBridgeMethod<{ components: any[] }>("listComponents");
  }

  /**
   * 获取指定组件类型的详细元数据与属性配置
   */
  public async getComponentMetadata(componentType?: string): Promise<{ components: any[] }> {
    return this.invokeBridgeMethod<{ components: any[] }>("getComponentMetadata", [componentType]);
  }

  /**
   * 插入一个新组件
   */
  public async addComponent(input: {
    componentType: string;
    parentId: string;
    index?: number;
    props?: Record<string, unknown>;
    canvas?: boolean;
  }): Promise<{ nodeId: string; node: OasisBridgeNodeDetails }> {
    return this.invokeBridgeMethod("addComponent", [input]);
  }

  /**
   * 移动节点
   */
  public async moveNode(input: {
    nodeId: string;
    parentId: string;
    index: number;
  }): Promise<{ nodeId: string; parentId: string; index: number }> {
    return this.invokeBridgeMethod("moveNode", [input]);
  }

  /**
   * 局部更新节点的 props
   */
  public async setNodeProps(
    nodeId: string,
    patch: Record<string, unknown>
  ): Promise<OasisBridgeNodeDetails> {
    return this.invokeBridgeMethod("setNodeProps", [nodeId, patch]);
  }

  /**
   * 删除节点
   */
  public async deleteNode(nodeId: string): Promise<{ nodeId: string }> {
    return this.invokeBridgeMethod("deleteNode", [nodeId]);
  }

  /**
   * 批量执行编辑操作
   */
  public async applyMutations(input: {
    operations: any[];
  }): Promise<{ nodes: Record<string, OasisBridgeNodeDetails> }> {
    return this.invokeBridgeMethod("applyMutations", [input]);
  }

  /**
   * 触发画布内某节点的文字点击
   */
  public async clickNodeElementByText(input: {
    nodeId: string;
    text: string;
    match?: "exact" | "contains";
  }): Promise<any> {
    return this.invokeBridgeMethod("clickNodeElementByText", [input]);
  }

  /**
   * 撤销
   */
  public async undo(): Promise<any> {
    return this.invokeBridgeMethod("undo");
  }

  /**
   * 重做
   */
  public async redo(): Promise<any> {
    return this.invokeBridgeMethod("redo");
  }
}
