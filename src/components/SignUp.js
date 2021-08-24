import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { checkIsUserLoggedIn } from "./lib/helpers";
import Axios from "./lib/axios/Axios";

export default function SignUp() {
	const history = useHistory();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		const navigate = async () => {
			const authorized = await checkIsUserLoggedIn();

			if (authorized) {
				history.push("/");
			}
		};

		navigate();
	}, []);

	async function handleOnSubmit(e) {
		e.preventDefault();
		try {
			await Axios.post("/users/sign-up", {
				firstName,
				lastName,
				email,
				password,
			});
			history.push("/login");
		} catch (e) {
			console.log(e.message);
		}
	}

	return (
		<div
			class="container"
			style={{
				backgroundColor: "rgba(98, 131, 149, 0.5)",
				height: "85vh",
				boxShadow: "0 4px 18px 2px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
						borderRadius: "0 0 8px 8px",
			}}
		>
			<div class="container" style={{ width: "22%" }}>
				<Form onSubmit={handleOnSubmit} style={{ paddingTop: "11%" }}>
					<Form.Text className="text-dark text-center">
						<h2 style={{textShadow: "3px 3px 8px grey"}}>Sign Up</h2>
					</Form.Text>
					<br />
					<Form.Group className="mb-3" controlId="firstName">
						<Form.Label>First Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="John"
							value={firstName}
							onChange={(e) => {
								setFirstName(e.target.value);
							}}
							pattern="[A-Za-z]*"
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="lastName">
						<Form.Label>Last Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Doe"
							value={lastName}
							onChange={(e) => {
								setLastName(e.target.value);
							}}
							pattern="[A-Za-z]*"
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="email">
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type="email"
							placeholder="johndoe@mail.com"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="8 Character Minimum"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							required
						/>
					</Form.Group>
					<Button variant="primary" type="submit" style={{ width: "100%", marginTop: "7%" }}>
						Register
					</Button>
				</Form>
			</div>
		</div>
	);
}
