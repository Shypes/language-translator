const Language = require('../');

Language._({
   default_lang : "ar",
   __basedir : __dirname
})

const translated = Language.get('something_went_wrong');

translated.then((text) => {
   console.log(text);
});
