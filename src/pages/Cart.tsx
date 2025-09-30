import { Link, useNavigate } from "react-router-dom";
import { FaCartShopping, FaTrash } from "react-icons/fa6";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import CartItem from "../components/card/CartItem";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { cleanCart } from "../features/cart/cartSlice";
import { SlClose } from "react-icons/sl";
import { IoPizza } from "react-icons/io5";
import ButtonFullfilled from "../components/ui/ButtonFullfilled";
import { IoIosCloseCircle } from "react-icons/io";

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
  const navigate = useNavigate();

  return (
    <div className="container--cart">
      <div className="cart">
        <button className="cart__button-close" onClick={() => navigate(-1)}>
          <IoIosCloseCircle />
        </button>
        {cartItems.length === 0 && (
          <div className="cart__empty">
            <h2>Your cart is empty</h2>
            <p>Looks like you haven’t added any pizzas yet.</p>
            <img src="src/assets/images/empty-cart.png" alt="empty cart" />
            <ButtonFullfilled onClick={() => navigate("/")}>
              <IoPizza />
              <p>Go to menu</p>
            </ButtonFullfilled>
          </div>
        )}

        {cartItems.length > 0 && (
          <>
            <div className="cart__top">
              <h2 className="content__title">
                <FaCartShopping />
                Cart
              </h2>
            </div>
            <div className="content__items">
              {cartItems.map((cartItem) => (
                <CartItem key={cartItem.compositeId} cartItemData={cartItem} />
              ))}
            </div>

            {/* <div className="cart__bottom">
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
                <button className="cart__clear" onClick={() => dispatch(cleanCart())}>
                  <FaTrashAlt />
                  <span>Clean cart</span>
                </button>
              </div>
            </div> */}
            <div className="cart-footer">
              <div className="cart-footer__info">
                <p>
                  You have <b>{cartItemsQuantity} pizzas</b> in your cart with a total amount of{" "}
                  <b>{cartItemsPrice} $</b>.
                </p>
                <span className="cart-footer__hint">🚚 Free delivery on orders over 500 $</span>
              </div>

              <div className="cart-footer__buttons">
                <button className="button btn-outline" onClick={() => dispatch(cleanCart())}>
                  <FaTrash /> <p>Clear</p>
                </button>
                <ButtonFullfilled onClick={() => console.log("Order placed")}>
                  <FaShoppingCart /> <p>Order</p>
                </ButtonFullfilled>
              </div>
            </div>
            {/* <div className="cart__summary">
                <div className="cart__summary-text">
                  <span>
                    Total pizzas: <b>{cartItemsQuantity} pcs.</b>
                  </span>
                  <span>
                    Order amount: <b>{cartItemsPrice} $</b>
                  </span>
                </div>
                <div className="cart__summary-buttons">
                  <button className="btn btn--clear" onClick={() => dispatch(cleanCart())}>
                    Clear Cart
                  </button>
                  <button className="btn btn--pay">Pay Now</button>
                </div>
              </div> */}
            {/* <div class="order-summary-minimal">
              {" "}
              <h2>Order Summary</h2>{" "}
              <div class="order-details">
                {" "}
                <div>
                  {" "}
                  <span class="label">Total Pizzas</span> <span class="value">4 pcs.</span>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <span class="label">Order Amount</span> <span class="value price">$102</span>{" "}
                </div>{" "}
              </div>{" "}
              <p class="note">* Delivery cost is not included.</p>{" "}
              <div class="buttons">
                {" "}
                <button class="checkout-btn">Proceed to Payment</button> <button class="clean-btn">Clean Cart</button>{" "}
              </div>{" "}
            </div> */}
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
