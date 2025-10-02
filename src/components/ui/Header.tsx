import { Link } from "react-router-dom";
import CartBtn from "../card/CartBtn";

function Header() {
  return (
    <header className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src="/images/pizza-logo.svg" alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>the most delicious pizza in the universe</p>
            </div>
          </div>
        </Link>
        {/* <SearchInput /> */}
        <CartBtn />
      </div>
    </header>
  );
}

export default Header;
