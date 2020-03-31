
const Language = require('./language');

const LangParser = new Language();

LangParser.setBaseDir("./");

translate = LangParser.init('ar')

translate.then(() => {
   console.log(LangParser.gettext('success'));
   console.log(LangParser.gettext('something_went_wrong'))
   console.log(LangParser.gettext('missing_required_validation'))
   console.log(LangParser.gettext('email_phone_validation'))
});
