import * as fs from "fs";
import { Config } from "./types";

export function getI18nPattern(): string {
  // Defaults to some common english locales
  let i18nPattern = "./src/**/{en,en-US,en-CA,en-GB}.json";

  try {
    const configContent = fs.readFileSync(
      "./.unimported-i18n-stringsrc.json",
      "utf8"
    );
    const config: Config = JSON.parse(configContent);

    i18nPattern = config.i18nPattern || i18nPattern;
  } catch (error: any) {
    if (error.code !== "ENOENT") {
      console.error("Error reading the configuration file: ", error);
    }
  }

  return i18nPattern;
}

export function getRootDir(): string {
  // Default to ./src
  let rootDir = "./src";

  try {
    const configContent = fs.readFileSync(
      "./.unimported-i18n-stringsrc.json",
      "utf8"
    );
    const config: Config = JSON.parse(configContent);

    rootDir = config.rootDir || rootDir;
  } catch (error: any) {
    if (error.code !== "ENOENT") {
      console.error("Error reading the configuration file: ", error);
    }
  }

  return rootDir;
}
