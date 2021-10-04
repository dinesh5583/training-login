const router=require("express").Router();
const userController=require("../controllers/user")
const protect=require('../middleware/authMiddleware')

router.post('/signup',userController.createUser)

router.post('/login',userController.userLogin)

router.get('/users',userController.getAllUser)
router.get("/user/:id",userController.getUserById)

router.delete("/user/:id",userController.deleteUserById)
router.put("/user/:id",userController.updateUserById)
module.exports=router;