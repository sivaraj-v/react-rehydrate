import specialElementHandlers from "../specialElementHandlers";

describe("specialElementHandlers", () => {
  describe("input handler", () => {
    it("removes value and checked and uses DOM properties", () => {
      const input = document.createElement("input");
      input.checked = true;
      input.value = "hello";

      const result = specialElementHandlers.input(input, {
        checked: false,
        id: "test-input",
        value: "ignored"
      });

      expect(result).not.toHaveProperty("value");
      expect(result).not.toHaveProperty("checked");
      expect(result).toHaveProperty("defaultChecked", true);
      expect(result).toHaveProperty("defaultValue", "hello");
      expect(result).toHaveProperty("id", "test-input");
    });

    it("does not add defaultValue when input has no value", () => {
      const input = document.createElement("input");
      input.checked = false;
      input.value = "";

      const result = specialElementHandlers.input(input, {
        value: "ignored"
      });

      expect(result).not.toHaveProperty("value");
      expect(result).not.toHaveProperty("defaultValue");
      expect(result).not.toHaveProperty("defaultChecked");
    });
  });

  describe("option handler", () => {
    it("removes selected attribute but preserves others", () => {
      const option = document.createElement("option");
      const result = specialElementHandlers.option(option, {
        label: "Option 1",
        selected: true,
        value: "opt1"
      });

      expect(result).not.toHaveProperty("selected");
      expect(result).toHaveProperty("value", "opt1");
      expect(result).toHaveProperty("label", "Option 1");
    });
  });

  describe("select handler", () => {
    it("removes value and uses select value as defaultValue", () => {
      const select = document.createElement("select");
      const option = document.createElement("option");
      option.value = "selected-value";
      option.selected = true;
      select.appendChild(option);

      const result = specialElementHandlers.select(select, {
        name: "my-select",
        value: "ignored"
      });

      expect(result).not.toHaveProperty("value");
      expect(result).toHaveProperty("defaultValue", "selected-value");
      expect(result).toHaveProperty("name", "my-select");
    });
  });

  describe("textarea handler", () => {
    it("removes value and uses textarea value as defaultValue", () => {
      const textarea = document.createElement("textarea");
      textarea.value = "text content";

      const result = specialElementHandlers.textarea(textarea, {
        rows: 4,
        value: "ignored"
      });

      expect(result).not.toHaveProperty("value");
      expect(result).toHaveProperty("defaultValue", "text content");
      expect(result).toHaveProperty("rows", 4);
    });
  });
});
