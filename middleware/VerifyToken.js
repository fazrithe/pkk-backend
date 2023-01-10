import jwt from "jsonwebtoken";
 
export const verifyToken = (req, res, next) => {
    try {
        if (! req.headers.authorization) {
            throw new Error('Token missing from header');
        }

        const token = req.headers.authorization.split('Bearer')[1].trim();

        const decoded = jwt.verify(token, process.env.PASSWORD_SECRET);
        console.log('decoded', decoded);

        req.user = decoded;

        return next();
    } catch (error) {
        console.log('Error', error);

        response.message = error.message;
        response.status = 401;
    }

    return res.status(response.status).send(response);
}