import styled from "styled-components";
import Logo from "./Logo";

// Styled Components
const FooterWrapper = styled.div`
	margin-top: 4.2rem;
	padding: 2.4rem 4.2rem;
	background-color: var(--dark-2);

	@media (max-width: 600px) {
		padding: 1.3rem 2.4rem;
	}

	p {
		margin-top: 1.4rem;
		color: var(--light-3);

		@media (max-width: 500px) {
			text-align: center;
		}
	}
`;

const FooterItems = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media (max-width: 500px) {
		flex-direction: column;
	}
`;

const FooterCol1 = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const FooterSocials = styled.div`
	ul {
		display: flex;
		column-gap: 1.2rem;

		ion-icon {
			color: #fff;
		}
	}
`;

const FooterMenu = styled.div`
	display: flex;
	justify-content: space-evenly;
	gap: 4.4rem;
	color: var(--light-1);

	@media (max-width: 600px) {
		gap: 2.4rem;
	}

	h6 {
		font-size: 1.6rem;
	}

	ul {
		margin-top: 1.2rem;

		li {
			margin-bottom: 0.5rem;
			text-transform: capitalize;
		}
	}
`;

// Footer Component
function Footer() {
	return (
		<FooterWrapper>
			<FooterItems>
				<FooterCol1>
					<Logo size="42px" />
					<FooterSocials>
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
					</FooterSocials>
				</FooterCol1>
				<FooterMenu>
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
				</FooterMenu>
			</FooterItems>
			<p>&copy;Copyright 2024 by devFarsh</p>
		</FooterWrapper>
	);
}

export default Footer;
