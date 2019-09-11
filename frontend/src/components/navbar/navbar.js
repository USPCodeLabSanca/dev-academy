import React from "react";
import "./navbar.css";
import Logo from "./logo.png";
import { Link } from "react-router-dom";
import { UserContext } from "../../shared/contexts";

export function Navbar({history}){
	const user = React.useContext(UserContext);
	function signout(){
		user.update(null, null);
	}
	return(
		<UserContext.Consumer>{()=>(
			<header>
				<nav className="flex py-2 px-5 justify-between shadow items-center">
					<div className="flex items-center">
						<img
							src={Logo}
							alt="Logo do codelab"
							className="w-8 h-8"
						/>
						<h1 className="font-bold text-xl">Dev.academy()</h1>
					</div>
					<ul className="flex items-center">
						<li>
							<Link
								to="/home"
								className={history.location.pathname === "/home"? "selected" : "unselected"}
							>
								Home
							</Link>
						</li>
						{user.email && <li>
							<Link
								to="/manage"
								className={history.location.pathname === "/manage"? "selected" : "unselected"}
							>
								Gerenciar
							</Link>
						</li>}
						{user.email && <li onClick={signout}>
							<Link to="/login" className="unselected">
								Sair
							</Link>
						</li>}
						{(!user.email) && <li>
							<Link to="/login"
								className={history.location.pathname === "/login"? "selected" : "unselected"}
							>
								Entrar
							</Link>
						</li>}
						{!user.email && <li>
							<Link
								to="/signup"
								className={history.location.pathname === "/signup"? "selected" : "unselected"}
							>
								Cadastrar
							</Link>
						</li>}
					</ul>
				</nav>
			</header>
		)}</UserContext.Consumer>
	);
}