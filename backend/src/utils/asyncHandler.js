// const asyncHandler = (requestHandler) => {
//     return (req, res, next) => {
//         Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
//     }
// }

import { ApiError } from "./ApiError.js";
import { ApiResponse } from "./ApiResponse.js";

const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (err) {
        if (err instanceof ApiError) {
            res.status(err.statuscode).json(
                new ApiResponse(err.statuscode, null, err.message)
            );
        } else {
            const statusCode = 500;
            console.error(err); // Log the full error for debugging
            res.status(statusCode).json(
                new ApiResponse(statusCode, null, "Something went wrong: "+err)
            );
        }
    }
};

export { asyncHandler };

// export { asyncHandler }
