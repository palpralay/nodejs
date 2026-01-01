const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware"); 
const adminMiddleware = require("../middlewares/admin-middleware"); 

router.use(authMiddleware, adminMiddleware); // Protect all admin routes

router.get('/users', adminController.getAllUsers);
router.route("/contacts").get(adminController.getAllcontact);

module.exports = router;