const {promisify} = require('util');
const path = require('path');
const fs = require('fs');

class Language {


    constructor() {
        this.reset();
    }

    reset (){
        this.default_lang = "en"
        this.activeLangData = {};
        this.defaultLangData = {};
        this.passiveLangData = {};
        this.__basedir = "./";
        this.ext = ".json";
        this.langFolder = 'src/lang';
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

    setPath(){
        this.langPath = path.join(this.__basedir, this.langFolder);
    }

    setDefaultLang(language){
        this.default_lang = language;
        this.loaded = false;
        this.defaultLangData = {};
    }

    getPath(){
        return this.langPath;
    }

    gettext(text, param={}){
        if (this.passiveLangData.hasOwnProperty(this.active_lang)) {
            if (this.passiveLangData[this.active_lang].hasOwnProperty(text)) {
                if(Object.keys(param).length == 0)
                    return this.passiveLangData[this.active_lang][text];
                else
                    return this.renderString(this.passiveLangData[this.active_lang][text], param);
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

    async init (language){
        this.setActiveLang(language);
        await this.loadDefaultLang();
        await this.loadActiveLang();
        await this.loadPassiveLang();
    }

    async loadDefaultLang(){
        if(Object.keys(this.defaultLangData).length == 0 
        && this.loaded == false  
        && this.load_from_file){
            const file_path = this.getPath();
            let isFile =  fs.existsSync(`${file_path}/${this.default_lang}${this.ext}`)
            if(isFile){
                const readFile = promisify(fs.readFile);
                try {
                    this.defaultLangData = JSON.parse(await readFile(`${file_path}/${this.default_lang}${this.ext}`, 'utf8'));
                }catch (e) {
                    this.defaultLangData = {}
                }
            }
        }
        this.loaded = true;
    }

    async loadActiveLang(){
        if (!this.activeLangData.hasOwnProperty(this.active_lang) 
        && this.load_from_file 
        && !this.passiveLangData.hasOwnProperty(this.active_lang)) {
            if (this.default_lang == this.active_lang){
                this.activeLangData[this.active_lang] = this.defaultLangData;
            }else{
                const file_path = this.getPath();
                let isFile =  fs.existsSync(`${file_path}/${this.active_lang}${this.ext}`)
                if(isFile){
                    const readFile = promisify(fs.readFile);
                    try {
                        this.activeLangData[this.active_lang] = JSON.parse(await readFile(`${file_path}/${this.active_lang}${this.ext}`, 'utf8'));
                    }catch (e) {
                        this.activeLangData[this.active_lang] = {}
                    }
                }else{
                    this.activeLangData[this.active_lang] = {}
                }
            }      
        }
    }

    loadLanguage(language, data){
        if (!this.passiveLangData.hasOwnProperty(language)) {
            this.passiveLangData[language] = data;
        }else{
            this.passiveLangData[language] = {
                ...this.passiveLangData[language],
                ...data
            };
        }
    }

    async loadPassiveLang(){
        if (!this.passiveLangData.hasOwnProperty(this.active_lang)) {
            this.passiveLangData[this.active_lang] = {
                ...this.defaultLangData
            };
            if (this.activeLangData.hasOwnProperty(this.active_lang)) {
                this.passiveLangData[this.active_lang] = {
                    ...this.passiveLangData[this.active_lang],
                    ...this.activeLangData[this.active_lang]
                };
            }
        }
    }
}

module.exports = function languagetranslato(string) {
    return new Language();
};
