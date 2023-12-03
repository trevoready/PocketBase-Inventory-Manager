import React from 'react'
import { Button, FormCheck, Modal } from 'react-bootstrap'
import client from '../pbconn';
import label from '../labels/square.xml';
import { printLabel, useDymoCheckService, useDymoFetchPrinters} from 'react-dymo-hooks';
import Camera from 'react-html5-camera-photo';

export default function AddItemModal() {
    const dymoCheckService = useDymoCheckService();
    const dymoFetchPrinters = useDymoFetchPrinters(dymoCheckService);
    //states
    const [show, setShow] = React.useState(false);
    const [categories, setCategories] = React.useState([]);
    const [takePicture, setTakePicture] = React.useState(false);
    const [image, setImage] = React.useState(null);
    const [previewImage, setPreviewImage] = React.useState(null);
    const [printers, setPrinters] = React.useState([]);

    //refs
    const nameRef = React.useRef();
    const categoryRef = React.useRef();
    const serialNumberRef = React.useRef();
    const imageRef = React.useRef();
    const cameraRef = React.useRef();
    const printCodeRef = React.useRef();
    const printerRef = React.useRef();

    //functions
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {   
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', nameRef.current.value);
        formData.append('category', categoryRef.current.value);
        formData.append('serial_number', serialNumberRef.current.value);
        if(image){
            formData.append('image', image);
        }
        if(imageRef.current.files[0]){
            formData.append('image', imageRef.current.files[0]);
        }
        client.collection("items").create(formData).then(async (item) => {
            console.log(item);
            if(printCodeRef.current.checked){
                //get xml template
                fetch(label).then(async (res) => {
                    //get xml text
                    var xmlText = await res.text();
                    xmlText = xmlText.toString();
                    //replace values
                    xmlText = xmlText.replace("{{itemID}}", item.id);

                    //return xml text
                    printLabel(printerRef.current.value, xmlText);
                    console.log(xmlText);
                });
                //print label
                

            }
            setShow(false);
        }).catch((err) => {
            console.log(err);
        });
    }

    const handleTakePicture = async () => {
        var photo = await cameraRef.current.takePhoto();
        console.log(photo);
        var base64 = photo.split(',')[1];
        var filename = Math.random().toString(36).substring(7);
        var file = new File([base64], filename, {type: "image/jpeg"});
        setImage(file);
        setPreviewImage(photo);
    }

    React.useEffect(() => {
        client.collection("categories").getList(1, 10).then((categories) => {
            setCategories(categories.items);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    React.useEffect(() => {
        console.log(dymoCheckService);
        console.log(dymoFetchPrinters);
        if(dymoFetchPrinters.statusFetchPrinters === 'success'){
            setPrinters(dymoFetchPrinters.printers);
        }
    }
    , [dymoCheckService, dymoFetchPrinters]);

    

  return (
    <>
    <Modal show={show} onHide={() => {setShow(false)}}>
        <Modal.Header closeButton >
            <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <div className="form-group">
                    <label htmlFor="item-name">Item Name</label>
                    <input type="text" className="form-control" id="item-name" placeholder="Enter item name" ref={nameRef} />
                </div>
                <div className="form-group">
                    <label htmlFor="item-category">Item Category</label>
                    <select className="form-control" id="item-category" ref={categoryRef}>
                        {categories && categories.map((category) => {
                            return (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="item-serial-number">Item Serial Number</label>
                    <input type="text" className="form-control" id="item-serial-number" ref={serialNumberRef} placeholder="Enter item serial number" />
                </div>
                <div className="form-group">
                    <label htmlFor="item-image">Item Image</label>
                    {takePicture && 
                        <div className="mb-3">
                            <h3>Take Picture</h3>
                            {previewImage ? 
                            <>
                            <img src={previewImage} alt="item" style={{
                                width: "100%",
                                height: "300px",
                                objectFit: "cover"
                            }} />
                            <Button onClick={() => setPreviewImage(null)}>Retake</Button>
                            </>
                            :<>
                        <div className="mb-3" style={{
                            width: "100%",
                            height: "300px",
                            position: "relative"
                        
                        }}>
                            <Camera style={{width:"100%"}} onTakePhoto={handleTakePicture}/>
                        </div>

                        <Button onClick={() => setTakePicture(false)}>Cancel</Button>
                        <Button onClick={handleTakePicture}>Take Photo</Button>
                        </>}
                    </div>}
                    {!takePicture && <input type="file" className="form-control" id="item-image" ref={imageRef} />}
                    <h4>
                        OR
                    </h4>

                    {!takePicture ? <Button onClick={() => setTakePicture(true)}>Take Picture</Button> : <Button onClick={() => setTakePicture(false)}>Upload Picture</Button>}
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <button className="btn btn-primary" onClick={handleSubmit}>Add Item</button>
            <FormCheck type="checkbox" label="Print Code" ref={printCodeRef}/>
            <select className="form-control" id="item-category" ref={printerRef}>
                {printers && printers.map((printer) => {
                    return (
                        <option key={printer.name} value={printer.name}>{printer.name}</option>
                    )
                })}
            </select>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
    <Button variant="primary" onClick={handleShow}>
        Add Item
    </Button>
    </>
  )
}
