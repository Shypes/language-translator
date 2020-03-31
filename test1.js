
const Language = require('./language');

const LangParser = new Language();

LangParser.setBaseDir(__dirname);

translated = LangParser.translate('ar','success')

translated.then((text) =>{
   console.log(text);
});

translated = LangParser.translate('ar','something_went_wrong')

translated.then((text) =>{
   console.log(text);
});

translated = LangParser.translate('ar','missing_required_validation')

translated.then((text) =>{
   console.log(text);
});


translated = LangParser.translate('ar','email_phone_validation')

translated.then((text) =>{
   console.log(text);
});
