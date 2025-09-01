import styled from "styled-components";
import Button from "./Button";

import { useUser } from "../context/UserContext";
import { useState } from "react";

const StyledPasswordChange = styled.div`
	margin: 4rem 14rem;
	border: 1px solid var(--light-2);

	/* form */
	form {
		/* margin-top: 3.6rem; */
		padding: 1.6rem 2.4rem;
		display: flex;
		flex-direction: column;

		.label {
			font-size: 1.2rem;
			font-weight: 600;
			margin-top: 1.4rem;
		}
		input {
			margin: 0.7rem 0;
			height: 3.2rem;
			background-color: #cbead2;
			border: none;
			border-radius: 1rem;

			&:focus {
				outline: none;
				padding-left: 1.4rem;
			}
		}
	}

	@media (max-width: 750px) {
		margin: 4rem 6.8rem;
	}
	@media (max-width: 550px) {
		margin: 4rem 1rem;
	}
	@media (max-width: 450px) {
		margin: 4rem 0.5rem;
	}
`;

function ChangePassword() {
	const [currentPassword, setCurrentPassword] = useState();
	const [newPassword, setNewPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();
	const { statusMessage, updateCurrentPassword } = useUser();

	function handlePasswordChange(e) {
		e.preventDefault();
		updateCurrentPassword(currentPassword, newPassword, confirmPassword);
	}
	return (
		<StyledPasswordChange>
			<form action="">
				<label className="label">Current password</label>
				<input
					type="password"
					autoComplete="password"
					onChange={(e) => setCurrentPassword(e.target.value)}
				/>
				<label className="label">New password</label>
				<input
					type="password"
					autoComplete="new password"
					onChange={(e) => setNewPassword(e.target.value)}
				/>
				<label className="label">Confirm password</label>
				<input
					type="password"
					autoComplete="confirm password"
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>

				<div style={{ marginTop: "1.2rem" }}>
					<Button $variation="mini" onClick={handlePasswordChange}>
						Update password
					</Button>
					<p>{statusMessage !== "" && statusMessage}</p>
				</div>
			</form>
		</StyledPasswordChange>
	);
}

export default ChangePassword;
