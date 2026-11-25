import { describe, it, expect } from "vitest";
import { allOasisTools } from "../src/tools/oasis-editor-tools.js";

describe("oasis-editor-tools tests", () => {
  it("should define all standard oasis tools with zod schemas", () => {
    const names = allOasisTools.map((t) => t.name);
    expect(names).toContain("inspect_ui_tree");
    expect(names).toContain("edit_ui_tree");
    expect(names).toContain("get_ui_components");
    expect(names).toContain("get_component_def");
    expect(names).toContain("click_ui_element");
    expect(names).toContain("open_blank_canvas");
    expect(names).toContain("inspect_network");
    expect(names).toContain("page_fetch");
  });

  it("should validate tool arguments with zod", () => {
    const inspectTool = allOasisTools.find((t) => t.name === "inspect_ui_tree")!;
    const valid = inspectTool.parameters.safeParse({ mode: "snapshot" });
    expect(valid.success).toBe(true);

    const validOutline = inspectTool.parameters.safeParse({ mode: "outline" });
    expect(validOutline.success).toBe(true);

    const invalid = inspectTool.parameters.safeParse({ mode: "invalid_mode" });
    expect(invalid.success).toBe(false);

    const editTool = allOasisTools.find((t) => t.name === "edit_ui_tree")!;
    const validUpdate = editTool.parameters.safeParse({
      action: "update",
      nodeId: "node_123",
      props: { text: "新标题" },
    });
    expect(validUpdate.success).toBe(true);

    const getDefTool = allOasisTools.find((t) => t.name === "get_component_def")!;
    expect(getDefTool.parameters.safeParse({ componentType: "Button" }).success).toBe(true);
    expect(getDefTool.parameters.safeParse({}).success).toBe(false);

    const networkTool = allOasisTools.find((t) => t.name === "inspect_network")!;
    expect(networkTool.parameters.safeParse({ action: "list", method: "POST" }).success).toBe(true);
    expect(networkTool.parameters.safeParse({ action: "detail", requestId: "req-1" }).success).toBe(true);

    const fetchTool = allOasisTools.find((t) => t.name === "page_fetch")!;
    expect(fetchTool.parameters.safeParse({ url: "/com/bm/be", method: "POST", body: { a: 1 } }).success).toBe(true);
    expect(fetchTool.parameters.safeParse({ url: "" }).success).toBe(false);
  });
});
