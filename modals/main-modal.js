const loki = require('lokijs');
const customError = require( '../lib/custom-error.js' );

const lokiIndexedAdapter = require('../node_modules/lokijs/src/loki-indexed-adapter.js');




module.exports = class mainModal {
    constructor(dbName,collectionName, collectionOption){
        this.dbName = dbName;
        this.collectionName = collectionName;

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

    insert(data){
        try{
            if(data && this.collection){
                let result = (this.collection.insert(data));
                this.db.saveDatabase();
                return result;
            } else {
                throw Error("Data or collection missing in main-modal insert function");
            }
        } catch(error){
            customError.handleError(error);
        }        
    }

    find(query){
        try{
            if(query && this.collection){
                switch(true){
                    case !isNaN(query):
                        this.collection.get(query);
                        break;
                    default:
                        this.collection.find(query);
                }
            }else {
                throw Error("Query or collection missing  in main-modal find function");
            }
        } catch(error){
            customError.handleError(error);
        }
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
