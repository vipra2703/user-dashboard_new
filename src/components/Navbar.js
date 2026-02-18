import { Navbar as BsNavbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUserContext } from '../context/UserContext';
import { memo } from 'react';

export const Navbar = memo(function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { selectedUsers, clearSelection } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <BsNavbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <BsNavbar.Brand as={Link} to="/">
          User Dashboard
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="navbar-nav" />
        <BsNavbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && (
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
            )}
          </Nav>
          <Nav className="align-items-center">
            {isAuthenticated && selectedUsers.length > 0 && (
              <div className="me-3">
                <Badge bg="info" className="me-2">
                  {selectedUsers.length} selected
                </Badge>
                <Button variant="outline-light" size="sm" onClick={clearSelection}>
                  Clear
                </Button>
              </div>
            )}
            {isAuthenticated ? (
              <>
                <span className="text-light me-3">Hello, {user?.username}</span>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
});

