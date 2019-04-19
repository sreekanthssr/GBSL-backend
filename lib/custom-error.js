module.exports = class customError{
    static handleError(error){
        if(process.env.PORT === 'CURRENT_ENV'){
            console.log(error);
        }
    }
}
