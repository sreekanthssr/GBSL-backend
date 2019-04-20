require('dotenv').config();

module.exports = class customError{
    static handleError(error){
        if(process.env.CURRENT_ENV === 'dev'){
            console.log(error);
        }
    }
}
