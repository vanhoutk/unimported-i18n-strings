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
const glob = __importStar(require("glob"));
const fs = __importStar(require("fs"));
const jsonc = __importStar(require("jsonc-parser"));
const ora_1 = __importDefault(require("ora"));
function removeEmptyObjects(obj) {
    for (const key in obj) {
        if (typeof obj[key] === "object") {
            removeEmptyObjects(obj[key]);
            if (Object.keys(obj[key]).length === 0) {
                delete obj[key];
            }
        }
    }
}
function traverseObject(obj, path = []) {
    let keys = [];
    for (const key in obj) {
        if (typeof obj[key] === "object") {
            keys = keys.concat(traverseObject(obj[key], path.concat(key)));
        }
        else {
            keys.push([...path, key].join("."));
        }
    }
    return keys;
}
async function checkUnimportedI18nStrings(pathToI18n, pathToSrc, shouldRemove, shouldUpdateIgnored, verbose, help) {
    if (help) {
        console.log("Usage: i18n-checker <path to i18n> <path to src> [--remove] [--updateIgnored] [--verbose] [--help]");
        return;
    }
    const spinner = (0, ora_1.default)("Checking for unimported i18n strings...").start();
    console.log("");
    // Read the i18n file
    const i18nContent = JSON.parse(fs.readFileSync(pathToI18n, "utf8"));
    const i18nStrings = new Set(traverseObject(i18nContent));
    if (verbose)
        console.log(`Found ${i18nStrings.size} i18n strings`);
    // Read the ignored strings file
    let ignoredStrings = [];
    if (fs.existsSync("unimportedI18nStrings.json")) {
        const ignoredContent = JSON.parse(fs.readFileSync("unimportedI18nStrings.json", "utf8"));
        ignoredStrings = ignoredContent.ignoreUnimported;
    }
    // Remove ignored strings from i18nStrings
    for (const str of ignoredStrings) {
        i18nStrings.delete(str);
    }
    if (verbose)
        console.log(`Looking at ${i18nStrings.size} i18n strings`);
    // Get all source files
    const srcFiles = glob.sync(`${pathToSrc}/**/*.{ts,tsx,js,jsx}`);
    if (verbose)
        console.log(`Found ${srcFiles.length} source files`);
    // for (const str of srcFiles) {
    //   console.log(`Source file: ${str}`);
    // }
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
    // Log unimported i18n strings
    if (verbose) {
        for (const str of i18nStrings) {
            console.log(`Unimported i18n string: ${str}`);
        }
    }
    else {
        console.log(`Found ${i18nStrings.size} unimported i18n strings. Run with --verbose to see them.`);
    }
    // Remove unimported i18n strings
    if (shouldRemove) {
        let i18nContentStr = fs.readFileSync(pathToI18n, "utf8");
        for (const str of i18nStrings) {
            const path = str.split(".");
            const edits = jsonc.modify(i18nContentStr, path, undefined, {
                formattingOptions: { insertSpaces: true, tabSize: 2 },
            });
            i18nContentStr = jsonc.applyEdits(i18nContentStr, edits);
        }
        fs.writeFileSync(pathToI18n, i18nContentStr);
        // Parse the JSON string to an object
        const newI18nContent = JSON.parse(i18nContentStr);
        // Remove empty objects
        removeEmptyObjects(newI18nContent);
        // Stringify the object back to a JSON string
        i18nContentStr = JSON.stringify(newI18nContent, null, 2);
        fs.writeFileSync(pathToI18n, i18nContentStr);
    }
    // Update ignored strings
    if (shouldUpdateIgnored) {
        const ignoredStrings = Array.from(i18nStrings);
        const output = {
            ignoreUnimported: ignoredStrings,
        };
        fs.writeFileSync("unimportedI18nStrings.json", JSON.stringify(output, null, 2));
    }
}
exports.default = checkUnimportedI18nStrings;
