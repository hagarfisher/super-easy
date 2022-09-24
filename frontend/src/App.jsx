import axios from "axios";
import { useState } from "react";
import { extensionId } from "./utils/constants";

import "./App.css";
import { Spinner } from "react-bootstrap";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logout from "./pages/Logout/Logout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import Lists from "./pages/Lists/Lists";

export default function App() {
  const cartId = localStorage.getItem("cartId");
  const defaultCartState = !!cartId;
  const [doesCartExist, setDoesCartExist] = useState(defaultCartState);
  const [isLoading, setIsLoading] = useState(false);
  const { logout, isAuthenticated, getAccessTokenWithPopup } = useAuth0();


  async function createCart() {
    const accessToken = await getAccessTokenWithPopup({
      audience: 'http://localhost:8080',
      scope: "read:current_user",
    });
    console.log(accessToken);
    const url = "http://localhost:8080/createEmptyCart";
    try {
      setIsLoading(true);
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      const cartId = response.data.cartId;
      setDoesCartExist(true);
      localStorage.setItem("cartId", cartId);
      window.chrome.runtime.sendMessage(extensionId, { cartId },
        function (response) {
          if (!response.success) {
            console.error(url);
          }
        });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  if (isLoading) {
    return <div style={{ width: '100vw', textAlign: 'center', marginTop: '5%' }}><Spinner animation="border" /></div>;
  }
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="https://supereasy.s3.us-east-2.amazonaws.com/superEasy+logo.png"
              width="70"
              className="d-inline-block align-top"
              alt="supereasy logo"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              {isAuthenticated && <Nav.Link href="/lists">Lists</Nav.Link>}
              {isAuthenticated && <Nav.Link href="/logout" onClick={() => logout({ returnTo: window.location.origin })}>Logout</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Router>
        <Routes className="app">
          <Route index path="/" element={
            <Home createCart={createCart} />
          } />
          <Route path="/lists" element={<Lists />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </Router>
    </>
  )
}