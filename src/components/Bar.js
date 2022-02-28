import React from 'react'
import {Link} from "react-router-dom";
export const NavBar =()=>{
    return(
        <div className="fixed-top">
            <nav className="navbar my-0">

            </nav>
            <div className="container-fluid">
                <nav className="nav nav-fill" id="light">
                    <a className="nav-item bar"> <Link className="Nav_link" to="/">Главная</Link></a>
                    <a className="nav-item bar"><Link className="Nav_link" to="/catalog">Конвертация</Link></a>
                    <a className="nav-item bar"><Link className="Nav_link" to="/statistic">Статистика</Link></a>
                    <a className="nav-item bar"><Link className="Nav_link" to="/about">Галерея</Link></a>
                    <a className="nav-item bar"><Link className="Nav_link" to="/about">Открытка</Link></a>
                </nav>
            </div>
        </div>

    )

}