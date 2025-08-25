import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
// import { addToCart } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import type { PizzaDataType } from "../../app/types";

type PizzaCardProps = {
   pizzaData: PizzaDataType;
};

function PizzaCard({ pizzaData }: PizzaCardProps) {
   const { id, imageUrl, name, sizes, price, rating, types, quantity } =
      pizzaData;
   const [sizeOption, setSizeOption] = useState(sizes[0]);
   const [typeOption, setTypeOption] = useState(types[0]);

   const dispatch = useDispatch();

   const typeVariations = ["thin", "classic"];
   return (
      <div className="pizza-block">
         <img
            src={`src/assets/images/${imageUrl}`}
            alt="Pizza"
            className="pizza-block__image"
         />
         <h3 className="pizza-block__title">{name}</h3>
         <h3 className="pizza-block__title">{rating}</h3>
         <div className="pizza-block__selector">
            <ul>
               {types.map((type) => (
                  <li
                     key={type}
                     className={typeOption === type ? "active" : ""}
                     onClick={() => setTypeOption(type)}
                  >
                     {typeVariations[type]}
                  </li>
               ))}
            </ul>
            <ul>
               {sizes.map((size) => (
                  <li
                     key={size}
                     className={sizeOption === size ? "active" : ""}
                     onClick={() => setSizeOption(size)}
                  >
                     {size} cm.
                  </li>
               ))}
            </ul>
         </div>
         <div className="pizza-block__bottom">
            <div className="pizza-block__price">from {price} $</div>
            <button
               className="button button--outline button--add"
               onClick={() => {
                  console.log("click");
                  // dispatch(addToCart({ id, imageUrl, name, price, sizeOption, typeOption, quantity }));
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
