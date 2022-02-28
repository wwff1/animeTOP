import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Main} from "./components/Main";
import {Convert} from "./components/Convert";
import {Gallery} from "./components/Gallery";
import {Statistic} from "./components/Satistic";
import {Gift} from "./components/gift";




export const useRoutes = () => {
        return (
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/convert" element={<Convert/>}/>
                <Route path="/gallery" element={<Gallery/>}/>
                <Route path="/statistic" element={<Statistic/>}/>
                <Route path="/gift" element={<Gift/>}/>
            </Routes>
        )
}
