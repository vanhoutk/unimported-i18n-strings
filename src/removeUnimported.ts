import * as fs from "fs";
import * as jsonc from "jsonc-parser";
import * as glob from "glob";
import { getI18nPattern } from "./config";

function removeEmptyObjects(obj: any) {
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      removeEmptyObjects(obj[key]);
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key];
      }
    }
  }
}

export default function removeUnimportedStrings(
  i18nStrings: Set<string>
): void {
  const i18nPattern = getI18nPattern();
  const i18nFilePaths = glob.sync(i18nPattern);

  for (const pathToI18n of i18nFilePaths) {
    let i18nContentStr = fs.readFileSync(pathToI18n, "utf8");

    for (const str of i18nStrings) {
      const path = str.split(".");
      const edits = jsonc.modify(i18nContentStr, path, undefined, {
        formattingOptions: { insertSpaces: true, tabSize: 2 },
      });
      i18nContentStr = jsonc.applyEdits(i18nContentStr, edits);
    }

    // Parse the JSON string to an object
    const newI18nContent = JSON.parse(i18nContentStr);

    // Remove empty objects
    removeEmptyObjects(newI18nContent);

    // Stringify the object back to a JSON string
    i18nContentStr = JSON.stringify(newI18nContent, null, 2);

    fs.writeFileSync(pathToI18n, i18nContentStr);
  }
}
