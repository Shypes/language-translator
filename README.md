# @shypes/language-translator

[![npm (scoped)](https://img.shields.io/npm/v/@shypes/language-translator.svg)](https://www.npmjs.com/package/@shypes/language-translator)
[![GitHub issues](https://img.shields.io/github/issues/Shypes/language-translator)](https://img.shields.io/github/issues/Shypes/language-translator)


This is a simple node.js langusge parse to help with language translation

## Install

```
$ npm install @shypes/language-translator
```

## Usage

```js
const Language = require("@shypes/language-translator");

const LangParser = Language();

LangParser.setLang('ar');

translated = LangParser.translate('email_phone_validation')

translated.then((text) =>{
   console.log(text);
});

```

Optional Method

```js

LangParser.setActiveLang("en");

LangParser.setBaseDir("./");

LangParser.setLanguageDir("src/lang");

LangParser.setDefaultLang("ar");

LangParser.setExtention(".txt");

```

Sample Language file ar.json

```json
{
    "success": "نجاح",
    "email_phone_validation": "لا يمكن أن يكون البريد الإلكتروني والهاتف فارغين",
    "something_went_wrong": "هناك خطأ ما",
    "missing_required_validation": "الحقول المطلوبة مفقودة"
}
```

Sample Language file en.json

```json
{
    "success": "Success!",
    "email_phone_validation": "Email and phone cannot be empty",
    "something_went_wrong": "Something went wrong!",
    "missing_required_validation": "Missing required fields"
}
```


It also support templated json strings

```js

const Language = require("@shypes/language-translator");

const LangParser = Language();

LangParser.setBaseDir(__dirname);

LangParser.setActiveLang('ar');

translated = LangParser.translate('missing_truck', {'status':"delivered"} )

translated.then((text) =>{
   console.log(text);
});
```

```json
{
    "missing_truck": "تم تعيين تجمع طلبات الشاحنات بالفعل على ${status}",
}
```


Test Files

```js
node test1.js
node test2.js
node test3.js
node test4.js
```