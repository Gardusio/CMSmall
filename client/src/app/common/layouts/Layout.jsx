import { Navbar, Nav, Container } from "react-bootstrap";
import { HouseHeartFill, PersonFill } from 'react-bootstrap-icons';
import { useContext } from "react";
import { Outlet, useNavigate } from "react-router";
import { ErrorsContext } from "../../context/ErrorsProvider";
import "../../base.css"

function Layout({ user, logout, siteName }) {

  const navigate = useNavigate();

  const { clearErrors } = useContext(ErrorsContext)

  const handleNavigate = (event, link) => {
    event.preventDefault();
    clearErrors()
    navigate(link);
  }

  const handleLogout = (event) => {
    event.preventDefault();
    clearErrors()
    logout()
  }

  return (
    <div>

      <Navbar fixed="top" className="d-flex justify-content-between shadow bg-dark px-4">
        <Navbar.Brand>
          <Nav.Link
            onClick={(e) => handleNavigate(e, "/")}
            className="d-flex align-items-center text-white flex-wrap justify-content-center">
            <HouseHeartFill className="mx-2" />
            <span className={location.pathname === "/" ? "text-info" : "text-white"}>
              {siteName}
            </span>
          </Nav.Link>
        </Navbar.Brand>

        <Nav>
          {user ?
            <div className="d-flex">
              <Nav.Link
                onClick={(e) => handleNavigate(e, "/dashboard")}
                className={location.pathname === "/dashboard" ? "text-info" : "text-white"}>
                Dashboard
              </Nav.Link>
              <Nav.Link
                onClick={handleLogout}
                className=" text-decoration-none text-white">
                {user.username} | Logout
              </Nav.Link>
            </div>
            :
            <Nav.Link
              className="d-flex align-items-center justify-content-center flex-wrap text-decoration-none text-white"
              onClick={(e) => handleNavigate(e, "/login")}>
              <PersonFill className="mx-2" />
              Login
            </Nav.Link>
          }
        </Nav>
      </Navbar >
      <Container className='page-container'>
        <Outlet />
      </Container>
    </div>
  );
}

export default Layout