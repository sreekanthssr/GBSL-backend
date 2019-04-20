const loki = require('lokijs');
const customError = require( '../lib/custom-error.js' );

const lokiIndexedAdapter = require('../node_modules/lokijs/src/loki-indexed-adapter.js');




module.exports = class mainModal {
    constructor(dbName,collectionName, collectionOption, fieldList){
        this.dbName = dbName;
        this.collectionName = collectionName;
        this.fieldList = fieldList;
        this._createDB(collectionOption);
        
    }
    _createCollection(collectionOption){
        if(this.db){
            
            this.collection = (this.db.getCollection(this.collectionName) === null) ? this.db.addCollection(this.collectionName, collectionOption) : this.db.getCollection(this.collectionName);
        }
    } 

    _createDB(collectionOption){
        //let adapter = new lokiIndexedAdapter('loki');;
        this.db = new loki(this.dbName, {
            autosave : true,
            autoload: true,
            //adapter,
            autoloadCallback : () => {
                this._createCollection(collectionOption);
            }
        });
    }
    /**
     * 
     * @param {*} object {filed: 'name', mandatory: true, defaultValue : '', validationType : ''},
     * @param {*} and 
     */
    _checkFields(object, and){         
        try{
            let checkFlag = true;
            this.fieldList.forEach((fieldObj)=>{
                if(and ){
                    if(fieldObj.mandatory === true){
                        if(object[fieldObj.filed] ){
                            /**Type validation comes here */
                        }
                        else {
                            checkFlag = false;
                            return;
                        }
                    }                
                } 
                else{
                    if(object[fieldObj.filed]){
                        checkFlag = true;
                        return;
                    }
                } 
                
            });
            return checkFlag;
        } catch(error){
            customError.handleError(error);
        }
        return false;
    } 
    _prepareData(data){
        try{
            this.fieldList.forEach((fieldObj)=>{
                if(data[fieldObj.filed]){}
                else if(fieldObj.defaultValue !== undefined){
                    data[fieldObj.filed] = fieldObj.defaultValue;
                }
            });
            return data;
        }catch(error){
            customError.handleError(error);
        }
        return false;
    }
    insert(data){
        try{
            if(data && this.collection){
                data = this._prepareData(data);
                if(data){
                    let result = (this.collection.insert(data));
                    this.db.saveDatabase();
                    return result;
                }else {
                    throw Error("Data not correct in main-modal insert function");  
                }                
            } else {
                throw Error("Data or collection missing in main-modal insert function");
            }
        } catch(error){
            customError.handleError(error);
        } 
        return false;       
    }

    find(query){
        let result = null;
        try{
            if(query && this.collection){
                
                switch(true){
                    case !isNaN(query):
                    result = this.collection.get(query);
                        break;
                    default:
                    result = this.collection.find(query);
                }
            }else {
                throw Error("Query or collection missing  in main-modal find function");
            }
        } catch(error){
            customError.handleError(error);
        }
        return result;
    }

    update(query, updateCallBack){        
        try{
            if(query && updateCallBack && this.collection){
                this.collection.findAndUpdate(query, updateCallBack);
            }else {
                throw Error("Query or updateCallBack or collection missing  in main-modal update function");
            }
        } catch(error){
            customError.handleError(error);
        }
    }

    remove(query){
        try{
            if(condition && this.collection){
                this.collection.removeWhere(query, updateCallBack);
            }else {
                throw Error("Query or collection missing  in main-modal remove function");
            }
        } catch(error){
            customError.handleError(error);
        }
    }
}
