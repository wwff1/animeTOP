import React, {useCallback, useEffect, useState} from 'react'
import {baseUrl} from "./BaseRoute";
import fileDownload from "js-file-download";
import {forEach} from "react-bootstrap/ElementChildren";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import {incMas, mas} from "./BaseRoute";
import { componentWillAppendToBody } from "react-append-to-body";


export const Statistic = () => {
    let numbers = [];
    const [len, setLen] = useState();
    const dataGraph = [];
    const [isLoading, setIsLoading] = useState(true);

    async function getHandler() {
        const requestOptions = {
            method: 'GET'
        };
        await fetch('http://localhost:5000/api/image/getAll', requestOptions)
            .then(response => response.json()).then(data => f(data));
    }


    function f(data) {
        const tbody = document.querySelector('tbody');
        const st = document.getElementById('st');
        data.map((item) => {
            dataGraph.push({name: Math.round(item.size_pic/1000) + " КБ", uv: Math.round(item.time/1000)})
        })
        incMas(dataGraph)
        st.innerHTML = `<h4 class="my-3">Количество файлов: ${len} </h4>`
        tbody.innerHTML = "";
        let sum = 0
        let sr = 0
        data.map((item) => {
            sum += item.size_pic
            sr = sum / len
        })
        tbody.innerHTML += `<h4  class="my-3">Общий вес изображений: ${sum} байт</h4>`
        tbody.innerHTML += `<h4 class="my-3">Средний вес изображения: ${Math.round(sr)} байт</h4>`
        setIsLoading(false)
    }
    function request() {
        const requestOptions = {
            method: 'GET'
        };
        const request = fetch('http://localhost:5000/api/image/length', requestOptions)
            .then(response => response.json()).then(data => setLen(data));
        for (let i = 0; i < len; i++) {
            numbers.push('image' + i + '.png')
        }
    }

    request()
    getHandler()

    const renderLineChart = (

        <LineChart width={900} height={600} data={mas}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
        </LineChart>
    );
    return <div className="container">
            <div className="row">
                <h1 style={{margin: "25px", textAlign: "center"}}>Статистика по файлам</h1>
            </div>
            <div className="row" id="st"></div>
            <div className="row">
                <div className="col-12" id="d1">
                    <table className="table">
                        <thead>
                        <tr>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    {renderLineChart}
                </div>
            </div>
        </div>
}
