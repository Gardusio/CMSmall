import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Button, Col, Form } from "react-bootstrap";
import { login } from "../../api/auth.api";
import LoadingSpinner from "../common/layouts/LoadingSpinner";
import { Container } from "react-bootstrap";
import { ServerSideError } from "../common/errors/Errors"
import ErrorBlock from "../common/errors/ErrorBlock"
import { UserContext } from "../context/UserProvider";
import { ErrorsContext } from "../context/ErrorsProvider";


function LoginForm() {
    const navigate = useNavigate()

    const { updateUser } = useContext(UserContext)
    const { clearErrors, setActionError, setServerError } = useContext(ErrorsContext)

    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("password");

    const [loginError, setLoginError] = useState(null);
    const [waiting, setWaiting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        clearErrors()
        setWaiting(true);

        login(username, password)
            .then(response => {
                if (!response.success) {
                    setLoginError({ message: response.message });
                } else {
                    updateUser(response.data)
                    navigate("/dashboard")
                }
            })
            .catch(err => setServerError(new ServerSideError()))
            .finally(() => setWaiting(false))
    };

    const error = loginError


    return (
        <Container>
            {error ?
                <ErrorBlock error={error} /> :
                false}
            <Form onSubmit={handleSubmit} className="m-4 px-4">
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="username"
                        placeholder="Enter your username"
                        required
                        value={username}
                        autoFocus
                        onChange={e => { setUsername(e.target.value) }} />
                </Form.Group>

                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        required
                        onChange={e => { setPassword(e.target.value) }} />
                </Form.Group>

                <Button disabled={waiting} type="submit" className="my-2 bg-black w-100">
                    {waiting ? <LoadingSpinner /> : "Login"}
                </Button>
            </Form>
        </Container >
    );
}

export { LoginForm };
