import updateIgnoredStrings from "../updateIgnored";
import fs from "fs";

jest.mock("fs");

describe("updateIgnoredStrings", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update the ignored strings in the config file", () => {
    const i18nStrings = new Set(["ignoredString1", "ignoredString2"]);
    const filePath = ".unimported-i18n-stringsrc.json";
    const existingConfig = {
      ignoreUnimported: ["existingIgnoredString"],
    };
    const expectedConfig = {
      ignoreUnimported: [
        "existingIgnoredString",
        "ignoredString1",
        "ignoredString2",
      ],
    };

    // Mock fs.existsSync and fs.readFileSync
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify(existingConfig)
    );

    updateIgnoredStrings(i18nStrings);

    // Verify that fs.existsSync and fs.readFileSync were called with the correct arguments
    expect(fs.existsSync).toHaveBeenCalledWith(filePath);
    expect(fs.readFileSync).toHaveBeenCalledWith(filePath, "utf8");

    // Verify that fs.writeFileSync was called with the correct arguments
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      filePath,
      JSON.stringify(expectedConfig, null, 2)
    );
  });

  it("should create a new config file with the ignored strings", () => {
    const i18nStrings = new Set(["ignoredString1", "ignoredString2"]);
    const filePath = ".unimported-i18n-stringsrc.json";
    const expectedConfig = {
      ignoreUnimported: ["ignoredString1", "ignoredString2"],
    };

    // Mock fs.existsSync to return false
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    updateIgnoredStrings(i18nStrings);

    // Verify that fs.existsSync was called with the correct argument
    expect(fs.existsSync).toHaveBeenCalledWith(filePath);

    // Verify that fs.writeFileSync was called with the correct arguments
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      filePath,
      JSON.stringify(expectedConfig, null, 2)
    );
  });
});
