import React from "react";
import "./login.css";
import { UserContext } from "../../shared/contexts";

import { api } from "../../shared/api";

export function Login({history}){
	const emailRef = React.useRef();
	const passwordRef = React.useRef();

	const user = React.useContext(UserContext);

	async function submitForm(event){
		event.preventDefault();
		const email = emailRef.current.value.trim().toLowerCase();
		const password = passwordRef.current.value.trim();
		let response;
		try{
			response = await api.post("/users/login", {email, password});
		} catch(e) {
			if(e.response) return alert("Invalid email/password");
			else return alert("Network error");
		}

		const token = response.data.token;
		user.update(email, token);
		history.push("/home");
	}

	return (
		<UserContext.Consumer>{()=>(
			<main className="login h-full flex justify-center items-center">
				<div className="login-container rounded-lg flex flex-col content-center p-10 w-1/2">
					<h2 className="heading">Entrar</h2>
					<form onSubmit={submitForm} className="flex flex-col">
						<div className="flex flex-col my-6">
							<label htmlFor="email">E-mail</label>
							<input
								name="email"
								ref={emailRef}
								required
								className="border-2 p-2 rounded-lg"
								type="email"
							/>
						</div>
						<div className="flex flex-col my-6">
							<label htmlFor="password">Senha</label>
							<input
								name="password"
								ref={passwordRef}
								pattern=".{6,99999999}"
								onChange={()=>{
									if(passwordRef.current.value.length < 6)
										passwordRef.current.setCustomValidity("Passwords must be at least 6 characters long");
									else
										passwordRef.current.setCustomValidity("");
								}}
								required
								className="border-2 p-2 rounded-lg"
								type="password"
							/>
						</div>
						<button type="submit" className="self-center px-6 py-2 mt-4 rounded text-xs h-8 font-bold">ENVIAR</button>
					</form>
				</div>
			</main>
		)}</UserContext.Consumer>
	);
}