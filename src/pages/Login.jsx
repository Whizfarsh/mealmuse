// import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import styles from "./Login.module.css";
function Login() {
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
				<form className={styles.formLogin} action="">
					<label htmlFor="email">Email</label>
					<input type="email" name="" id="" />
					<label htmlFor="password">Password</label>
					<input type="password" name="" id="" />
					<div className={styles.logOptions}>
						<div className={styles.remember}>
							<input type="checkbox" name="Remember me" />
							<label htmlFor="rememberMe">Remeber me</label>
						</div>
						<a href="">Forget password</a>
					</div>
					<button className={styles.btnLogin} type="button">
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
