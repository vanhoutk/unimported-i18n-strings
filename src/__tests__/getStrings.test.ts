import getI18nStrings from "../getStrings";
import path from "path";

describe("getI18nStrings", () => {
  it("should return a set of i18n strings", () => {
    const verbose = true;

    const result = getI18nStrings(verbose);

    expect(result).toBeInstanceOf(Set);
    expect(result.size).toBeGreaterThan(0);
  });

  it("should remove ignored strings from the result", () => {
    const verbose = false;

    // Mock fs.existsSync and fs.readFileSync
    jest.mock("fs", () => ({
      existsSync: jest.fn().mockReturnValue(true),
      readFileSync: jest.fn().mockReturnValue(
        JSON.stringify({
          ignoreUnimported: ["ignoredString1", "ignoredString2"],
        })
      ),
    }));

    const result = getI18nStrings(verbose);

    expect(result).toBeInstanceOf(Set);
    expect(result.has("ignoredString1")).toBe(false);
    expect(result.has("ignoredString2")).toBe(false);
  });
});
