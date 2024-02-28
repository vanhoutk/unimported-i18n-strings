import * as fs from "fs";
import * as glob from "glob";
import { getI18nPattern } from "./config";

function traverseObject(obj: any, path: string[] = []): string[] {
  let keys: string[] = [];
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      keys = keys.concat(traverseObject(obj[key], path.concat(key)));
    } else {
      keys.push([...path, key].join("."));
    }
  }
  return keys;
}

export default function getI18nStrings(verbose: boolean): Set<string> {
  const i18nPattern = getI18nPattern();
  const i18nFiles = glob.sync(i18nPattern);

  const i18nContent = i18nFiles.reduce((acc, file) => {
    const content = JSON.parse(fs.readFileSync(file, "utf8"));
    return { ...acc, ...content };
  }, {});

  const i18nStrings = new Set(traverseObject(i18nContent));

  if (verbose) console.log(`Found ${i18nStrings.size} i18n strings`);

  // Read the ignored strings file
  let ignoredStrings: string[] = [];
  if (fs.existsSync(".unimported-i18n-stringsrc.json")) {
    const ignoredContent = JSON.parse(
      fs.readFileSync(".unimported-i18n-stringsrc.json", "utf8")
    );
    ignoredStrings = ignoredContent.ignoreUnimported || ignoredStrings;
  }

  // Remove ignored strings from i18nStrings
  for (const str of ignoredStrings) {
    i18nStrings.delete(str);
  }

  console.log(`Checking for imports of ${i18nStrings.size} i18n strings`);

  return i18nStrings;
}
