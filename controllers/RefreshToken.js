import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";
 
export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        
        if(!refreshToken) return res.sendStatus(401);
        const user = await Users.findOne({ where: { refresh_token: refreshToken } });
        let token = jwt.sign({ id: user.id, email: user.email, username: user.username }, process.env.PASSWORD_SECRET, { expiresIn: '1d' });
        await Users.update({refresh_token: token},{
            where:{
                id: user.id
            }
          });
        res.json({ token });
    } catch (error) {
        console.log(error);
    }
}