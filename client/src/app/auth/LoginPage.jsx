import { Button, Card, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LoginForm } from "./LoginForm";

/**
 * The login page displayed on "/login"
 * 
 */
function LoginPage() {
    return (
        <Container fluid className="d-flex w-100 p-0 mt-5 justify-content-center">
            <Row>
                <Button className="bg-dark fw-bolder">
                    <Link to="/" className="text-white text-decoration-none">
                        Go Back
                    </Link>
                </Button>
                <Card className="p-0">
                    <Card.Header as="h2" className="p-4">Login to CMSmall</Card.Header>
                    <LoginForm />
                </Card>
            </Row>
        </Container >
    );
}

export default LoginPage;
