import styles from "./Newletter.module.css";

function Newletter() {
	return (
		<div className={styles.newsLetter}>
			<h5>Subscribe to our Newsletter</h5>
			<p>
				By subscribing to our newsletter, you will be among those that will get
				our hot recipes first 😝
			</p>
			<form className={styles.newsForm} action="">
				<input type="email" placeholder="you@you.com" />
				<button>Subscribe</button>
			</form>
		</div>
	);
}

export default Newletter;
