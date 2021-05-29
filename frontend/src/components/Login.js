import { useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(true);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", {
        email,
        password
      })
      .then(res => props.handleSubmit(res.data.token))
      .catch(err => setValid(false));
  };
  return (
    <div style={{ width: "30%", margin: "auto" }}>
      <Card className="text-center">
        <Card.Body>
          <Card.Title>LOGIN</Card.Title>
          <form onSubmit={e => handleSubmit(e)}>
            <Card.Text>
              <Form.Control
                className="mb-3"
                type="email"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
              />
              <Form.Control
                className="mb-3"
                type="password"
                placeholder="Password"
                autoComplete="password"
                onChange={e => setPassword(e.target.value)}
              />
            </Card.Text>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </form>
        </Card.Body>
      </Card>

      {!valid && (
        <Alert variant="danger" className="my-4">
          Invalid email or password
        </Alert>
      )}
    </div>
  );
}

export default Login;
