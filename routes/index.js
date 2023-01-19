import express from "express";
import { verify } from "jsonwebtoken";
import { Login, Logout, Register } from "../controllers/Auth.js";
import { getUsers, addUsers, getUserById, updateUsers, deleteUsers } from "../controllers/User.js";
import { getInstitutions, addInstitutions } from "../controllers/Institution.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();
 
router.post('/api/register', Register);
router.post('/api/login', Login);
router.delete('/api/logout', Logout);
router.get('/api/token', refreshToken);

//users
router.get('/api/users', verifyToken, getUsers);
router.post('/api/users', verifyToken, addUsers);
router.put('/api/users/:id', verifyToken, updateUsers);
router.get('/api/users/:id', getUserById);
router.delete('/api/users/:id', verifyToken, deleteUsers);

//institutions
router.get('/api/institutions', verifyToken, getInstitutions);
router.post('/api/institutions', verifyToken, addInstitutions);
export default router;