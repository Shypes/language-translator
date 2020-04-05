
const Language = require('../');

const LangParser = Language._();

LangParser.setBaseDir(__dirname);

translate = LangParser.init('ar')

translate.then(() => {
   console.log(LangParser.gettext('missing_truck', 'ar', {'status':"delivered"}));
   console.log(LangParser.gettext('something_went_wrong'))
   console.log(LangParser.gettext('missing_required_validation'))
   console.log(LangParser.gettext('email_phone_validation'))
});
