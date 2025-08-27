import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import CartItem from "../components/card/CartItem";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { cleanCart } from "../features/cart/cartSlice";

// const fakeOrdersData = [
//   {
//     id: 111,
//     imageUrl: "src/assets/images/pizza_1.png",
//     name: "PizzaName",
//     size: 30,
//     price: 45,
//     type: "classic",
//     quantity: 1,
//   },
// ];

function Cart() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartItemsQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartItemsPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  console.log("cartItems", cartItems);
  const dispatch = useAppDispatch();

  return (
    <div className="container--cart">
      <div className="cart">
        <Link to="/" className="button button--outline ">
          Go back
        </Link>
        {cartItems.length === 0 && (
          <div>
            <h2>Your cart is empty</h2>
            <img src="src/assets/images/empty-cart.png" alt="empty cart" />
          </div>
        )}

        {cartItems.length > 0 && (
          <>
            <div className="cart__top">
              <h2 className="content__title">
                <FaCartShopping />
                Cart
              </h2>
              <button className="cart__clear" onClick={() => dispatch(cleanCart())}>
                <FaTrashAlt />
                <span>Clean cart</span>
              </button>
            </div>
            <div className="content__items">
              {cartItems.map((cartItem) => (
                <CartItem key={cartItem.compositeId} cartItemData={cartItem} />
              ))}
            </div>

            <div className="cart__bottom">
              <div className="cart__bottom-details">
                <span>
                  Total pizzas: <b>{cartItemsQuantity} pcs.</b>
                </span>
                <span>
                  Order amount: <b>{cartItemsPrice} $</b>
                </span>
              </div>
              <div className="cart__bottom-buttons">
                <div className="button pay-btn">
                  <span>Pay now</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
