#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process = __importStar(require("process"));
const index_1 = __importDefault(require("./index"));
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const argv = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .option("remove", {
    alias: "r",
    description: "This flag controls the removal process",
    type: "boolean",
})
    .option("updateIgnored", {
    alias: "u",
    description: "This flag triggers update of the ignored strings based on i18n string",
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
    .parse();
(0, index_1.default)(argv.pathToI18n, argv.pathToSrc, argv.remove, argv.updateIgnored, argv.verbose, argv.help);
