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
const chalk_1 = __importDefault(require("chalk"));
if (process.argv.length < 4) {
    console.log(chalk_1.default.red("Usage: i18n-checker <path to i18n> <path to src> [--remove] [--updateIgnored] [--verbose] [--help]"));
    process.exit(1);
}
const pathToI18n = process.argv[2];
const pathToSrc = process.argv[3];
const shouldRemove = process.argv.includes("--remove");
const shouldUpdateIgnored = process.argv.includes("--updateIgnored");
const verbose = process.argv.includes("--verbose");
const help = process.argv.includes("--help");
(0, index_1.default)(pathToI18n, pathToSrc, shouldRemove, shouldUpdateIgnored, verbose, help);
