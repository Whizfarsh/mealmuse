/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo({ size = "24px", logoAlign = "center" }) {
	return (
		<h2
			style={{ fontSize: size, textAlign: logoAlign }}
			className={styles.logo}
		>
			<Link to="/">MealMuse</Link>
		</h2>
	);
}

export default Logo;
