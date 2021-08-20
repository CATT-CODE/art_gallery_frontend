import React from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function SignUp() {
	return (
		<div class="container" style={{backgroundColor: "rgba(98, 131, 149, 0.5)", height: "77vh", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
		<div class="container" style={{width: "22%", }}>
			<Form style={{paddingTop: "11%"}}>
			<Form.Text className="text-dark text-center" >
      <h2 >Sign Up</h2>
				</Form.Text>
				<br/>
  <Form.Group className="mb-3" controlId="firstName">
    <Form.Label>First Name</Form.Label>
    <Form.Control type="text" placeholder="First Name" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="lastName">
    <Form.Label>Last Name</Form.Label>
    <Form.Control type="text" placeholder="Last Name" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="email">
    <Form.Label>Email Address</Form.Label>
    <Form.Control type="email" placeholder="Email Address" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="password">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Button variant="primary" type="submit" style={{width: "100%"}}>
    Register
  </Button>
</Form>
			</div>
			</div>
	)
}
