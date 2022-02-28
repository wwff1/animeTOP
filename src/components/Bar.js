import React from 'react'
import {Link} from "react-router-dom";
import {Col, Container, Navbar} from "react-bootstrap";

export const NavBar =()=>{
    return(
        <Navbar bg="light" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand  href="/">Главная</Navbar.Brand>
                <Navbar.Brand  href="/convert">Конвертация</Navbar.Brand>
                <Navbar.Brand  href="/statistic">Статистика</Navbar.Brand>
                <Navbar.Brand  href="/gallery">Галлерея</Navbar.Brand>
                <Navbar.Brand  href="/gift">Открытка</Navbar.Brand>
            </Container>
        </Navbar>
    )

}
