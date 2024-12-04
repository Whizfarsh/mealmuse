import { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../ui/Logo";
import { useGlobal } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

// Styled Components
const LoginWrapper = styled.div`
	display: flex;
	background-color: var(--light-0);
`;

const LogoInfo = styled.div`
	background: linear-gradient(rgba(127, 206, 145, 0.9), rgba(85, 185, 108, 0.9)),
		url("../assets/bg1.jpg");
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	height: 100vh;
	width: 50%;
	display: flex;
	flex-direction: column;
	padding: 1.4rem;
	text-align: center;
	justify-content: center;
	align-items: center;

	p {
		font-size: 1.8rem;
		padding: 0.4rem 9.4rem;
		line-height: 1.2;
	}
`;

const LoginMain = styled.div`
	width: 25%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 0 auto;

	h4 {
		font-size: 3.2rem;
		margin-bottom: 0.8rem;
	}

	p {
		font-size: 1.8rem;
		margin-bottom: 1rem;
	}

	strong {
		text-align: center;
		margin: 1rem 0;
	}

	a {
		text-decoration: none;
		color: inherit;
	}
`;

const GoogleSignButton = styled.button`
	background: transparent;
	padding: 0.5rem 1rem;
	border-radius: 0.9rem;
	border: 1px solid var(--dark-2);
	cursor: pointer;
`;

const FormLogin = styled.form`
	display: flex;
	flex-direction: column;

	label {
		margin-bottom: 0.4rem;
	}

	input {
		height: 3.2rem;
		margin-bottom: 1.2rem;
		background: transparent;
		padding: 0.5rem 1rem;
		border-radius: 0.9rem;
		border: 1px solid var(--dark-2);

		&:focus {
			outline: none;
		}
	}
`;

const LogOptions = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.6rem;

	a {
		color: inherit;
	}
`;

const RememberOption = styled.div`
	display: flex;
	align-items: center;
	column-gap: 0.7rem;

	label {
		margin: 0;
	}

	input[type="checkbox"] {
		margin: 0;
		width: 1.6rem;
		height: 1.6rem;
	}
`;

const LoginButton = styled.button`
	height: 3.6rem;
	background-color: var(--dark-2);
	color: var(--light-0);
	border: none;
	padding: 0.7rem 1.4rem;
	border-radius: 0.7rem;
	cursor: pointer;
`;

const SignUpText = styled.p`
	text-align: center;
	font-size: 1.3rem;
	margin-top: 0.5rem;

	a {
		color: red;
	}
`;

// Component Function
function Login() {
	document.title = "Login";
	const navigate = useNavigate();
	const { login, isAuthenticated } = useGlobal();

	useEffect(() => {
		if (isAuthenticated === true) navigate("/recipes");
	}, [isAuthenticated, navigate]);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleLogin(e) {
		e.preventDefault();
		if (email && login) login(email, password);
	}

	return (
		<LoginWrapper>
			<LogoInfo>
				<Logo />
				<p>
					Find recipes for every occasion based on nutrients, ingredients,
					diets, countries here for free
				</p>
			</LogoInfo>
			<LoginMain>
				<h4>Login</h4>
				<p>Welcome back! Please login to your account.</p>
				<GoogleSignButton>Sign in with Google</GoogleSignButton>
				<strong>OR</strong>
				<FormLogin onSubmit={handleLogin}>
					<label htmlFor="email">Email</label>
					<input type="email" onChange={(e) => setEmail(e.target.value)} />
					<label htmlFor="password">Password</label>
					<input
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<LogOptions>
						<RememberOption>
							<input type="checkbox" name="Remember me" />
							<label htmlFor="rememberMe">Remember me</label>
						</RememberOption>
						<a href="">Forget password</a>
					</LogOptions>
					<LoginButton type="submit">Login</LoginButton>
				</FormLogin>
				<SignUpText>
					Don&apos;t have an account? <a href="">Sign up</a>
				</SignUpText>
			</LoginMain>
		</LoginWrapper>
	);
}

export default Login;
