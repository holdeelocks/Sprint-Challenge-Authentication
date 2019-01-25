import React from 'react';
import Joke from './Joke';

const JokesList = ({ jokes }) => {
	return (
		<div>
			{jokes.map(joke => (
				<Joke key={joke.id} joke={joke} />
			))}
		</div>
	);
};

export default JokesList;
