import styles from "./User.module.css";
function User() {
	return (
		<p className={styles.navUser}>
			{/* <button className="btn-active-01">Login</button> */}
			<strong>Welcome, Quest </strong>
			<ion-icon
				className={styles.userIcon}
				name="person-circle-outline"
			></ion-icon>
		</p>
	);
}

export default User;
