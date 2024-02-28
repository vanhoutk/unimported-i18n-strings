import fs from "fs";
import glob from "glob";
import checkUnimportedI18nStrings from "../index";
import getI18nStrings from "../getStrings";
import { getRootDir } from "../config";
import { logHelp, logSourceFiles, logUnimportedStrings } from "../logging";

jest.mock("fs");
jest.mock("glob", () => ({
  sync: jest.fn(),
}));

jest.mock("../getStrings", () => jest.fn());
jest.mock("../config", () => ({
  getI18nPattern: jest.fn(),
  getRootDir: jest.fn(),
}));
jest.mock("../logging", () => ({
  logHelp: jest.fn(),
  logSourceFiles: jest.fn(),
  logUnimportedStrings: jest.fn(),
}));

describe("checkUnimportedI18nStrings", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should log help and return when help flag is true", async () => {
    (logHelp as jest.Mock).mockImplementation(jest.fn());

    await checkUnimportedI18nStrings(false, false, false, true);

    expect(logHelp).toHaveBeenCalled();
  });

  it("should check unimported i18n strings in source files", async () => {
    const readFileSyncSpy = jest.spyOn(fs, "readFileSync");
    const i18nStrings = new Set(["string1", "string2"]);
    const srcFiles = ["file1.ts", "file2.ts"];
    const fileContent = "Some file content";

    (getI18nStrings as jest.Mock).mockReturnValue(i18nStrings);
    (getRootDir as jest.Mock).mockReturnValue("/root/dir");
    // @ts-ignore
    (glob.sync as jest.Mock).mockReturnValue(srcFiles);
    (fs.readFileSync as jest.Mock).mockReturnValue(fileContent);

    await checkUnimportedI18nStrings(false, false, true, false);

    expect(logHelp).not.toHaveBeenCalled();
    expect(logSourceFiles).toHaveBeenCalledWith(srcFiles, true);
    expect(readFileSyncSpy).toHaveBeenCalledWith("file1.ts", "utf8");
    expect(readFileSyncSpy).toHaveBeenCalledWith("file2.ts", "utf8");
    expect(logUnimportedStrings).toHaveBeenCalledWith(i18nStrings);
  });
});
