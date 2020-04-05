
const Language = require('../');

const LangParser = Language._();

LangParser.setBaseDir(__dirname);

LangParser.setActiveLang('en');

translated = LangParser.get('deliver_code', {'name':"John", 'code': 343923} )

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
