# Oasis 配置器左侧「函数/常量」速查表

在 Oasis 变量 / JS 编辑器（`JSExpression`、`JSFunction`、事件 `code`、`ServiceData.customFunction`）中，左侧「函数/常量」面板提供的全局对象与函数可直接调用（类型定义见 [runtime-globals.ts](./runtime-globals.ts)）。

> 对应 Oasis 源码：
> - `oasis-tools/.../configurators/advanced/function-metadata/`
> - `base/src/client/script/index.ts` (`RuntimeScriptType`)

---

## 1. 总览清单

| 全局标识 | 编辑器显示名称 | 类型 | 核心成员 / 签名 |
| :--- | :--- | :--- | :--- |
| **`confirm`** | 确认框 | 对象 | `showConfirm({ title, content, onOk, onCancel })`、`updateConfirm(...)`、`closeConfirm()` |
| **`env`** | 环境变量 | 对象 | `NEXT_PUBLIC_LOGIN_URL`、`APP_CODE` |
| **`excel`** | excel工具 | 对象 | `excelJsonToExcel({ header, data, filename?, merges?, autoWidth? })` |
| **`flow`** | 流 | 对象 | `flows`、`currentFlow`、`checkBeforeExecuteFlow`、`start`、`commit`、`rollback`、`terminate`、`retry`、`syncStartByDefId`、`syncStart`、`syncCommit`、`syncRollback`、`syncTerminate`、`syncRetry` |
| **`lib`** | 工具包 | 对象 | `lodash`、`dayjs`、`downloadFile(fileId, fileName?)` |
| **`locale`** | 国际化 | 对象 | `current`、`languages`、`change(lang)` |
| **`action`** | 动作 | 对象 | `exec({ actionCode, input })` |
| **`request`** | 网络请求 | 函数 | `request({ url, method?, params?, body? }).then(res => ...)` |
| **`streamRequest`** | 流式请求 | 函数/对象 | `{ post, get, loading, abort }` |
| **`sendMessage`** | 提示消息 | 函数 | `sendMessage(content, level?)`（`info` / `success` / `warning` / `error` / `loading`） |
| **`user`** | 登录用户 | 对象 | `id`、`name`、`permissions`、`roles`、`language`、`positions.primaryPosition` / `currentPosition`（含 `positionId`、`positionName`、`buId`、`buName`、`buCode`、`characterId`） |
| **`siteConfig`** | 站点配置 | 对象 | `tenantId`、`siteId`、`name`、`siteName`、`sitePath`、`siteCookieDomain`、`characterType`、`siteEnable`、`resources` |
| **`router`** | 内置路由跳转 | 对象 | `push(href, newTab?)`、`replace(href)`、`back()`、`remove()`、`searchParams`、`location`、`buildUrl(pathname, params, oriParams?, mergeStrategy?)` |
| **`nativeRouter`** | 浏览器跳转 | 对象 | `push(url)`、`replace(url)`、`back()`、`forward()`、`refresh()`、`prefetch(url)` |
| **`pageTag`** | 页签管理 | 函数/对象 | `const { updateTitle } = pageTag; updateTitle(title, path?)` |
| **`packagingProgress`** | `packagingProgress` | 对象 | `show(params?)`、`close()` |
| **`engineProgress`** | `engineProgress` | 对象 | `show(params?)`、`close()` |
| **`send`** | `send` | 对象 | `show(params?)`、`close()` |

---

## 2. 高频使用示例

### 2.1 网络请求与轻提示
```js
const res = await request({
  url: "/com/TZConsumerLeads/TZConsumerLeads/searchList",
  method: "GET",
  params: {
    tzParams: JSON.stringify({ resultFld: "Id,Name", page: 1, limit: 20 }),
  },
});
sendMessage("加载成功", "success");
```
> 注意：`request` 的 `url` **省略 `/api` 前缀**。

### 2.2 确认框与二次确认
```js
confirm.showConfirm({
  title: "确认删除",
  content: "删除后不可恢复，是否继续？",
  onOk: async () => {
    await request({ url: "/com/bm/be/deleteObj/" + id, method: "POST", body: { dataset: "" } });
    sendMessage("删除成功", "success");
  },
});
```

### 2.3 路由跳转与读取 URL 参数
```js
const id = router?.searchParams?.get("Id");
// 当前 App 内部页签打开
router.push(router.buildUrl("/lead/detail", { Id: id }));
// 第二个参数 newTab = true 时在浏览器新标签页打开
router.push(router.buildUrl("/lead/detail", { Id: id }), true);
```

### 2.4 更新页签标题与文件下载
```js
pageTag.updateTitle("线索详情 - " + (context.leadDetail?.Name || ""));
lib.downloadFile(fileId, "导出报表.xlsx");
```

### 2.5 流式请求
```js
const { post, loading, abort } = streamRequest;
post(
  { url: "/ai/chat/stream", body: { prompt: "你好" } },
  { onReceived: (chunk) => { /* 处理流式分片 */ } },
);
```
