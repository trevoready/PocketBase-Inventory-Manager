import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import MainDashboard from './MainDashboard'
import Items from './Items'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'

export default function Dashboard() {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();
  return (
    <Container>
        <Navbar bg="light" expand="lg" style={{
            borderRadius: '5px',
            marginBottom: '20px',
            marginTop: '10px',
            padding: '10px'
        }}>
            <Navbar.Brand href="#home">PB-INV</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Item>
                        <Link className='nav-link' to="/dashboard">Main Dashboard</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link className='nav-link' to="/dashboard/items">Items</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => {logout(); navigate("/")}} >Logout</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    <Routes>
        <Route path="/" element={<MainDashboard/>} />
        <Route path="items" element={<Items/>} />

    </Routes>
    </Container>
  )
}
