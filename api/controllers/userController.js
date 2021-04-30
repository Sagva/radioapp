const sqlite3 = require("sqlite3");
const Encrypt = require("../Encrypt");
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "../../DB/radioappUsersBD.db"));


// Checks which session is active or not and returns this to the client/frontend.
const whoami = (req,res)=> {
    console.log(`req.session is`, req.session);
    res.json(req.session.user || null)
}

const login = (req,res)=> {
    let query = `SELECT * FROM users WHERE email = $email`
    let params = {$email: req.body.email}
    
    db.get(query, params, (err, userInDB) => {
        if(!userInDB) {
            console.log(`error during checking if already exist `, err);
            res.status(401).json({error: "Bad credentials"})
            return
        }
        req.body.password = Encrypt.encrypt(req.body.password)
        if(userInDB.password === req.body.password) {
            delete userInDB.password
            req.session.user = userInDB
            res.json({
                success: "Login successfully", 
                loggedInUser: userInDB})
                return
            } else {
                res.status(401).json({error: userInDB})
            return
        }

    })
}

const logout = (req,res)=> {
    delete req.session.user
    res.json({success: 'Logout successfully'})
}

const register = (req,res)=> {
    let userToRegister = req.body
    console.log(userToRegister);
    //before trying to register the user, check if the user alredy exist
    let query = `SELECT * FROM users WHERE email = $email`
    let params = {$email: userToRegister.email}
    db.get(query, params, (err, userExist) => {
        if(userExist) {
            res.status(400).json({error: 'User with that email already exist'})
            
        } else {
            console.log(`in the else state, after checking exesting`);
            userToRegister.password = Encrypt.encrypt(userToRegister.password)
        
            //add to dataBase
            query = `INSERT INTO users (userName, email, password) VALUES ($userName, $email, $password)`
            params = {
                $userName: userToRegister.userName,
                $email: userToRegister.email, 
                $password: userToRegister.password
            }
        
            db.run(query, params, function(err) {
                if(err) {
                    console.log(`in the error if`, err);
                    res.status(400).json({error: err})
                    return
                }
                res.json({success: "User regestered successfully", lastId: this.lastId})
            })
        }
    })
}




// Export the differents route handlers
module.exports = {
    whoami,
    login,
    logout,
    register
};
