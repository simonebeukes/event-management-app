import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";

/* NavigationBar:
 - Fixed header shown on all pages.
 - Contains the app logo and navigation links to key sections. */
const NavigationBar = () => {
  return (
    // React-Bootstrap Navbar:

    <Navbar bg="dark" variant="dark" expand="md" fixed="top">
      {/* Container keeps navbar content aligned with page content width */}
      <Container>
        {/* Brand area: logo aligned with the rest of the navbar content */}
        <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
          {/* span used so we can style the icon via .brand-icon in CSS */}
          <span className="brand-icon d-flex align-items-center">
            <img src={logo} alt="Logo" width={150} height={40} />
          </span>
        </Navbar.Brand>

        {/* Hamburger toggle button for small screens */}
        <Navbar.Toggle aria-controls="main-navbar" />

        {/* Collapsible hamburger menu (links stack on small screens) */}
        <Navbar.Collapse id="main-navbar">
          {/* ms-auto pushes links to the right */}
          <Nav className="ms-auto">
            {/* NavLink integrates React Router with Bootstrap Nav.Link */}
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
