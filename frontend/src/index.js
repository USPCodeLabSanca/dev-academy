import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import jwt from "jsonwebtoken";

import { setToken } from "./shared/api";

// pages imports
import { Login } from "./pages/login/login";
import { Home } from "./pages/home/home";
import { Signup } from "./pages/signup/signup";
import { Manage } from "./pages/manage/manage";

// components imports
import { Navbar } from "./components/navbar/navbar";

// context imports
import { UserContext } from "./shared/contexts";

import "./style.css";

let storageUser = localStorage.getItem("user");
if(storageUser){
	storageUser = JSON.parse(storageUser);
	const payload = jwt.decode(storageUser.token);
	if(payload && payload.exp > Date.now()){
		console.log("expired");
		storageUser.token = null;
		storageUser.email = null;
		localStorage.removeItem("user");
		window.history.pushState({}, "", "/login");
	}
}
else storageUser = {email: null, token: null};
setToken(storageUser.token);

function App(){

	const [user, setUser] = React.useState({
		email: storageUser.email,
		token: storageUser.token,
		update(email, token){
			setToken(token);
			if(email === null && token === null)
				localStorage.removeItem("user");
			localStorage.setItem("user", JSON.stringify({email, token}));
			setUser({email, token, update: this.update});
		},
	});

	return (
		<>
			<UserContext.Provider value={user}>
				<BrowserRouter>
					<Route path="/" component={Navbar}/>
					<Switch>
						<Route path="/login" component={Login} exact/>
						<Route path="/home" component={Home} exact/>
						<Route path="/signup" component={Signup} exact/>
						<Route path="/manage" component={Manage} exact/>
						{user.email && <Redirect to="/home"/>}
						{!user.email && <Redirect to="/login"/>}
					</Switch>
				</BrowserRouter>
			</UserContext.Provider>
		</>
	);
}

ReactDOM.render(<App/>, document.getElementById("root"));