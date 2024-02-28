# unimported-i18n-strings

unimported-i18n-strings is tool designed to scan your project and identify any Internationalization (i18n) strings that are unimported. It provides additional options to remove or ignore these unimported i18n strings from your project.

## Installation

Clone the repository and install its dependencies with:

```
TODO
```

Replace `username` and `repo` with your Github username and repository name, respectively.

## Usage

The package provides a CLI to interact with it.

```
unimported-i18n-strings --pathToI18n ./path-to-i18n.json --pathToSrc ./path-to-src [options]
```

It requires two mandatory arguments, `pathToI18n` and `pathToSrc`.

### Command Line Options

- `--remove`: This flag enables the removal process of unimported i18n strings from your original i18n file.
- `--updateIgnored`: This flag triggers an update of the ignored strings based on existing i18n string keys. Ignored strings are saved in a file named `unimportedI18nStrings.json`.
- `--verbose`: Use this flag to enable verbose logging.
- `--help`: Display the help message.

## Functionality

The package works by parsing your i18n JSON file and your source code. It identifies which strings from the i18n file are not imported anywhere in the source code.

If flags `--remove` or `--updateIgnored` are passed, then the unimported strings are either removed from the original i18n file or added to the `unimportedI18nStrings.json` file, respectively.

The verbose mode (`--verbose`) provides a detailed log of the checking process.

## Tests

Tests are created using Jest. Run the tests with:

```
npm test
```

## License

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/vanhoutk/unimported-i18n-strings/blob/main/LICENSE)

## Contributors ✨

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
