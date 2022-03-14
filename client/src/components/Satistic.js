import React, {useState} from 'react'
import {baseUrl} from "./BaseRoute";
import fileDownload from "js-file-download";
import {forEach} from "react-bootstrap/ElementChildren";
window.s = 0;

let v = 0

export const Statistic = () => {

    //const [size, setSize] = useState()
    let numbers = [];
    let size = 0;

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

    function fun (value){
        size = value.size;
        v = value.size
        // console.log(size);
        // img.size = value.size
        // img.push({size: value.size, title: number});
        //  var obj = {};
        //  obj[number] = value.size;
        //  img.push(value.size);
        // img.push(number: value.size);
        return size
    }
    const img = []
    // console.log(size);
    // var size = 0;


    const listItems = numbers.map((number) =>{
        // const img = [{number: 8}, {number: 8}];
        let path = baseUrl+"/"+number;
        let blob = fetch(path).then(r => r.blob()).then((value) => {

            img.push({number: value.size})
            // size = value
            // console.log(value.size)
            return value.size
        });

        let objArray = [ { foo: 1, bar: 2}, { foo: 3, bar: 4}, { foo: 5, bar: 6} ]
        // let result = objArray.map(({ foo }) => foo)
        // let result = img.map(({ number }) => number)
        // console.log(objArray)
        console.log(objArray.map(({ foo }) => console.log(foo)))
        // console.log(result)
        // console.log(blob)
        // const varible = blob

        // console.log(blob)
        // const size = img.filter(el => el["title"] === number)
        // console.log(listItems)
        // console.log(size)
        return (
            <>

                <tr>
                    <td><img src={path}/></td>
                    <td>{number}</td>
                    {

                    }
                    {/*<td>{img.number}</td>*/}
                </tr>

            </>
        )
    });


    // console.log(listItems);
    //let blob = uploadedImage[0].slice(0, uploadedImage[0].size, 'image/png');
    // console.log(numbers[0]);
    //let path = baseUrl+"/"+numbers[0];
    //let blob = fetch(path).then(r => r.blob());
    //let newFile = new File([blob], 'convert_to_png.png', {type: 'image/png'});
    // console.log(img);



    return(
        <table>

            <thead>

            </thead>
            <tbody>
            {listItems && listItems.map((item)=>{
                return(

                    <>{item}</>

                )
            })}
            </tbody>


        </table>

    )

}