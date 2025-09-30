import { Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import CartLayout from "./layouts/CartLayout";
import PizzaPage from "./components/pizza/PizzaPage";

// function TestPage() {
//   return (
//     <div className="grid-container">
//       <div className="grid-item">Lorem ipsum dolor sit amet.</div>
//       <div className="grid-item">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, veritatis!</div>
//       <div className="grid-item">3</div>
//     </div>
//   );
// }
function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<TestPage />} /> */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        {/* <Route path="pizza/:id" element={<PizzaPage />} /> */}
        <Route path="pizza/:id/:size/:type" element={<PizzaPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="cart" element={<CartLayout />} />
    </Routes>
  );
}

export default App;
