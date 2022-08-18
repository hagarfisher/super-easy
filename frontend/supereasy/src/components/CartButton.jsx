import Button from 'react-bootstrap/Button';
// import { EmptyCart } from "../types/EmptyCart";i

export default function CartButton({ createCart }) {


  return (
    <div>
      <Button onClick={(e) => createCart()} id="createCart">Start Shopping</Button>
    </div>
  )
}