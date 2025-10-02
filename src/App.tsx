import { Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import CartLayout from "./layouts/CartLayout";
import PizzaPage from "./components/pizza/PizzaPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="pizza/:id/:size/:type" element={<PizzaPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="cart" element={<CartLayout />} />
    </Routes>
  );
}

export default App;
