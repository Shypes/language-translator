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
        this.setPath();
    }

    setActiveLang(language){
        language = !language ? false : language;
        if(language) this.active_lang = language;
    }

    setExtention(ext){
        this.ext = ext;
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

    gettext(text){
        if (this.passiveLangData.hasOwnProperty(this.active_lang)) {
            if (this.passiveLangData[this.active_lang].hasOwnProperty(text)) {
                return this.passiveLangData[this.active_lang][text];
            }
        }
        return text;
    }

    async translate (text, language){
        language = !language ? false : language;
        await this.init(language);
        return this.gettext(text);
    }

    async init (language){
        this.setActiveLang(language);
        await this.loadDefaultLang();
        await this.loadActiveLang();
        this.loadPassiveLang();
    }

    async loadDefaultLang(){
        if(Object.keys(this.defaultLangData).length == 0 && this.loaded == false){
            const readFile = promisify(fs.readFile);
            try {
                const file_path = this.getPath();
                this.defaultLangData = JSON.parse(await readFile(`${file_path}/${this.default_lang}${this.ext}`, 'utf8'));
            }catch (e) {
                console.log(e);
            }
        }
        this.loaded = true;
    }

    async loadActiveLang(){
        try {
            if (this.activeLangData.hasOwnProperty(this.active_lang) == false) {
                if (this.default_lang == this.active_lang){
                    this.activeLangData[this.active_lang] = this.defaultLangData;
                }else{
                    const readDir = promisify(fs.readdir);
                    const file_path = this.getPath();
                    const langFiles = await readDir(file_path);
                    if(langFiles.includes(`${this.active_lang}${this.ext}`)){
                        const readFile = promisify(fs.readFile);
                        this.activeLangData[this.active_lang] = JSON.parse(await readFile(`${file_path}/${this.active_lang}${this.ext}`, 'utf8'));
                    }else{
                        this.activeLangData[this.active_lang] = {}
                    }
                }      
            }
        }catch (e) {
            console.log(e);
        }
    }

    loadPassiveLang(){
        if (this.passiveLangData.hasOwnProperty(this.active_lang) == false) {
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

module.exports = Language;
