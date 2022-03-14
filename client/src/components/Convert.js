import React, {useState} from 'react'
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import fileDownload from 'js-file-download'



export const Convert =  ({image}) => {
    const [uploadedImage, setUploadedImage] = useState();
    const [uploadedImageURL, setUploadedImageURL] = useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=")
    const [uploaded, setUploaded] = useState(false)
    const [resize, setResize] = useState("none")

    function onUpload(e) {
        var input = e.target;
        var reader = new FileReader();
        reader.onload = () => {
            var dataURL = reader.result;
            setUploadedImageURL(dataURL)
            setUploaded(true)
        };
        reader.readAsDataURL(input.files[0]);

        var fileList = e.target.files;
        setUploadedImage(fileList);
    }

    function convert(){
        if (uploaded === false) {
            alert("Загрузите изображение.");
            return;
        }
        if (resize === "none") {
            alert("Выберите метод изменения файла.");
            return;
        }

        if(resize === "p")
        {
            let blob = uploadedImage[0].slice(0, uploadedImage[0].size, 'image/png');
            let newFile = new File([blob], 'convert_to_png.png', {type: 'image/png'});
            fileDownload(newFile, newFile.name)
        }
        else if(resize === "j")
        {
            let blob = uploadedImage[0].slice(0, uploadedImage[0].size, 'image/png');
            let newFile = new File([blob], 'convert_to_jpg.jpg', {type: 'image/jpg'});
            fileDownload(newFile, newFile.name)
        }
    }

    return(
       <>
           <div className="app">
               <Container fluid>
                   <h1 style={{textAlign: "center", margin: "25px"}}>Конвертация</h1>
                   <Row className="margin">
                       <Col/>
                       <Col xs="12" md="8" lg="6">
                           <Form>
                               <Form.File accept="image/*" label={"Выберите изображение"} onChange={onUpload} multiple={false} custom />
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
                                       <option value="none" disabled>Выберите расширение файла</option>
                                       <option value="p">.PNG</option>
                                       <option value="j">.JPEG</option>
                                   </Form.Control>
                               </Form.Group>
                               <Button variant="primary" onClick={convert}>Конверировать</Button>
                           </Form>
                       </Col>
                       <Col/>
                   </Row>
               </Container>
           </div>
        </>
    )

}
