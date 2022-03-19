
import React, {useCallback, useEffect, useState} from 'react'
import {baseUrl} from "./BaseRoute";
import fileDownload from "js-file-download";
import {forEach} from "react-bootstrap/ElementChildren";

export const Statistic = () => {

    var ss = 0;
    let numbers = [];
    var size = 0;
    let img = [];
    const [len, setLen] = useState();
    const [pic, setPic] = useState();


    // function addHandler(title, size) {
    //     // const requestOptions = {
    //     //     method: 'POST',
    //     //     headers: { 'Accept': 'application/json',
    //     //         'Content-type': 'application/json', },
    //     //     body: {
    //     //         title: title,
    //     //         size: size
    //     //     }
    //     // };
    //     // fetch('http://localhost:5000/api/image/addPic', requestOptions)
    //     //     .then(response => response.json()).then(data => console.log(data));
    //     //
    //
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             title: title,
    //             size_pic: size
    //         })
    //     };
    //     console.log(requestOptions.body)
    //     img.push(requestOptions.body)
    //     fetch('http://localhost:5000/api/image/addPic', requestOptions)
    //         .then(response => response.json()).then(data => console.log(data));
    // }


    function getHandler() {
        const requestOptions = {
            method: 'GET'
        };
        const request = fetch('http://localhost:5000/api/image/getAll', requestOptions)
            .then(response => response.json()).then(data => f(data));
    }

    function f(data) {

        const tbody = document.querySelector('tbody');
        const st = document.getElementById('st');
        st.innerHTML = `<h4 class="my-3">Количество файлов: ${len} </h4>`
        tbody.innerHTML = "";
        let sum = 0
        let sr = 0
        data.map((item) => {
            console.log(item.title)
            sum += item.size_pic
            sr = sum / len
            tbody.innerHTML += `<tr><td><img src=${baseUrl + "/" + item.title}></td><td>${item.title}</td><td>${item.size_pic}</td></tr>`
        })
        tbody.innerHTML += `<h4  class="my-3">Общий вес изображений: ${sum} байт</h4>`
        tbody.innerHTML += `<h4 class="my-3">Средний вес изображения: ${sr} байт</h4>`
    }


    console.log(img)

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


    function fun(value) {
        size = value.size;
        // console.log(size);
        // img.size = value.size
        // img.push({size: value.size, title: number});
        //  var obj = {};
        //  obj[number] = value.size;
        //  img.push(value.size);
        // img.push(number: value.size);
        return size
    }

    // console.log(size);
    // var size = 0;
    const listItems = numbers.map((itemm) => {
        let path = baseUrl + "/" + itemm;
        let blob = fetch(path).then(r => r.blob());

        // console.log(blob)
        blob.then(value => fun(value)).then((value) => {
            //size = value
            //ss = Number(value);
            // console.log(value)
            //return value;
            img.push({[itemm]: value});
        });
        // console.log(img)

        // console.log(varible)
        const zz = img.find(el => el.key === 'image0.png')
        console.log(img.itemm)
        return (
            <>

                <tr>
                    <td><img src={path}/></td>
                    <td>{itemm}</td>
                    <td>{img[itemm]}</td>
                </tr>

            </>
        )
    });
    console.log(img)


    // const Items = numbers.map((number) => {
    //     let path = baseUrl + "/" + number;
    //     let blob = fetch(path).then(r => r.blob()).then((value) => {
    //         // addHandler(number, value.size);
    //
    //     });
    //
    // })
    console.log(img)

    return (

    <div className="container">
        <div className="row">
            <h1 style={{margin: "25px", textAlign: "center"}}>Статистика по файлам</h1>
        </div>
        <div className="row" id="st"></div>
        <div className="row">
            <div className="col-12">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">IMAGE</th>
                        <th scope="col">TITLE</th>
                        <th scope="col">SIZE (байт)</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>


                </table>
            </div>
        </div>
    </div>


)
}
