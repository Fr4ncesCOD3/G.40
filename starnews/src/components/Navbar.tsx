import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Container, Nav, Badge } from 'react-bootstrap';
import { useFavorites } from './FavoritesContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { favorites } = useFavorites();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <BootstrapNavbar 
      expand="lg" 
      fixed="top"
      className={`navbar-custom ${scrolled ? 'scrolled' : ''}`}
    >
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="brand-custom">
          StarXnewS
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={`nav-link-custom ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/favorites" 
              className={`nav-link-custom ${location.pathname === '/favorites' ? 'active' : ''}`}
            >
              Preferiti
              {favorites.length > 0 && (
                <Badge bg="primary" className="ms-2">
                  {favorites.length}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
