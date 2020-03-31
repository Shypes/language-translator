global.__basedir = __dirname;

const Language = require('./language');

const LangParser = new Language();

LangParser.setBaseDir("./");

translated = LangParser.translate('ar','email_phone_validation')

translated.then((text) =>{
   console.log(text);
});
