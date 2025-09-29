import { useEffect } from "react";
import PizzaCard from "./PizzaCard";
import PizzaSkeleton from "../loaders/PizzaCardSkeleton";
import { fetchData } from "../../features/pizza/dataSlice";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

function PizzaList() {
  //TODO: Sort and filtering
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("category") ?? "0";
  const sortValue = searchParams.get("sortBy") || "rating desc";
  console.log("pizza list sort and filter", filterValue, sortValue);

  //TODO: Pizzas data
  const dispatch = useAppDispatch();
  const { pizzas, isLoading, error } = useAppSelector((state) => state.data);
  console.log(pizzas, isLoading, error);

  //TODO: Search field functional
  //  const searchValue = useSelector((state) => state.search.searchValue);

  useEffect(() => {
    const [value, order] = sortValue.split(" ");
    const filterQuery = filterValue !== "0" ? `category=${filterValue}` : "";
    //  const filterQuery = `category=${filterValue}`;
    const sortQuery = `sortBy=${value}&order=${order}`;
    dispatch(fetchData({ filterQuery, sortQuery }));
  }, [dispatch, filterValue, sortValue]);

  if (isLoading)
    return (
      <div className="content__items">
        {Array.from({ length: 6 }, (_, i) => (
          <PizzaSkeleton key={i} />
        ))}
      </div>
    );

  if (error) return <div className="content__items">{error}</div>;

  //  const filteredBySearchPizzaArr = pizzas.filter((item) =>
  //     item.name.toLowerCase().includes(searchValue.toLowerCase())
  //  );
  const filteredBySearchPizzaArr = pizzas;
  console.log(filteredBySearchPizzaArr, filteredBySearchPizzaArr.length);

  return (
    <div className="content__items">
      {!filteredBySearchPizzaArr.length ? (
        <span>No results for your query</span>
      ) : (
        filteredBySearchPizzaArr.length &&
        filteredBySearchPizzaArr.map((pizza) => <PizzaCard key={pizza.id} pizzaData={pizza} />)
      )}
    </div>
  );
}

export default PizzaList;

// async function getData() {
//   setIsLoading(true);
//   const filterQuery = +filterValue !== 0 ? `category=${filterValue}` : "";
//   const sortQuery = `sortBy=${sortParameters[0]}&order=${sortParameters[1]}`;
//   console.log("filter query", filterQuery);
//   // console.log("sortParam pizzalist", sortQuery);
//   // console.log(`${categoryQuery}${sortQuery}`);
//   try {
//     const res = await fetch(`https://67f176fec733555e24ad443e.mockapi.io/items?${filterQuery}&${sortQuery}`);
//     if (!res.ok) throw new Error("Failed to fetch data");
//     const data = await res.json();
//     // console.log("pizza data", data);
//     dispatch(changeData(data));
//   } catch (err) {
//     console.log(err);
//   } finally {
//     setIsLoading(false);
//   }
// }
