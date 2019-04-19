const customError = require( '../lib/custom-error.js' );
const mainModal = require( './main-modal.js' );


module.exports = class userModal extends mainModal {
    constructor(){
        let collectionOption = {
            unique : ['deviceId', 'phoneNumber', 'emailId']
        }
        super(process.env.DB_FILE_NAME, process.env.USER_COLLECTION, collectionOption);
    }
    _checkObject(object){
        return (object.name && object.deviceId && object.phoneNumber && object.emailId &&  object.bloodGroup);
    }
    addUser(object){
        try {
            if(this._checkObject(object)){
                return this.insert(object);
            }
            else {
                throw Error("Error in user modal add user functions");
            }
        } catch(error){
            customError.handleError(error);
        }       
    }
}
