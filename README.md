# i18n-vanilla
>Create a folder and put it language files in json format, then import the package into your vanilla project and create a instance. Now call the load method

>Attention: In the load method, you must use a parameter whose value is the same as the name of your language file. 


Name | Type | Status | Description
--- | --- | --- | --- 
languages | string[] | required  | Register languages you want to use
localesPath | string | nullable | Language files folder. If not specified, it will be in 'src/i18n' by default; 

```js
import Translate from 'i18n-vanilla';


const translate = new Translate({
  languages: ["en", "fr"],
  localesPath: 'src/i18n'
});

translate.load("en")
```

```json
//src/i18n/en.json
{
    "HELLO": "Hello"
}

//src/i18n/fr.json
{
    "HELLO": "Bonjour"
}
```

```html
  <div i18n="HELLO"></div>
  <input type="text" i18n="HELLO" i18n-attr="placeholder" >
```
