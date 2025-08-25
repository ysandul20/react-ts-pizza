import { useSearchParams } from "react-router-dom";

function PizzaCategories() {
   const [searchParams, setSearchParams] = useSearchParams();

   // const currentCategoryParam = searchParams.get("category") || 0;
   const currentCategoryParam: string = searchParams.get("category") ?? "0";

   function changeGategoryParam(value: string) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("category", value);
      setSearchParams(newParams);
   }
   const categories = [
      "All",
      "Meat",
      "Vegetarian",
      "Grilled",
      "Spicy",
      "Closed",
   ];
   return (
      <div className="categories">
         <ul>
            {categories.map((category, index) => (
               <li
                  key={category}
                  className={+currentCategoryParam === index ? "active" : ""}
                  onClick={() => {
                     changeGategoryParam(index.toString());
                  }}
               >
                  {category}
               </li>
            ))}
         </ul>
      </div>
   );
}

export default PizzaCategories;
