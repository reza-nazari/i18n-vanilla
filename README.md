# i18n-vanilla
>Create a folder and put the files in json format, then import the package into your vanilla project and create a sample. Now call the load method

>Attention: in load method you should use a parameter which in same as your languages. 


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
