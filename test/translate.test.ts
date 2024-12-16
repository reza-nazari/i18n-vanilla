import { Translate } from '../src/translate';

describe('Translate', () => {
   const mockConfig = {
      localesPath: 'src/i18n',
      languages: ['en', 'fr'],
   };

   const mockTranslations = {
      en: { greeting: 'Hello' },
      fr: { greeting: 'Bonjour' },
   };

   const mockFetch = jest.fn((path: string) =>
      Promise.resolve({
         json: () => {
            if (path.includes('en.json')) return mockTranslations.en;
            if (path.includes('fr.json')) return mockTranslations.fr;
            throw new Error(`Could not load ${path}`);
         },
      })
   );

   let translate: Translate;

   beforeAll(() => {
      global.fetch = mockFetch as any;
   });

   beforeEach(() => {
      document.body.innerHTML = `
      <div id="greeting" i18n="greeting"></div>
      <input type="text" i18n="greeting" i18n-attr="placeholder" >
    `;
      translate = new Translate(mockConfig);
   });

   afterEach(() => {
      jest.clearAllMocks();
      localStorage.clear();
   });

   test('should load and translate elements for a valid language', async () => {
      await translate.load('en');
      expect(document.documentElement.lang).toBe('en');
      expect(localStorage.getItem('language')).toBe('en');

      const greetingElement = document.getElementById('greeting');
      expect(greetingElement?.innerHTML).toBe('Hello');
   });

   test('should switch to another language and translate', async () => {
      await translate.load('fr');
      expect(document.documentElement.lang).toBe('fr');
      expect(localStorage.getItem('language')).toBe('fr');

      const greetingElement = document.getElementById('greeting');
      expect(greetingElement?.innerHTML).toBe('Bonjour');
   });

   test('should throw an error for unsupported languages', async () => {
      await expect(translate.load('es')).rejects.toThrowError(
         'es is not included en & fr'
      );
   });

   test('should handle missing keys gracefully', async () => {
      const missingKeyElement = document.createElement('div');
      missingKeyElement.setAttribute('i18n', 'nonexistent');
      document.body.appendChild(missingKeyElement);
      
      console.warn = jest.fn();

      const translate = new Translate({ languages: ['en'], localesPath: 'src/i18n' });
      await translate.load('en');

      expect(console.warn).toHaveBeenCalledWith(
         'Could not find text for attribute "nonexistent".'
      );
      expect(missingKeyElement.innerHTML).toBe('nonexistent');

      jest.restoreAllMocks();
   });



   test('should cache loaded language files in memory', async () => {
      await translate.load('en');
      expect(mockFetch).toHaveBeenCalledTimes(1);

      await translate.load('en');
      expect(mockFetch).toHaveBeenCalledTimes(1);
   });

   test('should log an error when fetch fails', async () => {
      const mockPath = 'src/i18n/en.json';
    
      console.error = jest.fn();
    
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
    
      const translate = new Translate({ languages: ['en'], localesPath: 'src/i18n' });
    
      await translate['fetch_language_from_path'](mockPath);
    
      expect(console.error).toHaveBeenCalledWith(
        `Something went wrong. Could not load ${mockPath}!`
      );
    
      jest.restoreAllMocks();
    });

    test('throws an error if the language is not included in configs.languages', async () => {
      const invalidLang = 'es'; 

      const singleMockConfig = {
         localesPath: 'src/i18n',
         languages: [],
      };

      let translateWithSingleSrc = new Translate(singleMockConfig);

      await expect(translate.load(invalidLang)).rejects.toThrowError(
        `${invalidLang} is not included en & fr`
      );

      await expect(translateWithSingleSrc.load(invalidLang)).rejects.toThrowError(
         `There aren't any registered languages`
       );
    });
    

});
