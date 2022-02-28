import React from 'react';
import {Routes} from 'react-router-dom';
import {Route} from 'react-router-dom';
import {Main} from "./components/Main";




export const useRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" component={Main}/>
            {/*<Redirect to="/" />*/}
        </Routes>
    )
}