import styled from "styled-components";

const UserStyle = styled.p`
	display: flex;
	align-items: center;
	gap: 0.5rem;

	ion-con {
		font-size: 2.4rem;
		color: black;
	}
`;
function User() {
	return (
		<UserStyle>
			{/* <button className="btn-active-01">Login</button> */}
			<strong>Welcome, Quest </strong>
			<ion-icon name="person-circle-outline"></ion-icon>
		</UserStyle>
	);
}

export default User;
