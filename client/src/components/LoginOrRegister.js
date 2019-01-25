import React from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Col,
	Form,
	FormGroup,
	Label,
	Input
} from 'reactstrap';
import axios from 'axios';

class LoginOrRegister extends React.Component {
	state = {
		username: '',
		password: ''
	};

	handleChange = ({ target: { name, value } }) => {
		this.setState({ [name]: value });
	};

	onSubmit = async e => {
		e.preventDefault();
	};

	render() {
		const { email, password, departments } = this.state;
		const { signup, modal } = this.props;

		return (
			<div>
				<Modal isOpen={modal}>
					<ModalHeader>{register ? 'Sign Up' : 'Login'}</ModalHeader>
					<ModalBody>
						<Form className="form">
							<Col>
								<FormGroup>
									<Label>username</Label>
									<Input
										type="text"
										name="username"
										placeholder="username"
										value={email}
										onChange={this.handleChange}
									/>
								</FormGroup>
							</Col>
							<Col>
								<FormGroup>
									<Label for="examplePassword">password</Label>
									<Input
										type="password"
										name="password"
										placeholder="********"
										value={password}
										onChange={this.handleChange}
									/>
								</FormGroup>
							</Col>

							<Button type="submit" color="primary" onClick={this.onSubmit}>
								Submit
							</Button>
							<ModalFooter>
								<Button
									type="submit"
									color="info"
									onClick={() => this.props.history.push(`/${register ? 'login' : 'signup'}`)}
								>
									{register ? 'Have An Account? Sign In Here' : 'Need An Account? Register Here'}
								</Button>
								<Button color="danger" onClick={() => this.props.history.push('/')}>
									Cancel
								</Button>
							</ModalFooter>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

export default LoginOrRegister;
