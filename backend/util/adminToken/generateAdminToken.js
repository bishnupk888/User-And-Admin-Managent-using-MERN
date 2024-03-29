import jwt from 'jsonwebtoken'


const generateAdminToken = (res,userId) =>{
    const jwtToken = jwt.sign({userId},process.env.JWT_SECRET_KEY_ADMIN,{expiresIn : '30d'});
    const cookieOptions = {
        httpOnly : true,
        secure : process.env.NODE_ENV !== 'development',
        sameSite : 'strict',
        maxAge : 30 * 24 * 60 * 60
    }

    res.cookie('adminJwt',jwtToken,cookieOptions)
}


export default generateAdminToken