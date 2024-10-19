import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { json } from "express";

//steps
// get name input
//validate
// check if user aleady exists email and username
// get the localpath of avatarr and coverImage
//upload to coudinary
//make an User object and add to data-base
const generateAccessTokenandRefreshToken = async (userId) => {
	try {
		const user = await User.findById(userId);
		const accessToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();
		user.refreshToken = refreshToken;
		// prevent the validation check while saving (i.e. password,etc)
		user.save({ validateBeforeSave: false });
		return { accessToken, refreshToken };
	} catch (error) {
		throw new ApiError(500, "Some error in generating access and refresh token: " + error);
	}
};

const registerUser = asyncHandler(async (req, res) => {
	// console.log(req.body);
	const { username, fullname, email, password, gender } = req.body;

	const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
	const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;
	///// check if user already exists
	const existedUser = await User.findOne({
		$or: [{ username }, { email }],
	});
	// console.log("hello");
	if (existedUser) {
		throw new ApiError(409, "User already exists with same email or username");
	}

	///// this User has access to mongoose, so we can communicate with database directly
	const userInstance = await User.create({
		username,
		fullname,
		email,
		password,
		profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
		gender,
	});
	const createdUser = await User.findById(userInstance._id).select("-password "); // select the attributes you dont wanna send

	return res.status(200).json(new ApiResponse(200, createdUser));
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const existedUser = await User.findOne({ email });
    if (!existedUser) {
        throw new ApiError(404, "Email doesn't exist");
    }

    const isPasswordCorrect = await existedUser.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Password is incorrect");
    }

    const { accessToken, refreshToken } = await generateAccessTokenandRefreshToken(existedUser._id);

    const loggedInUser = await User.findById(existedUser._id).select(
        '-refreshToken -password'
    );

    const options = {
        httpOnly: true,
        secure: true,
		sameSite: 'None'
    };

    return res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                'Login successful'
            )
        );
});


const getCurrUser = asyncHandler((req, res) => {
	return res.status(200).json(
		200,
		{
			user: req.user,
		},
		"successfully fetched user details",
	);
});
const logoutUser = asyncHandler(async (req, res) => {
	const currentUser = await User.findById(req.user._id);
	currentUser.refreshToken = undefined;
	await currentUser.save({ validateBeforeSave: false });
	const options = {
		secure: true,
		httpOnly: true,
		sameSite: 'None'
	};

	return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(new ApiResponse(200, {}, "User logged out successfully"));
});

const updateRefreshandAccessToken = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	const incomingRefreshToken = req.cookies["refreshToken"];
	if (incomingRefreshToken !== user.refreshToken) {
		throw new ApiError(401, "Refresh tokens doesn't match");
	}
	//new accessToken and refreshToken is generated
	const { accessToken, refreshToken } = await generateAccessTokenandRefreshToken(user._id);
	const option = {
		//to prevent tampering with cookies at client side
		httpOnly: true,
		secure: true,
		sameSite: 'None'
	};
	res.status(200).cookie("accessToken", accessToken, option).cookie("refreshToken", refreshToken, option).json(
		new ApiResponse(
			200,
			{
				accessToken,
				refreshToken,
			},
			"refreshToken and accessToken refreshed successfully",
		),
	);
});

const changePassword = asyncHandler(async (req, res) => {
	try {
		const { oldPassword, newPassword } = req.body;
		//check if oldPass is correct
		const user = await User.findById(req.user._id);
		const isCorrect = await user.isPasswordCorrect(oldPassword);
		if (!isCorrect) throw new ApiError(401, "Old password do not match");
		// const user = User.findById(req.user._id);
		user.password = newPassword;
		user.save();
	} catch (error) {
		throw new ApiError(400, "Error in changing password: " + error);
	}
	return res.status(200).json(new ApiResponse(200, {}, "password changed successfully"));
});

const getOtherUsers = asyncHandler(async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json(new ApiResponse(200, otherUsers,"successfully fetched other users"));
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Error fetching other users");
    }
});
const checkAuthStatus = asyncHandler(async (req, res) => {
    // If this middleware is reached, it means the token is valid
    const user = await User.findById(req.user._id).select('-password -refreshToken');
    return res.status(200).json(
        new ApiResponse(200, { user }, "User is authenticated")
    );
});

export { registerUser, loginUser, logoutUser, updateRefreshandAccessToken, changePassword, getCurrUser,getOtherUsers,checkAuthStatus };
