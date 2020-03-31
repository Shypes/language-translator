
const Language = require('./language');

const LangParse = new Language();

LangParse.setBaseDir(__dirname);

sendSuccessResponse = async (res, content, message) => {

    LangParse.setLang(res.language)

    translated =  await LangParse.translate(message)

    let data = {
        success: true,
        message: translated,
        data: content
    };

    console.log(data)

    return data
    // res.status(200).json(data);
};


res = {
    'language': 'ar'
}

data = sendSuccessResponse(res , {}, 'email_phone_validation')


setTimeout(function(){

    data = sendSuccessResponse(res , {}, 'something_went_wrong')

    data = sendSuccessResponse(res , {}, 'something_went_wrong')


    data = sendSuccessResponse(res , {}, 'missing_required_validation')


    data = sendSuccessResponse(res , {}, 'something_went_wrong')


    data = sendSuccessResponse(res , {}, 'something_went_wrong')

}, 1000)


