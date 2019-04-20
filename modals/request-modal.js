const customError = require( '../lib/custom-error.js' );
const mainModal = require( './main-modal.js' );


module.exports = class requestModal extends mainModal {
    constructor(){
        
        let collectionOption = {
        }
        let fieldList = [
            {filed: 'userId', mandatory: true},
            {filed: 'deviceId', mandatory: true},
            {filed: 'bloodGroup', mandatory: true},
            {filed: 'location', mandatory: true},
            {filed: 'details', mandatory: true},
            {filed: 'whenNeeded', mandatory: true, _checkFieldsvalidationType : 'dateTime'},            
            {filed: 'activeStatus', defaultValue : 'true'},
            {filed: 'mapInfo', defaultValue : ''},
            {filed: 'pushNotificationStatus', defaultValue : 'false'},
        ];
        super(process.env.DB_FILE_NAME, process.env.REQUEST_COLLECTION, collectionOption, fieldList);
        
    }
    
    createNew(object){
        let response = {statusCode: 3, statusText: "User details already exists"};            
        try {
            if(this._checkFields(object, true)){
                let result =  this.insert(object);
                if(result && result !== undefined){
                    response = {statusCode: 1, statusText: "Registration Completed"};
                }                
            }
            else {
                response = {statusCode: 2, statusText: "User fields are missing"};
                throw Error("Error in user modal add user functions");
            }
        } catch(error){
            customError.handleError(error);
        }  
        return response;    
    }
    getAll(queryObject) {
    }
    remove(queryObject) {
    }
    update(){
        
    }
}
