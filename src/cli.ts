#!/usr/bin/env node
import * as process from "process";
import checkUnimportedI18nStrings from "./index";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

interface CLIArgs {
  remove: boolean;
  updateIgnored: boolean;
  verbose: boolean;
  help: boolean;
  pathToI18n: string;
  pathToSrc: string;
}

const argv = yargs(hideBin(process.argv))
  .option("remove", {
    alias: "r",
    description: "This flag controls the removal process",
    type: "boolean",
  })
  .option("updateIgnored", {
    alias: "u",
    description:
      "This flag triggers update of the ignored strings based on i18n string",
    type: "boolean",
  })
  .option("verbose", {
    alias: "v",
    description: "This flag enables verbose logging",
    type: "boolean",
  })
  .option("help", {
    alias: "h",
    description: "Show help",
    type: "boolean",
  })
  .demandOption(["pathToI18n", "pathToSrc"])
  .parse() as CLIArgs;

checkUnimportedI18nStrings(
  argv.pathToI18n,
  argv.pathToSrc,
  argv.remove,
  argv.updateIgnored,
  argv.verbose,
  argv.help
);
