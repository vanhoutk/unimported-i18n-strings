import * as fs from "fs";
import { Config } from "./types";

export default function updateIgnoredStrings(i18nStrings: Set<string>) {
  const filePath = ".unimported-i18n-stringsrc.json";
  let ignoredStrings = Array.from(i18nStrings);
  let config: Config = {};

  // Check if file exists
  if (fs.existsSync(filePath)) {
    // Read current contents of the file
    config = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (Array.isArray(config.ignoreUnimported)) {
      // Concatenate new ignored strings with currently ignored strings
      ignoredStrings = Array.from(
        new Set([...config.ignoreUnimported, ...ignoredStrings])
      );
    }
  }

  // Update the ignoreUnimported property of current config
  config.ignoreUnimported = ignoredStrings;

  fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
}
