import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
function CartBtn() {
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartItemsQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartItemsPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  // console.log("header", cartItemsPrice, cartItemsQuantity);
  return (
    <div className="header__cart">
      <button className="button button--cart" onClick={() => navigate("cart")}>
        <span>{cartItemsPrice}$</span>
        <div className="button__delimiter"></div>
        <FaCartShopping />
        <span>{cartItemsQuantity}</span>
      </button>
    </div>
  );
}

export default CartBtn;
