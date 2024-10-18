import { Router } from 'express';
import { registerUser, loginUser, logoutUser, updateRefreshandAccessToken,changePassword, getOtherUsers } from '../controllers/user.controller.js';
import { verifyJWTToken } from '../middleware/auth.middleware.js';
import { User } from '../models/user.model.js';

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
UserRoute.route('/other-users').get(verifyJWTToken, getOtherUsers);
export {UserRoute};
