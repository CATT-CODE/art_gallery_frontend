import React from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function SignIn() {
	return (
		<div class="container" style={{backgroundColor: "rgba(98, 131, 149, 0.7)", height: "77vh", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
		<div class="container" style={{width: "22%", height: "100%"}}>
			<Form style={{paddingTop: "11%",}}>
			<Form.Text className="text-dark text-center" >
      <h2 >Login</h2>
				</Form.Text>
				<br/>
  <Form.Group className="mb-3" controlId="email">
    <Form.Label>Email Address</Form.Label>
    <Form.Control type="email" placeholder="Enter Email" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="password">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Button variant="primary" type="submit" style={{width: "100%"}}>
    Login
  </Button>
</Form>
			</div>
			</div>
	)
}
