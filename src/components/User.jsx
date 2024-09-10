import styles from "./User.module.css";
function User() {
	return (
		<p className={styles.navUser}>
			<strong>Welcome, Quest </strong>
			<ion-icon
				className={styles.userIcon}
				name="person-circle-outline"
			></ion-icon>
		</p>
	);
}

export default User;
