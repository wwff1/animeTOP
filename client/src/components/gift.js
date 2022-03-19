import React, {useState} from 'react'
import {Button, Col, Container, Form, ProgressBar, Row} from "react-bootstrap";
import {saveAs} from "file-saver";
import html2canvas from 'html2canvas';
import { useAlert } from 'react-alert';

export const Gift =()=>{
    const [uploadedImageURL, setUploadedImageURL] = useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=")
    const [uploaded, setUploaded] = useState(false)
    const [fp16, setFp16] = useState(0)
    const [resize, setResize] = useState("none")
    const [generationStatus, setGenerationStatus] = useState(0)
    const [updateGenerationProgressInterval, setUpdateGenerationProgressInterval] = useState(-1)
    const [bytesUsed, setBytesUsed] = useState(0)
    const [generationProgress, setGenerationProgress] = useState(false)
    const [quote, setQuote] = useState()
    function onUpload(e) {
        var input = e.target;
        var reader = new FileReader();
        reader.onload = () => {
            var dataURL = reader.result;
            setUploadedImageURL(dataURL)
            setUploaded(true)
        };
        reader.readAsDataURL(input.files[0]);
    }

    const alert = useAlert()

    function ViewAlert(message){
        alert.show(message);
    }

    async function generate(){
        if (generationStatus !== 0) {
            return;
        }

        if (uploaded === false) {
            alert("Загрузите изображение.");
            return;
        }
        if (resize === "none") {
            alert("Выберите персонажа.");
            return;
        }
        setGenerationStatus(1)
        fetch('https://animechan.vercel.app/api/quotes/character?name='+resize)
            .then(response => response.json())
            .then(quotes => setQuote(quotes[0].quote))
        ViewAlert("открытка сгенерирована");
    }

    function saveHandler(){
        html2canvas(document.getElementById("gift")).then(canvas => {
            var image = new Image();
            image.src = canvas.toDataURL();
            saveAs(image.src, 'gift.png')
        });
    }

    console.log(quote)
    return(
        <div className="app">
            <Container fluid>
                <h1 style={{textAlign: "center", margin: "25px"}}>Открытка</h1>
                <div className="row justify-content-md-center">
                    <div className="col-6">
                        <div className="row justify-content-md-center">

                            <div className="col-12">
                                <Form>
                                    <Form.File accept="image/*" label={(uploaded ? "Выберите изображение" : "Загрузить изображение")} onChange={onUpload} multiple={false} custom />
                                </Form>
                            </div>
                        </div>
                        <div className="row justify-content-md-center">
                            <div className="col-xs-12 col-md-8" style={{textAlign: "center", margin: "25px"}}>
                                <img id="uploaded-image" alt="" src={uploadedImageURL} />
                            </div>
                        </div>
                        <div className="row justify-content-md-center">
                            <div className="col-12" style={{textAlign:"center"}}>
                                <Form>
                                    <Form.Group controlId="resize">
                                        <Form.Control defaultValue="none" as="select" onChange={(e) => setResize(e.target.value)}>
                                            <option value="none" disabled>Выберите персонажа</option>
                                            <option value="Satoshi Fukube">Satoshi Fukube</option>
                                            <option value="Kazuki Kazami">Kazuki Kazami</option>
                                            <option value="Yutaka Hasebe">Yutaka Hasebe</option>
                                            <option value="Emiya Shirou">Emiya Shirou</option>
                                            <option value="Uryuu Ishida">Uryuu Ishida</option>
                                            <option value="Near">Near</option>
                                            <option value="Misato Katsuragi">Misato Katsuragi</option>
                                            <option value="Ryougi Shiki">Ryougi Shiki</option>
                                            <option value="Akari Shinohara">Akari Shinohara</option>
                                            <option value="Konno Yuuki">Konno Yuuki</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button variant="primary" onClick={generate}>Сгенерировать</Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <div className="col-6" style={{"display": generationStatus === 1 ? "block" : "none"}}>
                        <div className="row justify-content-md-center">
                            <h2 className="mt-0 mb-2">Ваша открытка:</h2>
                            <div id="gift" className="text-center col-12 mb-4 p-4"
                                  style={{"display": generationStatus === 1 ? "block" : "none", textAlign: "center", marginTop: "20px", width: "50%", backgroundColor:"rgba(56,206,252,0.47)"}}>
                                <p className="my-3">{quote}</p>
                                <hr/>
                                <div className="col-12" style={{"display": generationStatus === 1 ? "block" : "none", textAlign: "center"}}>
                                    <img id="uploaded-image" alt="" className="" src={uploadedImageURL} style={{width:"80%", margin: "0 auto"}} />
                                </div>
                                <div className="row justify-content-end">
                                    <div className="col-5">
                                        <p>от кого:______________</p>
                                        <p>кому:_________________</p>
                                    </div>
                                </div>
                            </div>
                            <Button variant="primary" className="col-4" style={{"display": generationStatus === 1 ? "block" : "none"}} onClick={saveHandler}>Сохранить открытку</Button>
                        </div>
                    </div>
                </div>

            {/*    </Row>*/}
            {/*    <Row className="margin">*/}
            {/*        <Col/>*/}
            {/*        <div  id="gift" className="text-center" style={{"display": generationStatus === 1 ? "block" : "none", textAlign: "center", marginTop: "20px", width: "50%", backgroundColor:"yellow"}}>*/}
            {/*            <p>{quote}</p>*/}
            {/*            <div style={{"display": generationStatus === 1 ? "block" : "none", textAlign: "center"}} xs="12" md="8" lg="5" xl="4">*/}
            {/*                <img id="uploaded-image" alt="" className="" src={uploadedImageURL} style={{width:"80%", margin: "0 auto"}} />*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <Button variant="primary" style={{"display": generationStatus === 1 ? "block" : "none"}} onClick={saveHandler}>Сгенерировать</Button>*/}
            {/*        <Col/>*/}
            {/*    </Row>*/}
            </Container>
        </div>

    )

}
