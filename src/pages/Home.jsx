import { useState } from "react";
import { Container, Row, Col, Button, Card, Alert } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const loginSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().min(4, "Min 4 characters").required("Required"),
});

const registerSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  username: Yup.string().required("Required"),
  password: Yup.string().min(4, "Min 4 characters").required("Required"),
});

const Home = () => {
  const [mode, setMode] = useState("login");
  const {
    login,
    loginRequired,
    setLoginRequired,
    logoutMessage,
    setLogoutMessage,
  } = useAppContext();
  const navigate = useNavigate();

  const handleLoginSubmit = (values) => {
    login({
      name: values.username,
      email: "", // not used for login here
      username: values.username,
    });
    navigate("/dashboard");
  };

  const handleRegisterSubmit = (values) => {
    login({
      name: values.name,
      email: values.email,
      username: values.username,
    });
    navigate("/dashboard");
  };

  const switchToRegister = () => {
    setMode("register");
    setLoginRequired(false);
    setLogoutMessage(false);
  };

  const switchToLogin = () => {
    setMode("login");
    setLoginRequired(false);
    setLogoutMessage(false);
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={5}>
          <Card>
            <Card.Body>
              {mode === "login" ? (
                <>
                  <h1 className="mb-3">Welcome back</h1>
                  <p className="text-muted">
                    Log in with your username to manage your events and view
                    your calendar.
                  </p>

                  {logoutMessage && (
                    <Alert variant="info" className="py-2">
                      You&apos;re logged out. Log in again to manage your events.
                    </Alert>
                  )}

                  {loginRequired && (
                    <Alert variant="danger" className="py-2">
                      You must log in before accessing the dashboard or adding
                      events.
                    </Alert>
                  )}

                  <Formik
                    initialValues={{ username: "", password: "" }}
                    validationSchema={loginSchema}
                    onSubmit={handleLoginSubmit}
                  >
                    {({ isValid, dirty }) => (
                      <Form>
                        <div className="mb-3">
                          <label htmlFor="username" className="form-label">
                            Username
                          </label>
                          <Field
                            id="username"
                            name="username"
                            className="form-control"
                            placeholder="your_username"
                          />
                          <div className="text-danger small">
                            <ErrorMessage name="username" />
                          </div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                          <Field
                            id="password"
                            name="password"
                            type="password"
                            className="form-control"
                            placeholder="Password"
                          />
                          <div className="text-danger small">
                            <ErrorMessage name="password" />
                          </div>
                        </div>

                        <div className="d-grid gap-2">
                          <Button
                            type="submit"
                            variant="primary"
                            disabled={!(isValid && dirty)}
                          >
                            Log in
                          </Button>
                          <Button
                            type="button"
                            variant="outline-secondary"
                            onClick={switchToRegister}
                          >
                            Register
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </>
              ) : (
                <>
                  <h1 className="mb-3">Create an account</h1>
                  <Formik
                    initialValues={{
                      name: "",
                      email: "",
                      username: "",
                      password: "",
                    }}
                    validationSchema={registerSchema}
                    onSubmit={handleRegisterSubmit}
                  >
                    {({ isValid, dirty }) => (
                      <Form>
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">
                            Name
                          </label>
                          <Field
                            id="name"
                            name="name"
                            className="form-control"
                          />
                          <div className="text-danger small">
                            <ErrorMessage name="name" />
                          </div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                          <Field
                            id="email"
                            name="email"
                            type="email"
                            className="form-control"
                          />
                          <div className="text-danger small">
                            <ErrorMessage name="email" />
                          </div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="username" className="form-label">
                            Username
                          </label>
                          <Field
                            id="username"
                            name="username"
                            className="form-control"
                          />
                          <div className="text-danger small">
                            <ErrorMessage name="username" />
                          </div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                          <Field
                            id="password"
                            name="password"
                            type="password"
                            className="form-control"
                          />
                          <div className="text-danger small">
                            <ErrorMessage name="password" />
                          </div>
                        </div>

                        <div className="d-grid gap-2">
                          <Button
                            type="submit"
                            variant="primary"
                            disabled={!(isValid && dirty)}
                          >
                            Register
                          </Button>
                          <Button
                            type="button"
                            variant="outline-secondary"
                            onClick={switchToLogin}
                          >
                            Back to login
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
