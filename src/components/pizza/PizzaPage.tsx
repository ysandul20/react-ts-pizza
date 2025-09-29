import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ButtonAddToCart from "../ui/ButtonAddToCart";
import { useEffect, useState } from "react";
import { fetchData } from "../../features/pizza/dataSlice";
import PizzaVariantSelector from "../ui/PizzaVariantSelector";
import Loader from "../loaders/Loader";
import { FaPlus } from "react-icons/fa6";
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

const typeLabels = ["thin", "classic"];

function PizzaPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { pizzas, isLoading } = useAppSelector((state) => state.data);
  const currentPizza = pizzas.find((pizza) => pizza.id === Number(id!));

  const [sizeOption, setSizeOption] = useState(currentPizza?.sizes[0] ?? 26);
  const [typeOption, setTypeOption] = useState(currentPizza?.types[0] ?? 0);

  useEffect(() => {
    dispatch(fetchData({ filterQuery: "", sortQuery: "" }));
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="pizza-page container">
        <Loader />
      </div>
    );

  if (!currentPizza) {
    return <div>Товар не знайдено</div>;
  }
  const { id: pizzaId, imageUrl, name, sizes, price, types, quantity, ingredients } = currentPizza;
  const priceWithType = calculatePizzaPriceByType(price, typeLabels[typeOption], types);
  const finalPrice = calculatePizzaPriceBySize(priceWithType, sizeOption);
  return (
    <div className="pizza-page container">
      {/* Left side: Image */}
      <div className="pizza-page__image">
        <img src={`/src/assets/images/${imageUrl}`} alt="Назва піци" />
      </div>

      {/* Right side: Details */}
      <div className="pizza-page__details">
        <h1>{name}</h1>
        <p className="pizza-page__ingredients">{ingredients.join(", ")}</p>

        <PizzaVariantSelector
          types={types}
          typeOption={typeOption}
          setTypeOption={setTypeOption}
          sizes={sizes}
          sizeOption={sizeOption}
          setSizeOption={setSizeOption}
          typeLabels={typeLabels}
        />
        <div className="pizza-page__price">
          <p>
            Final price for <strong>{typeLabels[typeOption]}</strong> dough, size <strong>{sizeOption} cm</strong>:
          </p>
          <span>{finalPrice} $</span>
        </div>

        <div className="pizza-page__bottom">
          <ButtonAddToCart
            onClick={() => {
              dispatch(
                addToCart({
                  id: pizzaId,
                  compositeId: createCombinedId(pizzaId, sizeOption, typeOption),
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
          </ButtonAddToCart>
        </div>
      </div>
    </div>
  );
}

export default PizzaPage;
