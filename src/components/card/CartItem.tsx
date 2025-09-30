import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";
// import { addToCart, deleteFromCart } from "../redux/slices/cartSlice";
import type { CartItemType } from "../../app/types";
import { useAppDispatch } from "../../app/hooks";
import { addToCart, deleteFromCart } from "../../features/cart/cartSlice";

type CartItemProps = {
  cartItemData: CartItemType;
};

function CartItem({ cartItemData }: CartItemProps) {
  const dispatch = useAppDispatch();

  const { id, imageUrl, name, sizeOption, typeOption, totalPrice, quantity } = cartItemData;
  const typeVariations = ["thin", "classic"];
  return (
    <div className="cart__item">
      <div className="cart__item-description">
        <div className="cart__item-img">
          <img className="pizza-block__image" src={`src/assets/images/${imageUrl}`} alt="Pizza" />
        </div>
        <div className="cart__item-info">
          <h3>{name}</h3>
          <p>
            {typeVariations[typeOption]}, {sizeOption} sm.
          </p>
        </div>
      </div>
      <div className="cart__item-count">
        <button onClick={() => dispatch(deleteFromCart(cartItemData))}>
          <CiCircleMinus className="button--circle" />
        </button>
        <span>{quantity}</span>
        <button onClick={() => dispatch(addToCart(cartItemData))}>
          <CiCirclePlus className="button--circle" />
        </button>
      </div>
      <div className="cart__item-price">{totalPrice} $</div>
      <button className="cart__item-remove" onClick={() => dispatch(deleteFromCart(cartItemData))}>
        <IoIosCloseCircle size={30} />
      </button>
    </div>
  );
}

export default CartItem;
