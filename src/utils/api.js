const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const API_TOKEN = import.meta.env.VITE_APP_API_TOKEN;
const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${API_TOKEN}`,
}
export const fetchDataFromApi = async (url, params) => {
    try {
        const data = await fetch(`${BASE_URL + url}`, {
            method: 'GET',
            headers,
            params
        })
        let json = await data.json();
        return json;
    } catch (error) {
        console.log(error)
        return error;
    }
}