import express from "express";
import { verify } from "jsonwebtoken";
import { Login, Logout, Register } from "../controllers/Auth.js";
import { getUsers } from "../controllers/User.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();
 
router.post('/api/register', Register);
router.post('/api/login', Login);
router.delete('/api/logout', Logout);
router.get('/api/token', refreshToken);

router.get('/api/users', verifyToken, getUsers);
 
export default router;