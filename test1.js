global.__basedir = __dirname;

const Language = require('./language');

const LangParse = new Language();

LangParse.setLang('ar');

LangParse.setBaseDir("./");

translated = LangParse.translate('email_phone_validation')

translated.then((text) =>{
   console.log(text);
});
