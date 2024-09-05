import { counterTextFormat } from "../counterTextFormat";

describe("counterTextFormat", () => {
  describe("When less than 10 million", () => {
    it("formats the number with commas", () => {
      const formatted = counterTextFormat(9_999_999);
      expect(formatted).toBe("9,999,999");
    });
  });

  describe("When 10 million to less than 1 billion", () => {
    it("formats the number with shorthand", () => {
      const formatted = counterTextFormat(999_999_999);
      expect(formatted).toBe("999.9 Mil");
    });
  });

  describe("When 1 billion to less than 1 trillion", () => {
    it("formats the number with shorthand", () => {
      const formatted = counterTextFormat(999_999_999_999);
      expect(formatted).toBe("999.9 Bil");
    });
  });

  describe("When 1 trillion or greater", () => {
    it("returns infinity symbol", () => {
      const formatted = counterTextFormat(1_000_000_000_000);
      expect(formatted).toBe("∞");
    });
  });
});
