global.__basedir = __dirname;

const Language = require('./language');

const LangParser = new Language();

LangParser.setLang('ar');

LangParser.setBaseDir("./");

translated = LangParser.translate('email_phone_validation')

translated.then((text) =>{
   console.log(text);
});
