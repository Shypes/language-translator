
const {promisify} = require('util');
const path = require('path');
const fs = require('fs');

class Language {


    constructor() {
        this.langData = {};
        this.lang = "en"
        this.defaultData = {};
        this.passiveData = {};
        this.__basedir = "./"
        this.langPath = path.join(this.__basedir, 'src/lang');
    }

    async loadDefaultLang(){

        if(Object.keys(this.defaultData).length == 0){
            const readFile = promisify(fs.readFile);
            try {
                this.defaultData = JSON.parse(await readFile(`${this.langPath}/en.json`, 'utf8'));
            }catch (e) {
                console.log(e);
            }
        }
    }

    async loadActiveLang(){

        try {
            if (this.langData.hasOwnProperty(this.lang) == false) {

                const readDir = promisify(fs.readdir);

                const langFiles = await readDir(this.langPath);
                
                if(langFiles.includes(`${this.lang}.json`)){

                    const readFile = promisify(fs.readFile);
                    
                    this.langData[this.lang] = JSON.parse(await readFile(`${this.langPath}/${this.lang}.json`, 'utf8'));
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

    setLang(language){
        this.lang = language;
    }

    setPath(file_path){
        this.langPath = file_path;
    }

    setBaseDir(directory){
        this.__basedir = directory;
    }

    async translate (text){

        await this.loadDefaultLang();

        await this.loadActiveLang();
        
        this.loadPassiveLang()

        if (this.passiveData[this.lang].hasOwnProperty(text)) {
            return this.passiveData[this.lang][text];
        }
        
        return text;
    }
}

module.exports = Language;
