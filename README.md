# unimported-i18n-strings

unimported-i18n-strings is tool designed to scan your project and identify any Internationalization (i18n) strings that are unimported. It provides additional options to remove or ignore these unimported i18n strings from your project.

## Installation

Clone the repository and install its dependencies with npm

```
npm install --save-dev unimported-i18n-strings
```

or yarn

```
yarn add -D unimported-i18n-strings
```

## Usage

Create a new file called `.unimported-i18n-stringsrc.json` in the root of your project alongside your `package.json` to specify the pattern for your i18n files, and your root directory. Below are the defaults which will be used if you don't specify them.

```json
{
  "i18nPattern": "./src/**/{en,en-US,en-CA,en-GB}.json",
  "rootDir": "./src"
}
```

Then run the package using

```
unimported-i18n-strings [options]
```

### Command Line Options

- `--remove`: This flag enables the removal process of unimported i18n strings from your original i18n file.
- ⚠️ **WARNING:** `unimported-i18n-strings` is unable to detect if an i18n string is being used through some sort of string building, such as `` t(`some.${variable}.string`) ``, it's important to manually check the list of unimported strings **before** using the `--remove` flag.
- `--updateIgnored`: This flag triggers an update of the ignored strings based on existing i18n string keys. Ignored strings are saved in a file named `unimportedI18nStrings.json`.
- `--verbose`: Use this flag to enable verbose logging.
- `--help`: Display the help message.

## Functionality

The package works by parsing your i18n JSON files and your source code. It identifies which strings from the i18n file are not imported anywhere in the source code.

If flags `--remove` or `--updateIgnored` are passed, then the unimported strings are either removed from the original i18n file or added to the `unimportedI18nStrings.json` file, respectively.

The verbose mode (`--verbose`) provides a detailed log of the checking process.

## Tests

Tests are created using Jest. Run the tests with:

```
npm test
```

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Support

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/T6T1V287H)

## Contributors ✨

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
