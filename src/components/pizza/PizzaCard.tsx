import { useState } from "react";
// import { addToCart } from "../redux/slices/cartSlice";
import type { PizzaDataType } from "../../app/types";
import { useAppDispatch } from "../../app/hooks";
import { addToCart } from "../../features/cart/cartSlice";
import ButttonAddToCart from "../ui/ButtonAddToCart";
import { Link, useNavigate } from "react-router-dom";
import PizzaVariantSelector from "../ui/PizzaVariantSelector";
import { FaPlus } from "react-icons/fa6";
import ButtonAddToCart from "../ui/ButtonAddToCart";

// const createCombinedId = (id: number, sizeOption: number, typeOption: number) => {
//   return `${id.toString()}_${sizeOption.toString()}_${typeOption.toString()}`;
// };
// const calculatePizzaPriceByType = (price: number, type: string, types: number[]) => {
//   if (types.length === 1) return price;
//   else return type === "thin" ? price : price + 1;
// };
// const calculatePizzaPriceBySize = (price: number, size: number) => {
//   if (size === 26) return price;
//   else if (size === 30) return price + 3;
//   else return price + 6;
// };

const typeLabels = ["thin", "classic"];

type PizzaCardProps = {
  pizzaData: PizzaDataType;
};

function PizzaCard({ pizzaData }: PizzaCardProps) {
  const { id, imageUrl, name, sizes, price, rating, types, quantity, ingredients } = pizzaData;
  // const [sizeOption, setSizeOption] = useState(sizes[0]);
  // const [typeOption, setTypeOption] = useState(types[0]);

  // const priceWithType = calculatePizzaPriceByType(price, typeLabels[typeOption], types);
  // const finalPrice = calculatePizzaPriceBySize(priceWithType, sizeOption);

  // const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="pizza-block">
      <div className="pizza-block__image-wrapper">
        <img
          src={`src/assets/images/${imageUrl}`}
          alt="Pizza"
          className="pizza-block__image"
          onClick={() => navigate(`pizza/${id}/${sizes[0]}/${types[0]}`)}
        />
        <h3 className="pizza-block__rating">{rating}</h3>
      </div>
      <h3 className="pizza-block__title">{name}</h3>
      {/* <h3 className="pizza-block__title">{rating}</h3> */}
      <p className="pizza-block__ingredients">{ingredients.join(", ")}</p>
      {/* <PizzaVariantSelector
        types={types}
        typeOption={typeOption}
        setTypeOption={setTypeOption}
        sizes={sizes}
        sizeOption={sizeOption}
        setSizeOption={setSizeOption}
        typeLabels={typeLabels}
      /> */}
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">from {price} $</div>
        {/* <div className="pizza-block__price">Price: {finalPrice} $</div> */}
        {/* <ButttonAddToCart
          onClick={() => {
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
                ingredients,
              })
            );
          }}
        >
          Add to cart
        </ButttonAddToCart> */}
        <ButtonAddToCart onClick={() => navigate(`pizza/${id}/${sizes[0]}/${types[0]}`)}>Add to cart</ButtonAddToCart>
      </div>
    </div>
  );
}

export default PizzaCard;
