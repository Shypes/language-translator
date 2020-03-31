# Simple Language Parser

This is a simple node.js langusge parse to help with language translation

### Project Setup ###



```
const Language = require('./language');
```


Usage

```
const Language = require('./language');

const LangParser = new Language();

LangParser.setLang('ar');

translated = LangParser.translate('email_phone_validation')

translated.then((text) =>{
   console.log(text);
});

```

Optional Method

```

LangParser.setActiveLang("en");

LangParser.setBaseDir("./");

LangParser.setLanguageDir("src/lang");

LangParser.setDefaultLang("ar");

LangParser.setExtention(".txt");

```

Sample Language file ar.json

```
{
    "success": "نجاح",
    "email_phone_validation": "لا يمكن أن يكون البريد الإلكتروني والهاتف فارغين",
    "something_went_wrong": "هناك خطأ ما",
    "missing_required_validation": "الحقول المطلوبة مفقودة"
}
```

Sample Language file en.json

```
{
    "success": "Success!",
    "email_phone_validation": "Email and phone cannot be empty",
    "something_went_wrong": "Something went wrong!",
    "missing_required_validation": "Missing required fields"
}
```


It also contains a simple test.js file

```
node test.js


node test1.js
```