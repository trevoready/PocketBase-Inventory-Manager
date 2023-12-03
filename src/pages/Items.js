import React from 'react'
import { useEffect } from 'react';
import client from '../pbconn';
import { Image, Table } from 'react-bootstrap';
import AddItemModal from '../modals/AddItemModal';
import DeleteButton from '../components/DeleteButton';
import "../App.css"
import ImageDisplay from '../components/ImageDisplay';


export default function Items() {
    const [items, setItems] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [page , setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);
    const [perPage, setPerPage] = React.useState(10);

    useEffect(() => {
        setLoading(true);
        client.collection("items").getList(page,perPage, {
            expand: "category"
        }).then((items) => {
            setItems(items.items);
            setTotalPages(items.totalPages);
            console.log(items);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setError(err);
            setLoading(false);
        });
    }, [page, perPage]);

    const deleteItem = (id) => {
        console.log(id);
        client.collection("items").delete(id).then((res) => {
            console.log(res);
            setItems(items.filter((item) => item.id !== id));
        }).catch((err) => {
            console.log(err);
        });
    }

  return (
    <div className='d-flex flex-column'>
        <div className='d-flex flex-row'>
            <h1 className='flex-grow-1'>Items</h1>
            <button className='btn btn-primary me-2' onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
            <button className='btn btn-primary me-2' onClick={() => setPage(page + 1)} disabled={totalPages === 0 || totalPages === page}>Next</button>
            <select className='form-control w-auto me-2' value={perPage} onChange={(e) => setPerPage(e.target.value)}>
                <option value='10'>10</option>
                <option value='25'>25</option>
                <option value='50'>50</option>
                <option value='100'>100</option>
            </select>
            <AddItemModal />
        </div>
        <Table striped bordered hover className='mt-3'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Serial Number</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {items && items.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.serial_number}</td>
                            <td>{item.category ? item.expand.category.name : "None"}</td>
                            <td>{item.image.length === 1 ? <ImageDisplay item={item}/> : "No Image"}</td>
                            <td>
                                <DeleteButton onDelete={() => deleteItem(item.id)}/>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    </div>
  )
}