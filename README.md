# @shypes/language-translator

[![npm (scoped)](https://img.shields.io/npm/v/@shypes/language-translator.svg)](https://www.npmjs.com/package/@shypes/language-translator)
[![GitHub issues](https://img.shields.io/github/issues/Shypes/language-translator)](https://img.shields.io/github/issues/Shypes/language-translator)

This is a simple node.js langusge parse to help with language translation

## Install

```$
npm install @shypes/language-translator
```

## Usage

```js
const Language = require("@shypes/language-translator");

const Lang = Language();

Lang.setLang('ar');

translated = Lang.translate('email_phone_validation')

translated.then((text) =>{
   console.log(text);
});

```

Optional Method

```js

Lang.setActiveLang("en");

Lang.setBaseDir("./");

Lang.setLanguageDir("src/lang");

Lang.setDefaultLang("ar");

Lang.setExtention(".txt");

Lang.setLoadFromFile(false);

```

In line Langauge Loading Supported

```js

Lang.loadLanguage('ar', {
    "success": "نجاح",
    "email_phone_validation": "لا يمكن أن يكون البريد الإلكتروني والهاتف فارغين",
    "something_went_wrong": "هناك خطأ ما!",
    "missing_required_validation": "الحقول المطلوبة مفقودة",
    "missing_truck": "تم تعيين تجمع طلبات الشاحنات بالفعل على ${status}",
    "positioned": "وضعه",
    "in-premise": "في الفرضية",
    "loaded": "محمل",
    "transporting": "نقل",
    "At-destination": "في الوجهة",
    "offloaded": "تفريغها",
    "returningContainer": "حاوية عائدة",
    "delivered": "تم التوصيل",
    "deliver_code":"مرحبًا ${name} ، إليك رمز otp ${code}"
    }
)
```

Sample Language file ar.json

```json
{
    "success": "نجاح",
    "email_phone_validation": "لا يمكن أن يكون البريد الإلكتروني والهاتف فارغين",
    "something_went_wrong": "هناك خطأ ما!",
    "missing_required_validation": "الحقول المطلوبة مفقودة",
    "missing_truck": "تم تعيين تجمع طلبات الشاحنات بالفعل على ${status}",
    "deliver_code":"مرحبًا ${name} ، إليك رمز otp ${code}"
}
```

Sample Language file en.json

```json
{
    "success": "Success!",
    "email_phone_validation": "Email and phone cannot be empty",
    "something_went_wrong": "Something went wrong!",
    "missing_required_validation": "Missing required fields",
    "missing_truck": "Truck Request Pool has already been set to ${status}", 
    "deliver_code":"Hello ${name}, here is your otp code ${code}"
}
```


It also support templated json strings

```js

const Language = require("@shypes/language-translator");

const Lang = Language();

Lang.setBaseDir(__dirname);

Lang.setActiveLang('ar');

translated = Lang.translate('deliver_code', {'name':"John", 'code': 343923} )

translated.then((text) =>{
   console.log(text);
});
```

Template File

```json
{
    "deliver_code":"مرحبًا ${name} ، إليك رمز otp ${code}"
}
```

Output:

```json

مرحبًا John ، إليك رمز otp 343923

```

### Contains Sample Files in the Test Folder

```js
node test1.js
node test2.js
node test3.js
node test4.js
node test5.js
node test6.js
```

## License

[MIT](LICENSE) © Tosin Adesipe
