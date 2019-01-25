import React from 'react';
import styled from 'styled-components';

const JokeCard = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 20%;
	border: 1px solid black;
	margin: 1.5%;

	p {
		padding: 2.5%;
	}
`;

const Joke = ({ joke }) => {
	return (
		<JokeCard>
			<p>{joke.joke}</p>
		</JokeCard>
	);
};

export default Joke;
