import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {useRoutes} from "./routes";
import "./App.css"
import {NavBar} from "./components/Bar";
import {Main} from "./components/Main";



function App() {

    const routes = useRoutes()

    return (

            <Router>
                <NavBar/>
                <div className="content">
                    {routes}
                </div>
            </Router>
    );
}

export default App;
