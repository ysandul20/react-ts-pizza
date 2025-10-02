import type { PizzaDataType } from "../../app/types";
import { useNavigate } from "react-router-dom";
import ButtonAddToCart from "../ui/ButtonAddToCart";

type PizzaCardProps = {
  pizzaData: PizzaDataType;
};

function PizzaCard({ pizzaData }: PizzaCardProps) {
  const { id, imageUrl, name, sizes, price, rating, types, ingredients } = pizzaData;
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
      <p className="pizza-block__ingredients">{ingredients.join(", ")}</p>

      <div className="pizza-block__bottom">
        <div className="pizza-block__price">from {price} $</div>
        <ButtonAddToCart onClick={() => navigate(`pizza/${id}/${sizes[0]}/${types[0]}`)}>Add to cart</ButtonAddToCart>
      </div>
    </div>
  );
}

export default PizzaCard;
