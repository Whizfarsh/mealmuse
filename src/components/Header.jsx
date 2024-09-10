import HeaderNav from "./HeaderNav";
import Logo from "./Logo";
import styles from "./Header.module.css";
// import User from "./User";
import HeaderContent from "./HeaderMain";

function Header() {
	return (
		<div className={styles.heroContent}>
			<header className={styles.header}>
				<Logo />
				<HeaderNav />
				{/* <User /> */}
			</header>
			<HeaderContent />
		</div>
	);
}

export default Header;
