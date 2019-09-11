import React from "react";

export const UserContext = React.createContext({
	email: null,
	token: null,
	update: (user, token)=>{
		this.user = user;
		this.token = token;
	}
});