# i18n-Vanilla

A lightweight and efficient JavaScript library for handling i18n (internationalization) and dynamic translations in web applications. With `i18n-Vanilla`, you can easily manage multiple languages and seamlessly translate your application's content.

## Features

- Fetches and caches language files for optimized performance.
- Dynamically updates text and attributes in the DOM.
- Supports nested key translation.
- Automatically sets the language in local storage and updates the document language.
- Lightweight and easy to integrate.

---

## Installation

```bash
npm install i18n-vanilla
```
---

## Usage

### Basic Setup

Create a new instance of the `Translate` class and configure it with your supported languages and path to language files:

```typescript
import { Translate } from "i18n-vanilla";

const translator = new Translate({
  localesPath: "src/i18n", // Path to your language files
  languages: ["en", "es", "fr"], // Supported languages
});

translator.load("en"); // Set default language
```

### HTML Setup
Add the `i18n` attribute to elements you want to translate. For example:

```html
<div i18n="greeting"></div>
<p i18n="description" i18n-attr="innerText"></p>
```

### JSON Language Files
Create your language files in JSON format. For example, `en.json`:

```json
{
  "greeting": "Hello, world!",
  "description": "Welcome to our application."
}
```

### Switching Languages
You can dynamically switch languages using the `load` method:

```typescript
translator.load("es"); // Switch to Spanish
```

---

## API Reference

### Constructor

```typescript
constructor(configs: IConfig);
```

#### Parameters
- `configs.localesPath` *(optional)*: Path to the folder containing JSON language files.
- `configs.languages`: Array of supported language codes.

### Methods

#### `load(lang: string): Promise<void>`
Loads the specified language and updates the DOM.

- `lang`: The language code (e.g., `"en"`).

#### `get_value_from_json_file(key: string, languageFile?: object): string`
Fetches a value from the language file using a dot-notated key.

---

## Error Handling

- If an unsupported language is passed to `load`, an error is thrown:
  ```text
  Error: "es" is not included en & fr
  ```
- If a key is missing in the language file, a warning is logged:
  ```text
  Could not find text for attribute "missing.key".
  ```

---

## Best Practices

- Always include fallback text for missing keys.
- Preload commonly used language files to improve performance.

---

## Contributing

Contributions are welcome! If you find a bug or have a feature request, feel free to open an issue or submit a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments

Special thanks to the open-source community for inspiring this project.

