# @shypes/language-translator

[![npm (scoped)](https://img.shields.io/npm/v/@shypes/language-translator.svg)](https://www.npmjs.com/package/@shypes/language-translator)
[![GitHub issues](https://img.shields.io/github/issues/Shypes/language-translator)](https://img.shields.io/github/issues/Shypes/language-translator)

## Introduction

This is a simple light weight language parser to help with language key translations, built for speed using in-memory caching optimization technique.

Language file only get loaded once during your application life cycle

## Install

```$
npm install @shypes/language-translator
```

## Usage

Follow the set by step guide below

## Language Folder Setup

Create a dedicated folder to store your language template file.

Default folder is `lang` from your base directory configuration, 

You will see how to set up your **base directory** below

Create the different sample files below in the language folder

**ar.json**

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

**en.json**

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

## Initilaise the Application

```js
const Language = require("@shypes/language-translator");
```

## New version features

Simple usage from **version 2.0.1**

**Version >= 2.0.1**

```js
Language._({
    __basedir : "./",
    langFolder : 'src/lang'
});
```

Loading with optional parameters

```js
Language._({
    default_lang : "en",
    ext : ".json",
    __basedir : "./",
    langFolder : 'lang'
})
```
## For Version <= 1.2.3

```js
const Lang = Language();
```

## Some Basic Configuration - Optional

Simple usage from **version <= 1.2.3**

```js
// set your base directory
Lang.setBaseDir("./"));

// set your base directory
Lang.setLanguageDir('src/lang');

// set your default language
Lang.setDefaultLang('en');

// set the extention for yout language file, default is .json
Lang.setExtention(".txt");
```

## Translation begin here

**version <= 1.2.3**

```js
// set the language in which you need

Lang.setActiveLang('ar');

// get the text base on the defined language key

translated = Lang.get('email_phone_validation')

translated.then((text) => {
   console.log(text);
});
```

**version > 2.0.3**

```js
// get the text base on the defined language key

translated = Language.get('email_phone_validation', 'ar')

translated.then((text) => {
   console.log(text);
});
```

## Using a function

```js
testTranslate = async (language, message) => {

    translated =  await Language.get(message, language)

    let data = {
        message: translated,
        language
    };

    console.log(data);
};

testTranslate('ar','something_went_wrong')

testTranslate('en','missing_required_validation')

testTranslate('ar','email_phone_validation')
```

In line Langauge Loading Supported, this help you load your language data directly with a file

avaliable in  **version >= 2.0.3**

```js

const data = {
    "success": "نجاح",
    "email_phone_validation": "لا يمكن أن يكون البريد الإلكتروني والهاتف فارغين",
    "something_went_wrong": "هناك خطأ ما!",
    "missing_required_validation": "الحقول المطلوبة مفقودة",
    "missing_truck": "تم تعيين تجمع طلبات الشاحنات بالفعل على ${status}",
    "deliver_code":"مرحبًا ${name} ، إليك رمز otp ${code}"
}

Language.load('ar', data)


```

## Dynamic language template

It also support **templated** json strings

```json
{
    "deliver_code":"مرحبًا ${name} ، إليك رمز otp ${code}"
}
```

```js
translated = Language.get('deliver_code', 'ar', {'name':"John", 'code': 343923} )

translated.then((text) =>{
   console.log(text);
});
```

Output:

```json
مرحبًا John ، إليك رمز otp 343923
```

## Switch between Language Folder

```js
await Language.setLanguageDir("lang/sms");

console.log(Language.getPath());

translated = await Language.get('deliver_code','ar', {'name':"John", 'code': 343923});

console.log(translated);

await Language.setLanguageDir("lang/email");

console.log(Language.getPath());

translated = await Language.get('deliver_code','ar', {'name':"John", 'code': 343923});

console.log(translated);
```

Check out the [sample files](https://github.com/Shypes/language-translator/tree/master/examples) in the test directory

## License

[MIT](LICENSE) © Tosin Adesipe
