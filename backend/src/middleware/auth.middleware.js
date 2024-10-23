import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWTToken = asyncHandler(async (req, res, next) => {
	try {
		const accessToken = req.cookies?.accessToken;
		const refreshToken = req.cookies?.refreshToken;

		if (!accessToken && !refreshToken) {
			throw new ApiError(401, "No tokens provided");
		}

		let accessData;
		try {
			accessData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
		} catch (error) {
			if (error.name === "TokenExpiredError") {
				accessData = null;
			} else {
				throw new ApiError(401, "Invalid access token", error);
			}
		}

		if (!accessData) {
			// Access token has expired, checking refresh token validity
			let refreshData;
			try {
				refreshData = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
			} catch (error) {
				if (error.name === "TokenExpiredError") {
					throw new ApiError(401, "Both access token and refresh token have expired", error);
				} else {
					throw new ApiError(401, "Invalid refresh token", error);
				}
			}

			const user = await User.findById(refreshData._id).select("-password -refreshToken");
			if (!user) {
				throw new ApiError(401, "User not found");
			}

			const newAccessToken = user.generateAccessToken();
			const newRefreshToken = user.generateRefreshToken();
			user.refreshToken = newRefreshToken;
			await user.save({ validateBeforeSave: false });

			const options = {
				httpOnly: true,
				secure: true,
				sameSite: "None",
			};
			console.log("used 2nd ifelse");

			res.cookie("accessToken", newAccessToken, options);
			res.cookie("refreshToken", newRefreshToken, options);
			req.user = user;
		} else {
			// Access token is valid
			const user = await User.findById(accessData._id).select("-password -refreshToken");
			if (!user) {
				throw new ApiError(401, "User not found");
			}
			req.user = user;
		}

		next();
	} catch (error) {
		next(error);
	}
});

export { verifyJWTToken };