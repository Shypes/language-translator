const {promisify} = require('util');
const path = require('path');
const fs = require('fs');

global.activeLangData = {};
global.defaultLangData = {};
global.passiveLangData = {};

class Language {

    constructor() {
        this.reset();
    }

    reset (){
        this.default_lang = "en"
        this.__basedir = "./";
        this.ext = ".json";
        this.langFolder = 'lang';
        this.active_lang = this.default_lang;
        this.loaded = false;
        this.load_from_file = true;
        this.setPath();
    }

    setActiveLang(language){
        language = (!language || language == '')  ? false : language;
        if(language) this.active_lang = language.trim();
    }

    setExtention(ext){
        this.ext = ext;
    }

    setLoadFromFile(load){
        this.load_from_file = !load ? false : true;
    }

    setBaseDir(directory){
        this.__basedir = directory;
        this.setPath();
    }

    setLanguageDir(directory){
        this.langFolder = directory;
        this.setPath();
    }

    setDefaultLang(language){
        this.default_lang = language;
        this.loaded = false;
        defaultLangData = {};
    }

    setPath(){
        this.langPath = path.join(this.__basedir, this.langFolder);
    }

    getPath(){
        return this.langPath;
    }

    gettext(text, param={}){
        if (passiveLangData.hasOwnProperty(this.active_lang)) {
            if (passiveLangData[this.active_lang].hasOwnProperty(text)) {
                if(Object.keys(param).length == 0)
                    return passiveLangData[this.active_lang][text];
                else
                    return this.renderString(passiveLangData[this.active_lang][text], param);
            }
        }
        return text;
    }

    renderString(template, variables, fallback) {
        return template.replace(/\${[^{]+}/g, (match) => {
            const path = match.slice(2, -1).trim();
            return this.getObjPath(path, variables, fallback);
        });
    }
    
    getObjPath(path, obj, fallback = '') {
        return path.split('.').reduce((res, key) =>  this.gettext(res[key]) || fallback, obj);
    }

    async translate (text, param={}, language=false){
        language = !language ? false : language;
        await this.init(language);
        return this.gettext(text, param);
    }

    async get (text, param={}, language=false){
        return await this.translate(text, param, language);
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
            let isFile =  fs.existsSync(`${file_path}/${this.default_lang}${this.ext}`)
            if(isFile){
                const readFile = promisify(fs.readFile);
                try {
                    defaultLangData = JSON.parse(await readFile(`${file_path}/${this.default_lang}${this.ext}`, 'utf8'));
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
            if (this.default_lang == this.active_lang){
                activeLangData[this.active_lang] = defaultLangData;
            }else{
                const file_path = this.getPath();
                let isFile =  fs.existsSync(`${file_path}/${this.active_lang}${this.ext}`)
                if(isFile){
                    const readFile = promisify(fs.readFile);
                    try {
                        activeLangData[this.active_lang] = JSON.parse(await readFile(`${file_path}/${this.active_lang}${this.ext}`, 'utf8'));
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

    loadLanguage(language, data){
        if (!passiveLangData.hasOwnProperty(language)) {
            passiveLangData[language] = data;
        }else{
            passiveLangData[language] = {
                ...passiveLangData[language],
                ...data
            };
        }
    }

}

module.exports = function languagetranslato(string) {
    return new Language();
};
