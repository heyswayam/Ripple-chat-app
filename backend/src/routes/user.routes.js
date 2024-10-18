import { Router } from 'express';
import { registerUser, loginUser, logoutUser, updateRefreshandAccessToken,changePassword } from '../controllers/user.controller.js';
import { verifyJWTToken } from '../middleware/auth.middleware.js';

const UserRoute = Router();

//this multer middleware just add another object (i.e. here 'files' check documentation) to the req object
UserRoute.route('/register').post(
    registerUser
);

UserRoute.route('/login').post(loginUser)
//middleware ko reference do, execute mat kro (vid:16, 55:10)
UserRoute.route('/logout').post(verifyJWTToken,logoutUser)

UserRoute.route('/refresh-token').post(verifyJWTToken,updateRefreshandAccessToken);

UserRoute.route('/change-password').post(verifyJWTToken,changePassword);

export {UserRoute};