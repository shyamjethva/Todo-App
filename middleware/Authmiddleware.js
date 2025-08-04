const jwt = require('jsonwebtoken');
const UserModel = require("../models/UserModel");

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) reject(err);
            else resolve(decoded);
        });
    });
};

module.exports = async (req, res, next) => {
    try {
        const authheader = req.headers["authorization"];
        console.log("authorization header", authheader);

        if (!authheader || !authheader.startsWith("Bearer ")) {
            console.log("Missing Bad Header");
            return res.status(401).send({
                success: false,
                message: "No Token Provided"
            });
        }
        const token = authheader.split(" ")[1];

        const decoded = await verifyToken(token);
        if (!decoded || !decoded.id) {
            return res.status(401).send({
                success: false,
                message: "Invalid token payload",
            });
        }
        console.log("Decoded Token", decoded);
        req.user = { id: decoded.id };

        const userid = await UserModel.findById(decoded.id);
        if (!userid) {
            return res.status(401).json({ message: "User not found" });
        }

        next();
    } catch (error) {
        console.log(error);
        console.error("JWT verification failed:", error.message);
        res.status(401).send({
            success: false,
            message: "Unauthorized User",
            error: error.message,
        });
    }
};
