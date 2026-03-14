import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="md" fixed="top">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="Logo" width={150} height={40} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/add-event">
              Add Event
            </Nav.Link>
            <Nav.Link as={NavLink} to="/help">
              Help
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
