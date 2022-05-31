import { useState, useEffect } from "react";
import { auth } from "../lib/firebase";
import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";

export default function Login(props) {
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		const unSub = onAuthStateChanged(auth, (user) => {
			user && props.history.push("/");
		});
		return () => unSub();
	}, [props.history]);

	return (
		<div>
			<h1>{isLogin ? "Login" : "Register"}</h1>
			<br />
			<div>
				<small>email</small>
				<input value={email} onChange={(e) => setEmail(e.target.value)} />
			</div>
			<br />
			<div>
				<small>password</small>
				<input value={password} onChange={(e) => setPassword(e.target.value)} />
			</div>
			<br />
			<div>
				<button
					onClick={
						isLogin
							? async () => {
									try {
										await signInWithEmailAndPassword(auth, email.password);
										props.history.push("/");
									} catch (error) {
										alert(error.message);
										props.history.push("/");
									}
							  }
							: async () => {
									try {
										await createUserWithEmailAndPassword(auth, email.password);
										props.history.push("/");
									} catch (error) {
										alert(error.message);
										props.history.push("/");
									}
							  }
					}>
					{isLogin ? "Login" : "Register"}
				</button>
				<br />
				<p onClick={() => setIsLogin(!isLogin)}>
					{isLogin ? "Create new account ?" : "Back to login"}
				</p>
			</div>
		</div>
	);
}
