const express = require('express');
const { createUser, handleLogin, getUser, getAccount, putUser, deleteUser, getUserById,  } = require('../controllers/userController');
const auth = require('../middleware/auth');
const delay = require('../middleware/delay');
const routerAPI = express.Router();

routerAPI.all("*", auth)

routerAPI.get("/", (req, res) => {
    return res.status(200).json("Hello world api")
})
//Main login, register, user
routerAPI.post("/register", createUser)
routerAPI.post("/login", handleLogin)
routerAPI.get("/account", getAccount)

//Get edit del user
routerAPI.get("/user", getUser)
routerAPI.get("/user/:idUser", getUserById)
routerAPI.put("/user", putUser)
routerAPI.delete("/user", deleteUser)

//

module.exports = routerAPI; //export default