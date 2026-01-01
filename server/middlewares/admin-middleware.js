const User = require("../models/user-model");

const adminMiddleware = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const userEmail = req.user.email;
        const user = await User.findOne({ email: userEmail });

        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: "Access denied. Admin privileges required." });
        }

        next();
    } catch (error) {
        console.error("Admin middleware error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = adminMiddleware;