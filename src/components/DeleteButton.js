import React from 'react'
import { Button } from 'react-bootstrap'

export default function DeleteButton(props) {
    //delete callback
    const {onDelete} = props;
    const [didClick, setDidClick] = React.useState(false);

    if(didClick){
        return (
            <Button variant="danger" onClick={() => onDelete()}>Are you sure?</Button>
        )
    }else{
        return (
            <Button variant="primary" onClick={() => setDidClick(true)}>Delete</Button>
        )
    }
}
