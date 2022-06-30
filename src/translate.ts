const I18N = "i18n";
const I18N_ATTR = "i18n-attr";
const LOCAL_STORAGE_LANGUAGE = "language";

interface IConfig {
  localesPath?: string;
  languages: string[];
}

export class Translate {
  private elements: NodeListOf<HTMLElement>;
  private _memory: Map<string, any>;

  constructor(private configs: IConfig) {
    this.configs = Object.assign({}, this.defaultConfig, configs);
    this.elements = document.querySelectorAll(`[${I18N}]`);
    this._memory = new Map();
  }

  private defaultConfig = {
    localesPath: "src/i18n",
  };

  private async get_language_file(lang: string) {
    if (this._memory.has(lang)) {
      return JSON.parse(this._memory.get(lang));
    }

    const translation = await this.fetch_language_from_path(
      `${this.configs.localesPath}/${lang}.json`
    );

    this._memory.set(lang, JSON.stringify(translation));

    return translation;
  }

  private async fetch_language_from_path(path: string) {
    return fetch(path)
      .then((response) => response.json())
      .catch(() => {
        console.error(`Something went wrong. Could not load ${path}!`);
      });
  }

  public async load(lang: string) {
    if (!this.configs.languages.includes(lang)) {

      const languages = this.configs.languages;
      let MSG =
        languages.length < 1
          ? "There aren't any registered languages"
          : `${lang} is not included ${languages.join(" & ")}`;

      throw new Error(MSG);
    }

    this.translate(await this.get_language_file(lang));

    document.documentElement.lang = lang;

    localStorage.setItem(LOCAL_STORAGE_LANGUAGE, lang);
  }

  private async translate(languageFile: Object) {
    const pair_key_and_property = (keys: any, values: any) =>
      keys.map((key: any, i: any) => [key, values[i]]);

    const replace = (element: any) => {
      const keys = element.getAttribute(I18N)
        ? [element.getAttribute(I18N)]
        : [];

      const properties = element.getAttribute(I18N_ATTR)
        ? [element.getAttribute(I18N_ATTR)]
        : ["innerHTML"];

      const pairs = pair_key_and_property(keys, properties);

      pairs.forEach((pair: [string, string]) => {
        const [key, property] = pair;

        const text = this.get_value_from_json_file(key, languageFile);

        element[property] = text;
      });
    };

    this.elements.forEach(replace);
  }

  get_value_from_json_file(key: string, languageFile?: any) {
    let text = key
      .split(".")
      .reduce((words, index) => words[index], languageFile);

    if (!text) {
      text = key;
      console.warn(`Could not find text for attribute "${key}".`);
    }

    return text;
  }
}
