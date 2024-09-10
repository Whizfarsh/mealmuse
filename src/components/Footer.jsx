import styles from "./Footer.module.css";
import Logo from "./Logo";

function Footer() {
	return (
		<div className={styles.footer}>
			<div className={styles.footerItems}>
				<div className={styles.footerCol1}>
					<Logo size="42px" />
					<div className={styles.footerSocials}>
						<ul>
							<li>
								<ion-icon name="logo-facebook"></ion-icon>
							</li>
							<li>
								<ion-icon name="logo-twitter"></ion-icon>
							</li>
							<li>
								<ion-icon name="logo-instagram"></ion-icon>
							</li>
							<li>
								<ion-icon name="logo-youtube"></ion-icon>
							</li>
						</ul>
					</div>
				</div>
				<div className={styles.footerMenu}>
					<div>
						<h6>Resources</h6>
						<ul>
							<li>recipes</li>
							<li>cousines</li>
							<li>diet</li>
						</ul>
					</div>
					<div>
						<h6>Platform</h6>
						<ul>
							<li>About us</li>
							<li>Contact us</li>
							<li>Terms of service</li>
						</ul>
					</div>
				</div>
			</div>
			<p>&copy;Copyright 2024 by devFarsh</p>
		</div>
	);
}

export default Footer;
