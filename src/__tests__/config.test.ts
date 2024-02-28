import { getI18nPattern, getRootDir } from "../config";
import fs from "fs";

jest.mock("fs");

describe("getI18nPattern", () => {
  it("should return the default i18n pattern when no config file is found", () => {
    (fs.readFileSync as jest.Mock).mockImplementation(() => {
      throw { code: "ENOENT" };
    });

    const result = getI18nPattern();

    expect(result).toBe("./src/**/{en,en-US,en-CA,en-GB}.json");
  });

  it("should return the i18n pattern from the config file when it exists", () => {
    const configContent = JSON.stringify({
      i18nPattern: "./src/i18n/*.json",
    });
    (fs.readFileSync as jest.Mock).mockReturnValue(configContent);

    const result = getI18nPattern();

    expect(result).toBe("./src/i18n/*.json");
  });

  it("should return the default i18n pattern when the config file is invalid", () => {
    (fs.readFileSync as jest.Mock).mockReturnValue("invalid json");

    const result = getI18nPattern();

    expect(result).toBe("./src/**/{en,en-US,en-CA,en-GB}.json");
  });

  it("should log an error when there is an error reading the config file", () => {
    const error = new Error("File read error");
    (fs.readFileSync as jest.Mock).mockImplementation(() => {
      throw error;
    });

    const consoleErrorSpy = jest.spyOn(console, "error");
    const result = getI18nPattern();

    expect(result).toBe("./src/**/{en,en-US,en-CA,en-GB}.json");
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error reading the configuration file: ",
      error
    );
  });
});

describe("getRootDir", () => {
  it("should return the default root directory when no config file is found", () => {
    (fs.readFileSync as jest.Mock).mockImplementation(() => {
      throw { code: "ENOENT" };
    });

    const result = getRootDir();

    expect(result).toBe("./src");
  });

  it("should return the root directory from the config file when it exists", () => {
    const configContent = JSON.stringify({
      rootDir: "./app",
    });
    (fs.readFileSync as jest.Mock).mockReturnValue(configContent);

    const result = getRootDir();

    expect(result).toBe("./app");
  });

  it("should return the default root directory when the config file is invalid", () => {
    (fs.readFileSync as jest.Mock).mockReturnValue("invalid json");

    const result = getRootDir();

    expect(result).toBe("./src");
  });

  it("should log an error when there is an error reading the config file", () => {
    const error = new Error("File read error");
    (fs.readFileSync as jest.Mock).mockImplementation(() => {
      throw error;
    });

    const consoleErrorSpy = jest.spyOn(console, "error");
    const result = getRootDir();

    expect(result).toBe("./src");
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error reading the configuration file: ",
      error
    );
  });
});
