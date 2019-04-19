const customError = require( '../lib/custom-error.js' );
const mainModal = require( './main-modal.js' );


module.exports = class userModal extends mainModal {
    constructor(){
        let collectionOption = {
            unique : ['deviceId', 'phoneNumber', 'emailId']
        }
        super(process.env.DB_FILE_NAME, process.env.USER_COLLECTION, collectionOption);
    }
    _checkObject(object, and){
        if(and) {
            return (object.name && object.deviceId && object.phoneNumber && object.emailId &&  object.bloodGroup);
        } 
        return (object.name || object.deviceId || object.phoneNumber || object.emailId ||  object.bloodGroup);
    }
    addUser(object){
        let response = {statusCode: 3, statusText: "User details already exists"};            
        try {
            if(this._checkObject(object, true)){
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
    checkUserExists(queryObject) {
        let response = {statusCode: 3, statusText: "details not exists"};
        if(typeof queryObject === 'object' && this._checkObject(queryObject,false)){
            let result = this.find(queryObject);
            if(result.length){
                response = {statusCode: 1, statusText: "details exists"};  
            }
        }
        return response;
    }
}
