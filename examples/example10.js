
const Language = require('../');

Language._({
    default_lang : "en",
    __basedir : __dirname
})

async function run(){

    Language.setLoadFromFile(false);

    await Language.load('ar', {
        "deliver_code":"why مرحبًا ${name} ، إليك رمز me ${code}"
    });

    await Language.load('en', {
        "deliver_code":"why ${name}, here is your me code ${code}"
    });

    console.log(Language.getPath());

    translated = await Language.get('deliver_code', 'ar', {'name':"John", 'code': 343923});

    console.log(translated);

    translated = await Language.get('deliver_code','en', {'name':"John", 'code': 343923});

    console.log(translated);

    Language.setLoadFromFile(true);

    await Language.setLanguageDir("lang/email");

    console.log(Language.getPath());

    translated = await Language.get('deliver_code', 'ar', {'name':"John", 'code': 343923});

    console.log(translated);

    translated = await Language.get('deliver_code','en', {'name':"John", 'code': 343923});

    console.log(translated);

    await Language.setLanguageDir("lang");

    console.log(Language.getPath());

    translated = await Language.get('deliver_code','ar', {'name':"John", 'code': 343923});

    console.log(translated);

    translated = await Language.get('deliver_code','en', {'name':"John", 'code': 343923});

    console.log(translated);

    await Language.setLanguageDir("lang/email");

    console.log(Language.getPath());

    translated = await Language.get('deliver_code','ar', {'name':"John", 'code': 343923});

    console.log(translated);

    translated = await Language.get('deliver_code','en', {'name':"John", 'code': 343923});

    console.log(translated);

    await Language.load('ar', {
        "deliver_code":"مرحبًا ${name} ، إليك رمز fuck ${code}"
    });

    await Language.load('en', {
        "deliver_code":"Hello ${name}, here is your me fuck ${code}"
    });

    console.log(Language.getPath());

    translated = await Language.get('deliver_code','ar', {'name':"John", 'code': 343923});

    console.log(translated);

    translated = await Language.get('deliver_code','en', {'name':"John", 'code': 343923});

    console.log(translated);

    await Language.setLanguageDir("lang");

    console.log(Language.getPath());

    translated = await Language.get('deliver_code','ar', {'name':"John", 'code': 343923});

    console.log(translated);

    translated = await Language.get('deliver_code','en', {'name':"John", 'code': 343923});

    console.log(translated);

    await Language.setLanguageDir("lang/email");

    console.log(Language.getPath());

    translated = await Language.get('deliver_code','ar', {'name':"John", 'code': 343923});

    console.log(translated);

    translated = await Language.get('deliver_code','en', {'name':"John", 'code': 343923});

    console.log(translated);

    translated = await Language.get('deliver_code_me','ar', {'name':"John", 'code': 343923});

    console.log(translated);

    translated = await Language.get('deliver_code_me','en', {'name':"John", 'code': 343923});

    console.log(translated);

}


run();








 


