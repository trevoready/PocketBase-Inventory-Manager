
import React from 'react'
import { Image } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap';

export default function ImageDisplay(props) {
    const [showModal, setShowModal] = React.useState(false);
    const {item} = props;

    const show = () => {
        setShowModal(true);
    }

    console.log(item);
    if(showModal){
    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{item.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Image className='w-100' src={'http://inv.dev.trevorslab.com/api/files/' + item.collectionId + '/' +item.id + '/' + item.image}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => setShowModal(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )}
    else{
        return(
            <Image onClick={show} className='imageBubble' src={'http://inv.dev.trevorslab.com/api/files/' + item.collectionId + '/' +item.id + '/' + item.image + '?thumb=100x100'}/>
        )
    }
}
