import { CustomRequestHandler } from "../../types/common";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export const authMiddleware: CustomRequestHandler = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token
    if (!token) {
        return res.status(401).json({ message: "Authentication token is missing" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next!();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
