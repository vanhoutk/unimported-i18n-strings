#!/usr/bin/env node
import * as process from "process";
import checkUnimportedI18nStrings from "./index";
import chalk from "chalk";

if (process.argv.length < 4) {
  console.log(
    chalk.red(
      "Usage: i18n-checker <path to i18n> <path to src> [--remove] [--updateIgnored] [--verbose] [--help]"
    )
  );
  process.exit(1);
}

const pathToI18n = process.argv[2];
const pathToSrc = process.argv[3];
const shouldRemove = process.argv.includes("--remove");
const shouldUpdateIgnored = process.argv.includes("--updateIgnored");
const verbose = process.argv.includes("--verbose");
const help = process.argv.includes("--help");

checkUnimportedI18nStrings(
  pathToI18n,
  pathToSrc,
  shouldRemove,
  shouldUpdateIgnored,
  verbose,
  help
);
