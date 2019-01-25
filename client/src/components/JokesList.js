import React from 'react';
import Joke from './Joke';
import styled from 'styled-components';

const JokesContainer = styled.div`
	width: 80%;
	margin: 0 auto;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
`;

const JokesList = ({ jokes }) => {
	return (
		<JokesContainer>
			{jokes.map(joke => (
				<Joke key={joke.id} joke={joke} />
			))}
		</JokesContainer>
	);
};

export default JokesList;
