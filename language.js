
const {promisify} = require('util');
const path = require('path');
const fs = require('fs');

class Language {


    constructor() {
        this.default_lang = "en"
        this.langData = {};
        this.defaultData = {};
        this.passiveData = {};
        this.__basedir = "./";
        this.langFolder = 'src/lang';
        this.lang = this.default_lang;
        this.setPath();
    }

    setLang(language){
        this.lang = language;
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

    getPath(){
        return this.langPath;
    }

    gettext(text){
        if (this.passiveData[this.lang].hasOwnProperty(text)) {
            return this.passiveData[this.lang][text];
        }
        return text;
    }

    async translate (text){

        await this.loadDefaultLang();

        await this.loadActiveLang();
        
        this.loadPassiveLang();
        
        return this.gettext(text);
    }

    async loadDefaultLang(){

        if(Object.keys(this.defaultData).length == 0){
            const readFile = promisify(fs.readFile);
            try {
                const file_path = this.getPath();
                this.defaultData = JSON.parse(await readFile(`${file_path}/${this.default_lang}.json`, 'utf8'));
            }catch (e) {
                console.log(e);
            }
        }
    }

    async loadActiveLang(){

        try {
            if (this.langData.hasOwnProperty(this.lang) == false) {

                const readDir = promisify(fs.readdir);

                const file_path = this.getPath();

                const langFiles = await readDir(file_path);

                if(langFiles.includes(`${this.lang}.json`)){

                    const readFile = promisify(fs.readFile);
                    
                    this.langData[this.lang] = JSON.parse(await readFile(`${file_path}/${this.lang}.json`, 'utf8'));
                }
            }
        }catch (e) {
            console.log(e);
        }
    }

    loadPassiveLang(){

        if (this.passiveData.hasOwnProperty(this.lang) == false) {
           
            this.passiveData[this.lang] = {
                ...this.defaultData
            };

            if (this.langData.hasOwnProperty(this.lang)) {
                this.passiveData[this.lang] = {
                    ...this.passiveData[this.lang],
                    ...this.langData[this.lang]
                };
            }
        }
    }
}

module.exports = Language;
