import React, {useState} from "react";
import {Button, Col, Container, Form, ProgressBar, Row} from "react-bootstrap";
import {generateImage} from "../generate";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {incCounter, counter} from "./BaseRoute";
import {Link} from "react-router-dom";
import {NavLink} from "react-router-dom";
import {data} from "@tensorflow/tfjs";


export const Main = () =>{
    const [uploadedImageURL, setUploadedImageURL] = useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=")
    const [uploaded, setUploaded] = useState(false)
    const [fp16, setFp16] = useState(0)
    const [resize, setResize] = useState("none")
    const [generationStatus, setGenerationStatus] = useState(0)
    const [updateGenerationProgressInterval, setUpdateGenerationProgressInterval] = useState(-1)
    const [bytesUsed, setBytesUsed] = useState(0)
    const [generationProgress, setGenerationProgress] = useState(false)
    // const [timeB, setTimeB] = useState(0);

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

    async function generate(){

        if (generationStatus !== 0) {
            return;
        }

        if (uploaded === false) {
            alert("Загрузите изображение.");
            return;
        }
        if (resize === "none") {
            alert("Выберите метод изменения размера.");
            return;
        }
        const start= new Date();
        window.progress = 0;
        window.bytesUsed = 0;

        let updateGenerationProgressInterval = setInterval(() => {

            setBytesUsed(window.bytesUsed)
            setGenerationProgress(window.progress * 100)

            if (generationStatus !== 1) {
                clearInterval(updateGenerationProgressInterval);
            }
        }, 500);

        setGenerationStatus(1)
        setUpdateGenerationProgressInterval(updateGenerationProgressInterval)
        let success = false;
        try {
            await generateImage(resize, fp16, "uploaded-image", "output");
            success = true;
            setTimeout(saveCanvasAsImageFile, 16000);
        } catch (error) {
            alert("Произошла ошибка при создании изображения: " + error);
            setGenerationStatus(0)
        }

        if (success) {
            setGenerationStatus(2)
        }

        const end = new Date();
        incCounter(end.getTime()-start.getTime());
    }
    function saveImage(image) {
        const link = document.createElement("a");
        link.setAttribute("href", image.src);
        link.setAttribute("download", "image");
        link.click();
    }
    function addHandler(title) {
        const canvas = document.getElementById('output');
        canvas.toBlob(function(blob) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    size_pic: blob.size,
                    time: counter
                })
            };
            console.log(requestOptions.body)
            fetch('http://localhost:5000/api/image/addPic', requestOptions)
                .then(response => response.json()).then(data => console.log(data));
        })

    }

    function saveCanvasAsImageFile(){
        if(document.getElementById('output'))
        {
            const canvas = document.getElementById('output');
            canvas.toBlob(function(blob) {

                const newImg = document.createElement('img'),
                url = URL.createObjectURL(blob);
                newImg.src = url
                saveImage(newImg);
                setTimeout(request, 2000);
            })
        }

        async function request(){
            const requestOptions = {
                method: 'POST',
                headers: { 'Accept': 'application/json',
                    'Content-type': 'application/json', },
                body: JSON.stringify( {image: "newImg.src" })
            };
            console.log(requestOptions.body)
            const request = fetch('http://localhost:5000/api/image/add', requestOptions)
                .then(response => response.json()).then(data => addHandler(data));
        }

    }

    return(
        <div className="app">
            <Container fluid style={{"display": generationStatus === 0 ? "block" : "none"}}>
                <h1 style={{textAlign: "center", margin: "25px"}}>animeTOP</h1>
                <Row className="margin">
                    <Col/>
                    <Col xs="12" md="8" lg="6">
                        <Form>
                            <Form.File accept="image/*" label={(uploaded ? "Выберите изображение" : "Загрузить изображение")} onChange={onUpload} multiple={false} custom />
                        </Form>

                    </Col>
                    <Col/>
                </Row>
                <Row className="margin">
                    <Col/>
                    <Col xs="12" md="8" lg="5" xl="4" style={{textAlign: "center", margin: "20px"}}>
                        <img id="uploaded-image" alt="" src={uploadedImageURL} />
                    </Col>
                    <Col/>
                </Row>
                <Row className="margin">
                    <Col/>
                    <Col xs="12" md="8" lg="6" style={{textAlign: "center"}}>
                        <Form>
                            <Form.Group controlId="resize">
                                <Form.Control defaultValue="none" as="select" onChange={(e) => setResize(e.target.value)}>
                                    <option value="none" disabled>Выберите размер сгенерированного изображения</option>
                                    <option value="l">Стандартное</option>
                                    <option value="original">Не изменять размер (Не обрабатывает слишком большие разрешения)</option>
                                </Form.Control>
                            </Form.Group>
                            <Button variant="primary" onClick={generate}>Сгенерировать</Button>
                        </Form>
                    </Col>
                    <Col/>
                </Row>
            </Container>

            <div className="overlay" style={{"display": generationStatus === 1 ? "block" : "none"}}>

                <div style={{"marginTop":"calc( 50vh - 50px )", "height": "100px", "textAlign": "center"}}>
                    <Container fluid>
                        <Row>
                            <Col/>
                            <Col xs="12" md="8" lg="6" style={{textAlign: "center"}}>
                                <ProgressBar now={generationProgress} style={{"margin": "10px"}} />
                                <p>Генерация изображения...</p>
                            </Col>
                            <Col/>
                        </Row>
                    </Container>
                </div>

            </div>

            <div className="overlay" style={{"display": generationStatus === 2 ? "block" : "none"}}>
                <Container fluid>
                    <Row className="margin">
                        <Col/>
                        <Col xs="12" md="8" lg="5" xl="4" style={{textAlign: "center", marginTop: "100px"}}>
                            <canvas id="output"></canvas>
                        </Col>
                        <Col/>
                    </Row>
                    <Row className="margin">
                        <Col/>
                        <Col xs="12" md="12" lg="12" xl="10" style={{textAlign: "center", margin: "20px"}}>
                            <Button variant="outline-primary" onClick={() => window.location.reload()}>Вернуться на главную</Button>
                        </Col>
                        <Col/>
                    </Row>
                </Container>
            </div>
        </div>
    )
}
