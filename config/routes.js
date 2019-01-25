const axios = require('axios');
const bcrypt = require('bcryptjs');
const knex = require('knex');
const knexConfig = require('../knexfile');

const { authenticate, generateToken } = require('../auth/authenticate');

module.exports = server => {
	server.post('/api/register', register);
	server.post('/api/login', login);
	server.get('/api/jokes', authenticate, getJokes);
};

const db = knex(knexConfig.development);

async function register(req, res) {
	const creds = req.body;
	try {
		creds.password = bcrypt.hashSync(creds.password, 14);
		const ids = await db('users').insert(creds);
		const user = await db('users')
			.where({ username: creds.username })
			.first();

		res.status(201).json({ user, token: generateToken(user) });
	} catch (err) {
		res.status(500).json(err);
	}
	// implement user registration
}

async function login(req, res) {
	const creds = req.body;
	try {
		const user = await db('users')
			.where({ username: creds.username })
			.first();
		if (user && bcrypt.compareSync(creds.password, user.password)) {
			res.status(200).json({ user, token: generateToken(user) });
		} else {
			res.status(400).json({ error: 'make sure password and username are correct' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
	// implement user login
}

function getJokes(req, res) {
	const requestOptions = {
		headers: { accept: 'application/json' }
	};

	axios
		.get('https://icanhazdadjoke.com/search', requestOptions)
		.then(response => {
			res.status(200).json(response.data.results);
		})
		.catch(err => {
			res.status(500).json({ message: 'Error Fetching Jokes', error: err });
		});
}
