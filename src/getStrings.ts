import * as fs from "fs";

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

export default function getI18nStrings(
  pathToI18n: string,
  verbose: boolean
): Set<string> {
  const i18nContent = JSON.parse(fs.readFileSync(pathToI18n, "utf8"));
  const i18nStrings = new Set(traverseObject(i18nContent));

  if (verbose) console.log(`Found ${i18nStrings.size} i18n strings`);

  // Read the ignored strings file
  let ignoredStrings: string[] = [];
  if (fs.existsSync("unimportedI18nStrings.json")) {
    const ignoredContent = JSON.parse(
      fs.readFileSync("unimportedI18nStrings.json", "utf8")
    );
    ignoredStrings = ignoredContent.ignoreUnimported;
  }

  // Remove ignored strings from i18nStrings
  for (const str of ignoredStrings) {
    i18nStrings.delete(str);
  }

  console.log(`Checking for imports of ${i18nStrings.size} i18n strings`);

  return i18nStrings;
}
