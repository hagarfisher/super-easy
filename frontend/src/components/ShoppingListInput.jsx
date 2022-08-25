import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useState } from "react";
import { Form, Badge, ListGroup, Col, Row, FormControl, Button, InputGroup } from 'react-bootstrap';


// interface Props {
//   cartId: string;
// }

export default function ShoppingListInput() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productQuantity, setQuantity] = useState(0);
  const { getAccessTokenSilently } = useAuth0();

  async function addProduct() {
    setProducts([...products, { name: productName, quantity: productQuantity }]);
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
  }
  return (
    <div>
      <Row className="mb-3">
        <Col>
          <InputGroup id="productName" onChange={(e) => setProductName(e.target.value)} className="mb-3">
            <FormControl
              placeholder="Enter product name"
              aria-label="Enter product name"
              aria-describedby="Enter product name"
            />
          </InputGroup>
        </Col>
        <Col>
          <InputGroup id="productQuantity" onChange={(e) => setQuantity(e.target.value)} className="mb-3">
            <FormControl
              type="number"
              step="0.1"
              placeholder="Enter product quantity"
              aria-label="Enter product quantity"
              aria-describedby="Enter product quantity"
            />
          </InputGroup>
        </Col>
        <Col>
          <Button onClick={() => addProduct()} id="addProduct">Add product</Button>
        </Col>
      </Row>
      <ListGroup variant="flush" >
        {products.map((product, index) => (
          <ListGroup.Item key={product.name} as="li" className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <Badge bg="primary" pill>
                {product.quantity}
              </Badge>
            </div>
            {product.name}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Row>
        <Button onClick={() => addToCart()}>Add to cart</Button>
      </Row>

      {/* <input onChange={(e) => setProductName(e.target.value)} type="text" id="productName" placeholder="Enter product name" />
      <input onChange={(e) => setQuantity(+e.target.value)} type="number" id="productQuantity" placeholder="Enter product quantity" /> */}

      <div>
        <a href="https://www.primadonaonline.co.il/cart/summary" rel="noreferrer" target="_blank">Go to Primadona</a>
      </div>
    </div>
  )
}

