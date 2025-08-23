import PizzaCategories from "../components/pizza/PizzaCategories";
import PizzaList from "../components/pizza/PizzaList";
import Sort from "../components/pizza/Sort";

function Home() {
   return (
      <div className="container">
         <div className="content__top">
            <PizzaCategories />
            <Sort />
         </div>
         <h2 className="content__title">All Pizzas</h2>
         <PizzaList />
      </div>
   );
}

export default Home;
