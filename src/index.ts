import * as glob from "glob";
import * as fs from "fs";
import ora from "ora";
import removeUnimportedStrings from "./removeUnimported";
import updateIgnoredStrings from "./updateIgnored";
import getI18nStrings from "./getStrings";
import { logHelp, logSourceFiles, logUnimportedStrings } from "./logging";
import { getRootDir } from "./config";

const oraStub = {
  stop(msg = "") {
    console.log(msg);
  },
};

async function checkUnimportedI18nStrings(
  shouldRemove: boolean,
  shouldUpdateIgnored: boolean,
  verbose: boolean,
  help: boolean
): Promise<void> {
  if (help) {
    logHelp();
    return;
  }

  const spinner =
    process.env.NODE_ENV === "test"
      ? oraStub
      : ora("Checking for unimported i18n strings...").start();
  console.log(""); // Add a new line after the spinner

  const i18nStrings = getI18nStrings(verbose);

  // Get all source files
  const rootDir = getRootDir();
  const srcFiles = glob.sync(`${rootDir}/**/*.{ts,tsx,js,jsx}`);
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

  if (shouldRemove) removeUnimportedStrings(i18nStrings);
  if (shouldUpdateIgnored) updateIgnoredStrings(i18nStrings);

  if (i18nStrings.size > 0 && !shouldRemove && !shouldUpdateIgnored) {
    process.exit(1);
  }
}

export default checkUnimportedI18nStrings;
