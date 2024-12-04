import styled from "styled-components";

const NewsLetterWrapper = styled.div`
	width: 100%;
	margin: 0 auto;
	text-align: center;
`;

const NewsLetterHeading = styled.h5`
	font-size: 2.8rem;
`;

const NewsForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	row-gap: 1rem;
	margin-top: 0.8rem;
`;

const Input = styled.input`
	width: 30%;
	height: 3.4rem;
	border: 1px solid var(--light-2);
	border-radius: 1rem;
	padding: 0.5rem 1.2rem;
	background-color: var(--light-0);

	&:focus,
	&:active {
		outline: none;
	}
`;

const Button = styled.button`
	width: 15rem;
	border: none;
	padding: 1rem;
	border-radius: 1rem;
	color: var(--light-0);
	background-color: var(--dark-2);
	cursor: pointer;
`;

function Newsletter() {
	return (
		<NewsLetterWrapper>
			<NewsLetterHeading>Subscribe to our Newsletter</NewsLetterHeading>
			<p>
				By subscribing to our newsletter, you will be among those that will get
				our hot recipes first 😝
			</p>
			<NewsForm>
				<Input type="email" placeholder="you@you.com" />
				<Button>Subscribe</Button>
			</NewsForm>
		</NewsLetterWrapper>
	);
}

export default Newsletter;
