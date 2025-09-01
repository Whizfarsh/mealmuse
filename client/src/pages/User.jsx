import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, Outlet, useLocation } from "react-router-dom";

const StyledUser = styled.div`
	margin: 2.4rem 0 0 1rem;
`;

const StyledUserMenu = styled.div`
	display: flex;
	gap: 1rem;
	/* margin: 1rem; */

	button {
		border: none;
		padding: 0.4rem;
		background: none;
		/* transition: all 500ms ease-in; */

		&.active {
			background-color: var(--dark-1);
			padding: 0.7rem 1.4rem;
			color: var(--light-1);
			/* border-bottom: 4px solid var(--dark-2); */
		}
	}
`;

function User() {
	const curURLPath = useLocation().pathname.split("/");
	const curPath = curURLPath[curURLPath.length - 1];

	const [selectMenu, setSelectMenu] = useState(curPath);

	useEffect(() => {
		setSelectMenu(curPath);
	}, [curPath]);

	return (
		<StyledUser>
			<StyledUserMenu>
				<Link to="editprofile">
					<button
						className={selectMenu === "editprofile" ? "active" : ""}
						onClick={() => setSelectMenu("editprofile")}
					>
						Edit profile
					</button>
				</Link>
				<Link to="changepassword">
					<button
						className={selectMenu === "changepassword" ? "active" : ""}
						onClick={() => setSelectMenu("changepassword")}
					>
						Update Password
					</button>
				</Link>
				{/* { selectMenu === "editProfile" && } */}
			</StyledUserMenu>
			<hr />
			<div>
				<Outlet />
			</div>
		</StyledUser>
	);
}

export default User;
