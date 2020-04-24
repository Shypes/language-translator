const {promisify} = require('util');
const path = require('path');
const fs = require('fs');


class Language {

    constructor(options) {
        this.LanguageData = {};
        this.FolerLanguage = {};  
        this.reset(options);
    }

    setOptions (options){
        this.option = {
            ...this.default, ...options
        }
    }

    reset (options){
        this.default = {
            default_lang : "en",
            __basedir : "./",
            ext : ".json",
            langFolder : 'lang',
        }
        this.setOptions(options);
        this.active_lang = this.option['default_lang'];
        this.loaded = false;
        this.load_from_file = true;
        this.setPath();
    }

    setActiveLang(language){
        language = (language && language != '' && typeof language == 'string')  ? language : false;
        if(language) this.active_lang = language.trim();
    }

    setExtention(ext){
        this.option['ext'] = ext;
    }

    setLoadFromFile(load){
        this.load_from_file = !load ? false : true;
    }

    setBaseDir(directory){
        this.option['__basedir'] = directory;
        this.setPath();
    }

    async setLanguageDir(directory){
        // if (this.option['langFolder'] != directory){
            this.option['langFolder'] = directory;
            this.setPath();
            await this.init(false);
            for (var language in this.FolerLanguage[this.option['langFolder']]){
                let data = this.FolerLanguage[this.option['langFolder']][language];
                this.load(language, data);
            }
        // }
    }

    setDefaultLang(language){
        this.option['default_lang'] = language;
        this.loaded = false;
        defaultLangData = {};
    }

    setPath(){
        this.langPath = path.join(this.option['__basedir'], this.option['langFolder']);
        if (!this.FolerLanguage.hasOwnProperty(this.option['langFolder'])) {
            this.FolerLanguage[this.option['langFolder']] = {};
        }
    }

    getPath(){
        return this.langPath;
    }

    text(text, language = false,  param={}){
        language = (language && language != '' && typeof language == 'string')  ? language : this.active_lang;
        if (this.LanguageData.hasOwnProperty(language)) {
            if (this.LanguageData[language].hasOwnProperty(text)) {
                if(Object.keys(param).length == 0)
                    return this.LanguageData[language][text];
                else
                    return this.renderString(language, this.LanguageData[language][text], param);
            }
        }
        return text;
    }

    gettext(text, language = false,  param={}){
        return this.text(text, language,  param);
    }

    renderString(language, template, variables, fallback) {
        return template.replace(/\${[^{]+}/g, (match) => {
            const path = match.slice(2, -1).trim();
            return this.getObjPath(language, path, variables, fallback);
        });
    }
    
    getObjPath(language, path, obj, fallback = '') {
        return path.split('.').reduce((res, key) =>  this.text(res[key],language) || fallback, obj);
    }

    async translate (text, language=false, param={}){
        await this.init(language);
        return this.text(text, language, param);
    }

    async get (text, language=false, param={}){
        return await this.translate(text, language, param);
    }

    async init (language){
        this.setActiveLang(language);
        await this.loadDefaultLang();
        await this.loadActiveLang();
    }

    async loadDefaultLang(){
        if(this.loaded == false){
            await this.loadLanguage(this.option['default_lang']);
        }
        this.loaded = true;
    }

    async loadActiveLang(){
        await this.loadLanguage(this.active_lang);
    }

    hasLoadedLanguage(language){
        return this.FolerLanguage[this.option['langFolder']].hasOwnProperty(language);
    }

    canLoad(language){
        const file_path = this.getPath();
        return fs.existsSync(`${file_path}/${language}${this.option['ext']}`)
    }

    markAsLoaded(language){
        this.loadFolderLanguage(language);
    }

    loadFolderLanguage(language, data={}){
        if(typeof data === 'object'){
            this.setPath();
            this.FolerLanguage[this.option['langFolder']][language] = data;
        }
    }

   getFolderLanguage(language){
        if (this.FolerLanguage.hasOwnProperty(this.option['langFolder'])) {
            if (this.FolerLanguage[this.option['langFolder']].hasOwnProperty(language)) {
                return this.FolerLanguage[this.option['langFolder']][language];
            }
        }
        return {};
    }

    async getFile(language){
         try {
            const readFile = promisify(fs.readFile);
            const file_path = this.getPath();
            return JSON.parse(await readFile(`${file_path}/${language}${this.option['ext']}`, 'utf8'));
        }catch (e) {
            return {};
        }
    }

    async loadLanguage(language){
        if (this.load_from_file 
        && !this.hasLoadedLanguage(language)
        ) {
            if(this.canLoad(language)){ 
                this.loadFolderLanguage(language, await this.getFile(language));
                this.load(language, this.getFolderLanguage(language));
            }else{
                this.markAsLoaded(language);
            }
        }
    }

    load(language, data){
        if( typeof data === 'object' && Object.keys(data).length > 0){
            if (!this.LanguageData.hasOwnProperty(language)) {
                this.LanguageData[language] = data;
            }else{
                this.LanguageData[language] = {
                    ...this.LanguageData[language],
                    ...data
                };
            }
        }
    }
}

global._SL = null;

exports.getLang = getLang = (options) =>   {
    if (_SL == null){
        _SL = new Language(options);
    }
    return _SL;
};

exports._ = (options) => {
    return getLang(options);
};

exports.get = async (text, language=false, param={}) => {
    Lang = getLang();
    return await Lang.get(text, language, param)
};

exports.text = (text, language=false, param={}) => {
    Lang = getLang();
    return Lang.text(text, language, param)
};

exports.load = async (language, data) => {
    Lang = getLang();
    await Lang.init (language);
    return Lang.load(language, data)
};

exports.setLoadFromFile = (load) => {
    Lang = getLang();
    return Lang.setLoadFromFile (load);
};

exports.getPath = () => {
    Lang = getLang();
    return Lang.getPath();
};

exports.setActiveLang = (language) => {
    Lang = getLang();
    return Lang.setActiveLang(language);
};


exports.setLanguageDir = async (directory) => {
    Lang = getLang();
    return await Lang.setLanguageDir (directory);
};
