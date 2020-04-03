
const Language = require('./language');

const LangParser = new Language();

LangParser.setBaseDir(__dirname);

LangParser.setActiveLang('ar');

translated = LangParser.translate('missing_truck', {'status':"delivered"}, 'ar ' )

translated.then((text) =>{
   console.log(text);
});

translated = LangParser.translate('something_went_wrong')

translated.then((text) =>{
   console.log(text);
});

translated = LangParser.translate('missing_required_validation')

translated.then((text) =>{
   console.log(text);
});


translated = LangParser.translate('email_phone_validation')

translated.then((text) =>{
   console.log(text);
});
