const {promisify} = require('util');
const path = require('path');
const fs = require('fs');

global.activeLangData = {};
global.defaultLangData = {};
global.passiveLangData = {};

class Language {

    constructor(options) {
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
        language = (!language || language == '')  ? false : language;
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

    setLanguageDir(directory){
        this.option['langFolder'] = directory;
        this.setPath();
    }

    setDefaultLang(language){
        this.option['default_lang'] = language;
        this.loaded = false;
        defaultLangData = {};
    }

    setPath(){
        this.langPath = path.join(this.option['__basedir'], this.option['langFolder']);
    }

    getPath(){
        return this.langPath;
    }

    text(text, language = false,  param={}){
        language = language ? language : this.active_lang;
        if (passiveLangData.hasOwnProperty(language)) {
            if (passiveLangData[language].hasOwnProperty(text)) {
                if(Object.keys(param).length == 0)
                    return passiveLangData[language][text];
                else
                    return this.renderString(language, passiveLangData[language][text], param);
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
        language = !language ? false : language;
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
        await this.loadPassiveLang();
    }

    async loadDefaultLang(){
        if(Object.keys(defaultLangData).length == 0 
        && this.loaded == false  
        && this.load_from_file){
            const file_path = this.getPath();
            let isFile =  fs.existsSync(`${file_path}/${this.option['default_lang']}${this.option['ext']}`)
            if(isFile){
                const readFile = promisify(fs.readFile);
                try {
                    defaultLangData = JSON.parse(await readFile(`${file_path}/${this.option['default_lang']}${this.option['ext']}`, 'utf8'));
                }catch (e) {
                    defaultLangData = {}
                }
            }
        }
        this.loaded = true;
    }

    async loadActiveLang(){
        if (!activeLangData.hasOwnProperty(this.active_lang) 
        && this.load_from_file 
        && !passiveLangData.hasOwnProperty(this.active_lang)) {
            if (this.option['default_lang'] == this.active_lang){
                activeLangData[this.active_lang] = defaultLangData;
            }else{
                const file_path = this.getPath();
                let isFile =  fs.existsSync(`${file_path}/${this.active_lang}${this.option['ext']}`)
                if(isFile){
                    const readFile = promisify(fs.readFile);
                    try {
                        activeLangData[this.active_lang] = JSON.parse(await readFile(`${file_path}/${this.active_lang}${this.option['ext']}`, 'utf8'));
                    }catch (e) {
                        activeLangData[this.active_lang] = {}
                    }
                }else{
                    activeLangData[this.active_lang] = {}
                }
            }      
        }
    }

    async loadPassiveLang(){
        if (!passiveLangData.hasOwnProperty(this.active_lang)) {
            passiveLangData[this.active_lang] = {
                ...defaultLangData
            };
            if (activeLangData.hasOwnProperty(this.active_lang)) {
                passiveLangData[this.active_lang] = {
                    ...passiveLangData[this.active_lang],
                    ...activeLangData[this.active_lang]
                };
            }
        }
    }

    load(language, data){
        if (!passiveLangData.hasOwnProperty(language)) {
            passiveLangData[language] = data;
        }else{
            passiveLangData[language] = {
                ...passiveLangData[language],
                ...data
            };
        }
    }

    loadLanguage(language, data){
        return this.load(language, data);
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
    Lang.load(language, data)
};
