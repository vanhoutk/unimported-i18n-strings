import * as glob from "glob";
import * as fs from "fs";
import ora from "ora";
import removeUnimportedStrings from "./removeUnimported";
import updateIgnoredStrings from "./updateIgnored";
import getI18nStrings from "./getStrings";
import { logHelp, logSourceFiles, logUnimportedStrings } from "./logging";

async function checkUnimportedI18nStrings(
  pathToI18n: string,
  pathToSrc: string,
  shouldRemove: boolean,
  shouldUpdateIgnored: boolean,
  verbose: boolean,
  help: boolean
): Promise<void> {
  if (help) {
    logHelp();
    return;
  }

  const spinner = ora("Checking for unimported i18n strings...").start();
  console.log("");

  const i18nStrings = getI18nStrings(pathToI18n, verbose);
  // Get all source files
  const srcFiles = glob.sync(`${pathToSrc}/**/*.{ts,tsx,js,jsx}`);
  logSourceFiles(srcFiles, verbose);

  // Check each source file
  for (const file of srcFiles) {
    const fileContent = fs.readFileSync(file, "utf8");

    // Check each i18n string
    for (const str of i18nStrings) {
      if (fileContent.includes(str)) {
        i18nStrings.delete(str);
      }
    }

    // If all i18n strings have been found, stop checking
    if (i18nStrings.size === 0) {
      break;
    }
  }

  spinner.stop();

  logUnimportedStrings(i18nStrings);

  if (shouldRemove) removeUnimportedStrings(pathToI18n, i18nStrings);
  if (shouldUpdateIgnored) updateIgnoredStrings(i18nStrings);
}

export default checkUnimportedI18nStrings;
