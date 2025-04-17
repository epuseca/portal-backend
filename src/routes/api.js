const express = require('express');
const { createUser, handleLogin, getUser, getAccount, putUser, deleteUser, getUserById, } = require('../controllers/userController');
const auth = require('../middleware/auth');
const delay = require('../middleware/delay');
const { createTag, getTag, getTagById, putTag, deleteTag } = require('../controllers/tagController');
const { createSystem, getSystem, getSystemById, putSystem, deleteSystem } = require('../controllers/systemController');
const routerAPI = express.Router();

routerAPI.all("*", auth)

routerAPI.get("/", (req, res) => {
    return res.status(200).json("Hello world api")
})
//Main login, register, user
routerAPI.post("/login", handleLogin)
routerAPI.get("/account", getAccount)
routerAPI.post("/register", createUser)

//Get edit del user
routerAPI.get("/user", getUser)
routerAPI.get("/user/:idUser", getUserById)
routerAPI.put("/user", putUser)
routerAPI.delete("/user", deleteUser)

//Get edit del tag
routerAPI.post("/tag", createTag)
routerAPI.get("/tag", getTag)
routerAPI.get("/tag/:idTag", getTagById)
routerAPI.put("/tag", putTag)
routerAPI.delete("/tag", deleteTag)

//Get edit del system
routerAPI.post("/system", createSystem)
routerAPI.get("/system", getSystem)
routerAPI.get("/system/:idSystem", getSystemById)
routerAPI.put("/system", putSystem)
routerAPI.delete("/system", deleteSystem)

module.exports = routerAPI; //export default