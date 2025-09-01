import styled from "styled-components";
import Button from "./Button";
import { FaUpload } from "react-icons/fa6";
import { useRef, useState } from "react";
import { useUser } from "../context/UserContext";

const StyledEditProfile = styled.div`
	margin: 4rem 14rem;
	border: 1px solid var(--light-2);

	.profileHead {
		display: flex;
		justify-content: space-between;
		padding: 2.4rem;
	}

	.hText {
		font-size: 1.8rem;
		font-weight: 600;
	}

	.hText-2 {
		font-size: 1.4rem;
		font-weight: 500;
	}

	span {
		font-size: 1.2rem;
		color: #616161;
	}

	.imageBox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.4rem 0 0 1.4rem;

		.img {
			display: flex;
			align-items: center;
		}
	}

	.userImg {
		border-radius: 50%;
		width: 5rem;
		height: 5rem;
	}

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
			padding-left: 1.4rem;

			&:focus {
				outline: none;
			}
		}
	}

	.updated {
		display: flex;
		align-items: center;
		gap: 1.2rem;
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

function EditProfile() {
	const [newName, setNewName] = useState("");
	const [newEmail, setNewEmail] = useState("");
	const { updateUser, statusMessage, user } = useUser();
	const fileUploadRef = useRef(null);

	const { name } = user || {};

	function handleFileUpload() {
		fileUploadRef.current.click();
	}

	function handleUpdateUSer() {
		if (newName || newEmail) {
			updateUser(newName, newEmail);
		}
	}
	return (
		<StyledEditProfile>
			<div className="profileHead">
				<div>
					<p className="hText">Profile</p>
					<span>Settings for your profile</span>
				</div>

				<Button style={{ margin: "0 0 1.4rem 1.4rem" }} $variation="danger">
					Delete user
				</Button>
			</div>
			<hr />
			<div>
				<div className="imageBox">
					<div className="img">
						<img
							className="userImg"
							src="https://randomuser.me/api/portraits/men/91.jpg"
							alt="User-image"
						/>
						<div style={{ display: "flex", flexDirection: "column" }}>
							<p className="hText-2">{name}</p>
							<span>Profile picture</span>
						</div>
					</div>
					<input
						type="file"
						ref={fileUploadRef}
						style={{ display: "none" }}
						aria-label="Upload photo"
					/>

					<Button
						onClick={handleFileUpload}
						style={{ margin: "0 2rem 1.4rem 2.4rem" }}
						$variation="mini"
					>
						<FaUpload />
						Upload
					</Button>
				</div>
				{/* ---------------- */}
				<form action="">
					<label className="label">Full Name</label>
					<input
						type="text"
						name=""
						id=""
						onChange={(e) => setNewName(e.target.value)}
					/>
					<label className="label">Email Address</label>
					<input
						type="email"
						name=""
						id=""
						onChange={(e) => setNewEmail(e.target.value)}
					/>
				</form>
				<div className="updated" style={{ margin: "0 0 1.4rem 2.4rem" }}>
					<Button $variation="mini" onClick={handleUpdateUSer}>
						{/* () => updateUser(newName, newEmail) */}
						Save changes
					</Button>
					<p>{statusMessage !== "" && statusMessage}</p>
				</div>
			</div>
		</StyledEditProfile>
	);
}

export default EditProfile;
