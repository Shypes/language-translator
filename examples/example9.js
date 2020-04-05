const Language = require('../');

Language._({
   default_lang : "en",
   __basedir : 'lang'
})

Language.load('ar', {
    "deliver_code":"مرحبًا ${name} ، إليك رمز otp ${code}"
    }
)

Language.load('en', {
    "deliver_code":"Hello ${name}, here is your otp code ${code}"
    }
)

let translated = Language.get('deliver_code', 'ar', {'name':"John", 'code': 343923});

translated.then((text) => {
   console.log(text);
});

translated = Language.get('deliver_code','en', {'name':"John", 'code': 343923});

translated.then((text) => {
   console.log(text);
});