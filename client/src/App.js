import React, { Component } from 'react';
import LoginOrRegister from './components/LoginOrRegister';
import JokesList from './components/JokesList';
import { Route, NavLink, Link, withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import axios from 'axios';

import './App.css';

const NavBar = styled.nav`
	width: 40%;
	margin: 1.5% auto;
	display: flex;
	justify-content: space-around;
`;

const StyledLink = styled(NavLink)`
	color: black;
	border: 1px solid grey;
	padding: 1% 5%;
	text-decoration: none;
	border-radius: 10px;

	&:hover {
		color: white;
		background-color: black;
		text-decoration: none;
	}
`;

class App extends Component {
	state = {
		jokes: []
	};

	componentDidMount() {
		const token = localStorage.getItem('jwtToken');
		if (token) {
			this.getJokes();
		}
	}

	getJokes = async () => {
		try {
			const accessToken = localStorage.getItem('jwtToken');
			const config = { headers: { Authorization: accessToken } };
			const jokes = await axios.get('/api/jokes', config);

			this.setState({ jokes: jokes.data });
		} catch (err) {
			console.log(err);
		}
	};

	logout = () => {
		localStorage.removeItem('jwtToken');
	};

	render() {
		const { jokes } = this.state;
		return (
			<div className="App">
				<h1>Welcome to the Super Cool Jokes App</h1>
				<NavBar>
					<StyledLink to="/">Home</StyledLink>
					{jokes.length !== 0 && <StyledLink to="/jokes">Jokes</StyledLink>}
				</NavBar>

				{jokes.length !== 0 ? (
					<Button onClick={this.logout} color="warning">
						Logout
					</Button>
				) : (
					<Link to="/login">
						<Button color="secondary">Login/Register</Button>
					</Link>
				)}

				<Route
					exact
					path="/signup"
					render={props => <LoginOrRegister {...props} getJokes={this.getJokes} register modal />}
				/>
				<Route
					exact
					path="/login"
					render={props => <LoginOrRegister {...props} getJokes={this.getJokes} modal />}
				/>
				<Route
					exact
					path="/jokes"
					render={props => <JokesList {...props} jokes={jokes ? jokes : null} />}
				/>
			</div>
		);
	}
}

export default withRouter(App);
