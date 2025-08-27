import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
// import { addToCart } from "../redux/slices/cartSlice";
import type { PizzaDataType } from "../../app/types";
import { useAppDispatch } from "../../app/hooks";
import { addToCart } from "../../features/cart/cartSlice";

const createCombinedId = (id: number, sizeOption: number, typeOption: number) => {
  return `${id.toString()}_${sizeOption.toString()}_${typeOption.toString()}`;
};
const calculatePizzaPriceByType = (price: number, type: string, types: number[]) => {
  if (types.length === 1) return price;
  else return type === "thin" ? price : price + 1;
};
const calculatePizzaPriceBySize = (price: number, size: number) => {
  if (size === 26) return price;
  else if (size === 30) return price + 3;
  else return price + 6;
};

const typeVariations = ["thin", "classic"];

type PizzaCardProps = {
  pizzaData: PizzaDataType;
};

function PizzaCard({ pizzaData }: PizzaCardProps) {
  const { id, imageUrl, name, sizes, price, rating, types, quantity } = pizzaData;
  const [sizeOption, setSizeOption] = useState(sizes[0]);
  const [typeOption, setTypeOption] = useState(types[0]);
  // const [currentPrice, setCurrentPrice] = useState(price);
  // console.log("current size option", sizeOption);
  const priceWithType = calculatePizzaPriceByType(price, typeVariations[typeOption], types);
  const finalPrice = calculatePizzaPriceBySize(priceWithType, sizeOption);

  const dispatch = useAppDispatch();

  return (
    <div className="pizza-block">
      <img src={`src/assets/images/${imageUrl}`} alt="Pizza" className="pizza-block__image" />
      <h3 className="pizza-block__title">{name}</h3>
      <h3 className="pizza-block__title">{rating}</h3>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type) => (
            <li key={type} className={typeOption === type ? "active" : ""} onClick={() => setTypeOption(type)}>
              {typeVariations[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size) => (
            <li key={size} className={sizeOption === size ? "active" : ""} onClick={() => setSizeOption(size)}>
              {size} cm.
            </li>
          ))}
        </ul>
      </div>
      <div className="">Current price: {finalPrice} $</div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">from {price} $</div>
        <button
          className="button button--outline button--add"
          onClick={() => {
            console.log("click");
            dispatch(
              addToCart({
                id,
                compositeId: createCombinedId(id, sizeOption, typeOption),
                imageUrl,
                name,
                price: finalPrice,
                totalPrice: finalPrice,
                sizeOption,
                typeOption,
                quantity,
              })
            );
          }}
        >
          <FaPlus />
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  );
}

export default PizzaCard;
