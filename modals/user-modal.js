const customError = require( '../lib/custom-error.js' );
const mainModal = require( './main-modal.js' );


module.exports = class userModal extends mainModal {
    constructor(){
        
        let collectionOption = {
            unique : ['deviceId', 'phoneNumber', 'emailId']
        }
        let fieldList = [
            {filed: 'name', mandatory: true,},
            {filed: 'deviceId', mandatory: true,},
            {filed: 'phoneNumber', mandatory: true, _checkFieldsvalidationType : 'number'},
            {filed: 'emailId', mandatory: true, _checkFieldsvalidationType : 'email'},
            {filed: 'bloodGroup', mandatory: true,},
            {filed: 'dateOfBirth', mandatory: true, _checkFieldsvalidationType : 'date'},
        ];
        super(process.env.DB_FILE_NAME, process.env.USER_COLLECTION, collectionOption, fieldList);
        
    }
    
    add(object){
        let response = {statusCode: 3, statusText: "User details already exists"};            
        try {
            if(this._checkFields(object, true)){
                let result =  this.insert(object);
                if(result && result !== undefined){
                    response = {statusCode: 1, statusText: "Registration Completed", responseObj: {userId : result.$loki}};
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
    checkExists(queryObject) {
        let response = {statusCode: 3, statusText: "details not exists"};
        if(typeof queryObject === 'object' && this._checkFields(queryObject,false)){
            let result = this.find(queryObject);
            if(result.length){
                response = {statusCode: 1, statusText: "details exists"};  
            }
        }
        return response;
    }
}
