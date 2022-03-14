import React, {useCallback, useEffect, useState} from 'react'
import {baseUrl} from "./BaseRoute";
import {assertParamsConsistent} from "@tensorflow/tfjs-core/dist/ops/concat_util";

export const Gallery = () => {

    let numbers = [];
    const [len, setLen] = useState()
    function request(){
        const requestOptions = {
            method: 'GET'
        };
        const request = fetch('http://localhost:5000/api/image/length', requestOptions)
            .then(response => response.json()).then(data => setLen(data));
        for (let i = 0; i < len; i++)
        {
            numbers.push('image'+i+'.png')
        }
    }
    request()
    console.log(numbers)
    const listItems = numbers.map((number) =>{
        return <img style={{width:"100%", height:"100%", objectFit:"contain"}} src={baseUrl+"/"+number}/>
    });
    return(
        <div className="product">
            <h1 style={{textAlign: "center", margin: "25px"}}>Галерея</h1>
            <div className="row">
                { listItems &&
                    listItems.map((item) => {
                        return(
                            <div className="col-md-4 mb-4">
                                <div className="card" style={{height:"25vh"}}>
                                    <div className="card-body">
                                        {item}
                                    </div>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
            {/*<table  >*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*        <th>Марка автомобиля</th>*/}
            {/*        <th></th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*        {listItems.map((item)=>{*/}
            {/*            <tr></tr>*/}
            {/*        })}*/}
            {/*    </tbody>*/}
            {/*</table>table*/}

        </div>
    )

}
