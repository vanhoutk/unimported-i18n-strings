import chalk from "chalk";

export function logHelp(): void {
  console.log(
    "Usage: i18n-checker <path to i18n> <path to src> [--remove] [--updateIgnored] [--verbose] [--help]"
  );
}

export function logSourceFiles(srcFiles: string[], verbose: boolean): void {
  if (verbose) {
    for (const str of srcFiles) {
      console.log(`Source file: ${str}`);
    }
  } else {
    console.log(`Searching through ${srcFiles.length} source files`);
  }
}

export function logUnimportedStrings(i18nStrings: Set<string>): void {
  if (i18nStrings.size === 0) {
    console.log(`${chalk.greenBright(`✓`)} No unimported i18n strings found`);
    return;
  }

  console.log(
    `Found ${i18nStrings.size} unimported i18n strings. Run with --verbose to see them.`
  );

  for (const str of i18nStrings) {
    console.log(`Unimported i18n string: ${str}`);
  }
}
