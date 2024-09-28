// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../components/Logo";
import { useGlobal } from "../content/GlobalContent";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
function Login() {
	const navigate = useNavigate();
	const { login, isAuthenticated } = useGlobal();

	useEffect(
		function () {
			if (isAuthenticated === true) navigate("/recipes");
		},
		[isAuthenticated, navigate]
	);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleLogin(e) {
		e.preventDefault();
		if (email && login) login(email, password);
	}
	return (
		<div className={styles.login}>
			<div className={styles.logoInfo}>
				<Logo />
				<p>
					Find recipes for every occassion based on nutrients, ingredients,
					diets, countries here for free
				</p>
			</div>
			<div className={styles.loginMain}>
				<h4>Login</h4>
				<p>Welcome back! Please login to your account.</p>
				<button className={styles.googleSign}>Sign in with Google</button>
				<strong>OR</strong>
				<form className={styles.formLogin} onSubmit={handleLogin}>
					<label htmlFor="email">Email</label>
					<input type="email" onChange={(e) => setEmail(e.target.value)} />
					<label htmlFor="password">Password</label>
					<input
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<div className={styles.logOptions}>
						<div className={styles.remember}>
							<input type="checkbox" name="Remember me" />
							<label htmlFor="rememberMe">Remeber me</label>
						</div>
						<a href="">Forget password</a>
					</div>
					<button
						className={styles.btnLogin}
						type="button"
						onClick={handleLogin}
					>
						Login
					</button>
				</form>
				<p
					style={{
						textAlign: "center",
						fontSize: "1.3rem",
						marginTop: ".5rem",
					}}
				>
					Don&apos;t have an account ?{" "}
					<a href="" style={{ color: "red" }}>
						Sign up
					</a>
				</p>
			</div>
		</div>
	);
}

export default Login;
