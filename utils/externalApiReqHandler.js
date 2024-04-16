import axios from "axios";

export const externalApiReqHandler = async ({ method, params, payload = {}, url = "" }) => {
    url = process.env.GO_HIGH_LEVEL_URL + url + '?' + new URLSearchParams(params).toString();
    
    try {
        const response = await axios({
            method,
            url,
            data: payload,
            headers: {
                'Authorization': `Bearer ${process.env.GO_HIGH_LEVEL_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};


