import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import React, { useState } from 'react';
import { Badge, Button, Col, FormControl, InputGroup, ListGroup, Nav, Row, Modal } from 'react-bootstrap';
import { fetchLists } from '../../services/list';
import { FaPlus, FaTrash, FaClipboardList, FaAngleUp, FaAngleDown, FaWindowRestore } from 'react-icons/fa';

import styles from './style.module.scss';

export default function Lists() {
    const [lists, setLists] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState("");
    const [productQuantity, setQuantity] = useState(0);
    const { getAccessTokenSilently } = useAuth0();


    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const lists = await fetchLists();
            setLists(lists);
            setIsLoading(false);
        }

        fetchData();
    }, [])

    function addProduct() {
        if (productName.length > 0 && products.find(product => product.name === productName) === undefined) {
            setProducts([...products, { name: productName, quantity: productQuantity }]);
        }
    }

    function deleteProduct(productIndex) {
        const newProducts = [...products];
        newProducts.splice(productIndex, 1);
        console.log(newProducts);
        setProducts(newProducts);
    }

    function increaseQuantity(productIndex) {
        const newProducts = [...products];
        newProducts[productIndex].quantity++;
        setProducts(newProducts);
    }
    function decreaseQuantity(productIndex) {
        const newProducts = [...products];
        newProducts[productIndex].quantity--;
        setProducts(newProducts);
    }

    async function addToCart() {
        const accessToken = await getAccessTokenSilently({
            audience: 'http://localhost:8080',
            scope: "read:current_user",
        });
        const cartId = localStorage.getItem("cartId");
        await axios.post("http://localhost:8080/cart/add", { cartId, products }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        window.open("https://www.primadonaonline.co.il/", "_blank");
    }

    async function createList() {
        const accessToken = await getAccessTokenSilently({
            audience: 'http://localhost:8080',
            scope: "read:current_user",
        });
        await axios.post("http://localhost:8080/list/create", { products }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    }

        const [show, setShow] = useState(false);
      
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

    return (
        <div className={styles['lists-wrapper']}>
            <div className={styles.lists}>
                <div className={styles['list-title']}>
                    <FaClipboardList />
                    <span>Lists</span>
                </div>

                <Nav defaultActiveKey="/home" className="flex-column">
                    {lists.map(list => (
                        <Nav.Link key={list.id} href={`/lists/${list.id}`}>
                            {list.name}
                        </Nav.Link>))}
                </Nav>
            </div>

            <div className="searchProducts">
                <h4>Search Products</h4>
                <Row className="mb-3">
                    <Col>
                        <InputGroup id="productName" onChange={(e) => setProductName(e.target.value)} className="mb-3">
                            <FormControl
                                placeholder="Product name"
                                aria-label="Enter product name"
                                aria-describedby="Enter product name"
                            />
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup id="productQuantity" onChange={(e) => setQuantity(e.target.value)} className="mb-3 w-75">
                            <FormControl
                                type="number"
                                step="0.1"
                                placeholder="Quantity"
                                aria-label="Enter product quantity"
                                aria-describedby="Enter product quantity"
                            />
                        </InputGroup>
                    </Col>
                    <Col>
                        <Button onClick={() => addProduct()} id="addProduct"><FaPlus /></Button>
                    </Col>
                </Row>
                <ListGroup className={styles['product-list']} variant="flush" >
                    {products.map((product, index) => (
                        <ListGroup.Item className={styles['list-item']} key={product.name} as="li" >
                            <div className={styles['product-details']}>
                                <span className={styles['product-name']}>{product.name}</span>
                                <div className={styles['quantity-control']}>
                                    <div className="ms-2 me-auto">
                                        <Badge bg="primary" pill>
                                            {product.quantity}
                                        </Badge>
                                    </div>
                                    <div className={styles['updown-buttons']}>
                                        <button className={styles.buttons} onClick={() => increaseQuantity(index)}><FaAngleUp /></button>
                                        <button className={styles.buttons} onClick={() => decreaseQuantity(index)}><FaAngleDown /></button>
                                    </div>
                                </div>
                            </div>
                            <Button onClick={() => deleteProduct(index)} className={styles['trash-button']}><FaTrash color="#000" /></Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <div className={styles['submit-buttons']}>
                    <Button className="w-40" onClick={handleShow}>Add to cart</Button>
                    <Button className="w-40" onClick={createList}>Add to My Lists</Button>
                </div>
            </div>

            <Modal show={show} centered onHide={handleClose}>
                {/* <Modal.Header closeButton></Modal.Header> */}
                <Modal.Body>You will now be redirected to the supermarket's website...</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addToCart}>
                        I'm finished shopping
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}
