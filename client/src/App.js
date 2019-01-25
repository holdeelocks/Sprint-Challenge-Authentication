import React, { Component } from 'react';
import './App.css';
import LoginOrRegister from './components/LoginOrRegister';
import JokesList from './components/JokesList';
import { Route, NavLink } from 'react-router-dom';

class App extends Component {
	state = {
		jokes: []
	};
	componentDidMount() {}

	render() {
		return (
			<div className="App">
				<nav>
					<NavLink to="/">Home</NavLink>
					<NavLink to="/jokes">Jokes</NavLink>
				</nav>
				<Route exact path="/signup" render={props => <LoginOrRegister {...props} register />} />
				<Route exact path="/login" render={props => <LoginOrRegister {...props} />} />
				<Route exact path="/jokes" render={props => <JokesList {...props} jokes={jokes} />} />
			</div>
		);
	}
}

export default App;
