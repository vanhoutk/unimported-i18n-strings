import removeUnimportedStrings from "../removeUnimported";
import fs from "fs";
import glob from "glob";
import jsonc from "jsonc-parser";

jest.mock("fs");
jest.mock("glob", () => ({
  sync: jest.fn(),
}));
jest.mock("jsonc-parser", () => ({
  modify: jest.fn(),
  applyEdits: jest.fn(),
}));

describe("removeUnimportedStrings", () => {
  it("should remove unimported strings from i18n files", () => {
    const i18nStrings = new Set(["string1", "string2"]);
    const i18nPattern = "./src/**/{en,en-US,en-CA,en-GB}.json";
    const i18nFilePaths = [
      "path/to/i18n/files/en.json",
      "path/to/i18n/files/fr.json",
    ];
    const i18nContentStr = `{
      "string1": "Hello",
      "string2": "World",
      "string3": "Bonjour"
    }`;
    const newI18nContent = {
      string3: "Bonjour",
    };
    const formattedI18nContentStr = `{
      "string3": "Bonjour"
    }`;

    // Mock glob.sync to return i18nFilePaths
    // @ts-ignore
    (glob.sync as jest.Mock).mockReturnValue(i18nFilePaths);

    // Mock fs.readFileSync to return i18nContentStr
    (fs.readFileSync as jest.Mock).mockReturnValue(i18nContentStr);

    // Mock jsonc.modify to return edits
    (jsonc.modify as jest.Mock).mockReturnValue([
      { offset: 10, length: 5, content: "" },
    ]);

    // Mock jsonc.applyEdits to return formattedI18nContentStr
    (jsonc.applyEdits as jest.Mock).mockReturnValue(formattedI18nContentStr);

    removeUnimportedStrings(i18nStrings);

    expect(glob.sync).toHaveBeenCalledWith(i18nPattern);
    expect(
      JSON.parse((fs.writeFileSync as jest.Mock).mock.calls[0][1])
    ).toEqual(JSON.parse(formattedI18nContentStr));
    expect(
      JSON.parse((fs.writeFileSync as jest.Mock).mock.calls[1][1])
    ).toEqual(JSON.parse(formattedI18nContentStr));
  });
});
