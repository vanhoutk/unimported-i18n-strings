import * as fs from "fs";

export default function updateIgnoredStrings(i18nStrings: Set<string>) {
  const ignoredStrings = Array.from(i18nStrings);
  const output = {
    ignoreUnimported: ignoredStrings,
  };
  fs.writeFileSync(
    "unimportedI18nStrings.json",
    JSON.stringify(output, null, 2)
  );
}
