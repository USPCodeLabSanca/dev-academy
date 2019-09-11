import Axios from "axios";

// export const backendURL = 'http://localhost:3000'; //TEST URL
export const backendURL = 'https://us-central1-dev-academy-13a77.cloudfunctions.net/backend';

let token = null;

export function setToken(refresh){
	token = refresh;
}

export const api = Axios.create({
	baseURL: backendURL,
	headers: {
		"Content-Type": "application/json"
	},
});

api.interceptors.request.use((config)=>{
	if(token)
		config.headers.common["Authorization"] = token;
	return config;
});

api.interceptors.response.use((config)=>{
	const refresh = config.headers["refresh-token"];
	if(refresh)
		token = refresh;
	return config;
});