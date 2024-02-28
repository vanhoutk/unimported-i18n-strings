import * as fs from "fs";
import * as jsonc from "jsonc-parser";

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
  pathToI18n: string,
  i18nStrings: Set<string>
): void {
  let i18nContentStr = fs.readFileSync(pathToI18n, "utf8");
  for (const str of i18nStrings) {
    const path = str.split(".");
    const edits = jsonc.modify(i18nContentStr, path, undefined, {
      formattingOptions: { insertSpaces: true, tabSize: 2 },
    });
    i18nContentStr = jsonc.applyEdits(i18nContentStr, edits);
  }
  fs.writeFileSync(pathToI18n, i18nContentStr);

  // Parse the JSON string to an object
  const newI18nContent = JSON.parse(i18nContentStr);

  // Remove empty objects
  removeEmptyObjects(newI18nContent);

  // Stringify the object back to a JSON string
  i18nContentStr = JSON.stringify(newI18nContent, null, 2);

  fs.writeFileSync(pathToI18n, i18nContentStr);
}
