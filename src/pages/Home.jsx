import { useState } from "react";
import { Container, Row, Col, Button, Card, Alert } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

/* Yup schema for login form:
 - username is required
 - password must be at least 4 characters */
const loginSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().min(4, "Min 4 characters").required("Required"),
});

/* Yup schema for registration form:
 - name, email, username, password are required
 - email must be valid
 - password must be at least 4 characters */
const registerSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  username: Yup.string().required("Required"),
  password: Yup.string().min(4, "Min 4 characters").required("Required"),
});

/* Home page:
 - Shows either the Login form or the Registration form.
 - Handles login/register flows and surfaces auth-related messages. */
const Home = () => {
  // mode: "login" or "register" determines which form to show
  const [mode, setMode] = useState("login");

  // Context: login action + flags/messages from auth state
  const {
    login,
    loginRequired,
    setLoginRequired,
    logoutMessage,
    setLogoutMessage,
  } = useAppContext();

  const navigate = useNavigate();

  /* Handle login form submit:
   - For this demo, we "log in" using only the username.
   - After login, navigate to the dashboard. */
  const handleLoginSubmit = (values) => {
    login({
      name: values.username,
      username: values.username,
    });
    navigate("/dashboard");
  };

  /* Handle registration form submit:
   - Simulate account creation by logging the user in with the provided data.
   - After registration, navigate to the dashboard. */
  const handleRegisterSubmit = (values) => {
    login({
      name: values.name,
      email: values.email,
      username: values.username,
    });
    navigate("/dashboard");
  };

  /* Switch to registration form:
   - Clear any auth-related messages when changing mode. */
  const switchToRegister = () => {
    setMode("register");
    setLoginRequired(false);
    setLogoutMessage(false);
  };

  /* Switch to login form:
   - Clear any auth-related messages when changing mode. */
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
                  {/* Login view */}
                  <h1 className="mb-3">Welcome back</h1>
                  <p className="text-muted">
                    Log in with your username to manage your events and view
                    your calendar.
                  </p>

                  {/* Info message after logout */}
                  {logoutMessage && (
                    <Alert variant="info" className="py-2">
                      You&apos;re logged out. Log in again to manage your events.
                    </Alert>
                  )}

                  {/* Error message when a protected route forces login
                     - Hidden when logoutMessage is shown so it does not appear
                       immediately after a user logs out */}
                  {loginRequired && !logoutMessage && (
                    <Alert variant="danger" className="py-2">
                      You must log in before accessing the dashboard or adding
                      events.
                    </Alert>
                  )}

                  {/* Login form (Formik + Yup) */}
                  <Formik
                    initialValues={{ username: "", password: "" }}
                    validationSchema={loginSchema}
                    onSubmit={handleLoginSubmit}
                  >
                    {({ isValid, dirty }) => (
                      <Form>
                        {/* Username field */}
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

                        {/* Password field */}
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

                        {/* Login + switch to register buttons */}
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
                  {/* Registration view */}
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
                        {/* Name field */}
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

                        {/* Email field */}
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

                        {/* Username field */}
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

                        {/* Password field */}
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

                        {/* Register + switch to login buttons */}
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