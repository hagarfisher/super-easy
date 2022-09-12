import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import React, { useState } from 'react';
import { Badge, Spinner, Button, Col, FormControl, InputGroup, ListGroup, Nav, Row, Modal, OverlayTrigger, Tooltip, Accordion } from 'react-bootstrap';
import { fetchLists } from '../../services/list';
import { FaPlus, FaTrash, FaClipboardList, FaAngleUp, FaAngleDown, FaExclamationTriangle } from 'react-icons/fa';
import './accordion.css';
import styles from './style.module.scss';

export default function Lists() {
    const [lists, setLists] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState("");
    const [productQuantity, setQuantity] = useState(0);
    const [listName, setListName] = useState("");
    const { getAccessTokenSilently } = useAuth0();


    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const accessToken = await getAccessTokenSilently({
                audience: 'http://localhost:8080',
                scope: "read:current_user",
            });

            const response = await fetchLists(accessToken);
            const lists = response.data;
            console.log(lists);
            setLists(lists);
            setIsLoading(false);
        }

        fetchData();
    }, [getAccessTokenSilently]);

    async function addProduct() {
        console.log(productName);
        if (productName.length > 0) {
            const accessToken = await getAccessTokenSilently({
                audience: 'http://localhost:8080',
                scope: "read:current_user",
            });
            const product = { name: productName, quantity: productQuantity };
            const foundProduct = await axios.get("http://localhost:8080/cart/searchProduct", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: product,
            });
            if (!products.find(product => product.name === productName)) {
                let found = true;
                if (foundProduct.data !== null) {
                    found = false;
                }
                const productObject = { name: productName, quantity: productQuantity, found }
                setProducts([productObject, ...products]);
            }

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

    function addListToCart(index) {
        const list = lists[index];
        const listProducts = list.products;
        const newProducts = [...products];
        listProducts.forEach(product => {
            if (!newProducts.find(p => p.name === product.name)) {
                newProducts.push(product);
            }
        });

        setProducts(newProducts);
    }

    async function deleteList(index) {
        const list = lists[index];
        console.log(list);
        const accessToken = await getAccessTokenSilently({
            audience: 'http://localhost:8080',
            scope: "read:current_user",
        });
        await axios.delete(`http://localhost:8080/list/${list.id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const newLists = [...lists];
        newLists.splice(index, 1);
        setLists(newLists);
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

    async function createList(name) {
        const accessToken = await getAccessTokenSilently({
            audience: 'http://localhost:8080',
            scope: "read:current_user",
        });
        const response = await axios.post("http://localhost:8080/list/create", { name, products }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const newList = response.data;
        setLists([...lists, newList]);
        setShowListNameModal(false);
    }

    const [showListNameModal, setShowListNameModal] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseListModal = () => setShowListNameModal(false);
    const handleShowListModal = () => setShowListNameModal(true);

    return (
        <div className={styles['lists-wrapper']}>
            <div className={styles.lists}>
                <div className={styles['list-title']}>
                    <FaClipboardList />
                    <span>Lists</span>
                </div>
                {isLoading ? <span style={{ display: "flex", justifyContent: "center", color: "#635dff", marginTop: "10vh" }}><Spinner animation="border" /></span> : (

                    <Accordion className={styles['my-lists-wrapper']} defaultActiveKey="0" flush>
                        {lists.map((list, index) => (
                            <Accordion.Item eventKey={index}>
                                <Accordion.Header>
                                    <div className={styles['list-name']}>
                                        <span>{list.name}</span>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup>
                                        {list.products.map((product, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col xs={8}>
                                                        <span>{product.name}</span>
                                                    </Col>
                                                    <Col xs={4}>
                                                        <span>{product.quantity}</span>
                                                        {/* <Badge className={styles['main-button']} bg="primary" pill>
                                                            {product.quantity}
                                                        </Badge> */}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    <div className={styles['list-actions']}>
                                        <Button className={styles['list-action-buttons']} onClick={() => { deleteList(index) }}><span style={{ display: "flex", justifyContent: "center" }}><FaTrash size={14} /></span></Button>
                                        <Button className={styles['list-action-buttons']} onClick={() => { addListToCart(index) }}><span style={{ display: "flex", justifyContent: "center" }}><FaPlus size={14} /></span></Button>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                )}
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
                        <Button className={styles['main-button']} onClick={() => addProduct()} id="addProduct"><FaPlus /></Button>
                    </Col>
                </Row>
                <ListGroup className={styles['product-list']} variant="flush" >
                    {products.map((product, index) => (
                        <div className={styles['product-container']}>
                            <ListGroup.Item className={styles['list-item']} key={product.name} as="li" >
                                <div className={styles['product-details']}>
                                    <span className={styles['product-name']}>{product.name}</span>
                                    <div className={styles['product-controls']}>
                                        <div className={styles['quantity-control']}>
                                            <div className="ms-2 me-auto">
                                                <Badge className={styles['main-button']} bg="primary" pill>
                                                    {product.quantity}
                                                </Badge>
                                            </div>
                                            <div className={styles['updown-buttons']}>
                                                <button className={styles.buttons} onClick={() => increaseQuantity(index)}><FaAngleUp /></button>
                                                <button className={styles.buttons} onClick={() => decreaseQuantity(index)}><FaAngleDown /></button>
                                            </div>
                                        </div>
                                        <Button onClick={() => deleteProduct(index)} className={styles['list-action-buttons']}><span style={{ display: "flex", justifyContent: "center" }}><FaTrash size={16} /></span></Button>
                                    </div>
                                </div>
                            </ListGroup.Item>
                            {!product.found ? <></> : <OverlayTrigger
                                key='top'
                                placement='top'
                                overlay={
                                    <Tooltip id='tooltip-top'>
                                        couldn't find product
                                    </Tooltip>
                                }
                            >
                                <span><FaExclamationTriangle /></span>
                            </OverlayTrigger>}
                        </div>
                    ))}
                </ListGroup>
                <div className={styles['submit-buttons']}>
                    <Button className={styles['main-button']} onClick={handleShow}>Add to cart</Button>
                    <Button className={styles['main-button']} onClick={handleShowListModal}>Add to My Lists</Button>
                </div>
            </div>

            <Modal show={showListNameModal} centered onHide={handleCloseListModal}>
                <Modal.Body>
                    Enter list name
                    <InputGroup onChange={(e) => setListName(e.target.value)} id="listName" className="mb-3">
                        <FormControl
                            placeholder="List name"
                            aria-label="Enter list name"
                            aria-describedby="Enter list name"
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button className={styles['main-button']} variant="secondary" onClick={handleCloseListModal}>
                        Close
                    </Button>
                    <Button className={styles['main-button']} variant="primary" onClick={() => createList(listName)}>
                        Done
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show} centered onHide={handleClose}>
                <Modal.Body>You will now be redirected to the supermarket's website...</Modal.Body>
                <Modal.Footer>
                    <Button className={styles['main-button']} variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button className={styles['main-button']} variant="primary" onClick={addToCart}>
                        I'm finished shopping
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}
