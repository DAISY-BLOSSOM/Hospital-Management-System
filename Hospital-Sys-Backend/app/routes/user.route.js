const router = require("express").Router()
const user = require("../controllers/user.controller")
const upload = require("../middleware/upload.middleware")
const {auth, authAdmin} = require("../middleware/auth.middleware")
//user
router.post("/register", user.register)
router.post("/login", user.login)
router.post("/activateAcc", user.activate)
router.post("/changePassword", user.changePassword)
router.post("/sendOtp", user.sendOtp)
//admin
router.get("/all", authAdmin, user.allUsers)
router.get("/all/:id", authAdmin, user.singleDetails)
//authenticated user
router.get("/me", auth, user.me)
router.post("/logout", auth, user.logout)
router.post("/logoutAll", auth, user.logoutAll)
router.post("/editPassword", auth, user.editPassword)
router.post("/deactivate", auth, user.deactivate)
router.post("/delAccount", auth, user.delAccount)
router.patch("/edit", auth, user.edit)
router.post('/changeImage',auth, upload.single('img'), user.changeImage)

module.exports=router