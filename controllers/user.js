const userModal =  require( '../modals/user-modal.js');

module.exports = class userController{
    constructor(app){
        this.app = app;
        this.userModalObj = new userModal();
        this._addUser();
        this._checkUserExists();
    }

    _addUser(){
        this.app.post('/register-user', (req, res) => {
            let params = req.body;
            let userObject = {...req.body};            
            let result = this.userModalObj.addUser(userObject);           
            res.status(200).send(result);
        });
    }

    _checkUserExists(){
        this.app.get('/check-user-exists/:params', (req, res) => {
            let userObject = JSON.parse(decodeURI( req.params.params));

            let result = this.userModalObj.checkUserExists(userObject);
        
            res.status(200).send(result);
        });
    }

}