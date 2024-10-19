import axios from "axios";
import {login} from "../context/userSlice";
import conf_env from "../conf_env/conf_env";
// import authUserData from "../context/userSlice";

const refreshToken = async (dispatch) => {
    try {
        const response = await axios.post(`${conf_env.backendURL}/user/refresh-token`, {}, { withCredentials: true });
        const { data } = response;
        console.log('Refresh token response:', data);
        
        if (data.message === 'Access token refreshed') {
            const authUserData = JSON.parse(localStorage.getItem('authUserData'));
            dispatch(login(authUserData));
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
    }
};
export default refreshToken;