import React, {
	useState,
	useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { LOGIN } from "../redux-state/actions";

export default function SignIn() {
	const history = useHistory();
	const dispatch = useDispatch();
	const form = useSelector((state) => state);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		const navigate = async () => {
			if (form.user !== null) {
				history.push("/");
				console.log(history);
			}
		};

		navigate();
	}, []);

	function handleLoginSubmit(event) {
		event.preventDefault();
			dispatch({
				type: LOGIN,
				password: password,
				email: email,
			});
			history.push("/");

	}

	return (
		<div
			class="container"
			style={{
				backgroundColor: "rgba(74, 113, 106, 0.4)",
				height: "77vh",
				boxShadow:
					"0 4px 18px 2px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
				borderRadius: "0 0 8px 8px",
			}}
		>
			<div class="container" style={{ width: "22%", height: "100%" }}>
				<Form style={{ paddingTop: "11%" }} onSubmit={handleLoginSubmit}>
					<Form.Text className="text-dark text-center">
						<h2 style={{ textShadow: "3px 3px 6px grey" }}>Login</h2>
					</Form.Text>
					<br />
					<Form.Group className="mb-3" controlId="email">
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							type="email"
							value={email}
							placeholder="johndoe@mail.com"
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							value={password}
							type="password"
							placeholder="Enter Password"
						/>
					</Form.Group>
					<Button
						variant="primary"
						type="submit"
						style={{ width: "100%", marginTop: "7%" }}
					>
						Login
					</Button>
				</Form>
			</div>
		</div>
	);
}
