import { Link } from "react-router-dom";
import CartBtn from "../card/CartBtn";
// import CartBtn from "./CartBtn";
// import SearchInput from "./SearchInput";

// import { IoMenu } from "react-icons/io5";

function Header() {
  return (
    <header className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src="/pizza-logo.svg" alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>
                {/* <p className="hidden md:block"> */}
                the most delicious pizza in the universe
              </p>
            </div>
          </div>
        </Link>
        {/* <SearchInput /> */}
        <CartBtn />

        {/* <span className="md:hidden block">
               <IoMenu className="w-8 h-8" />
            </span> */}
      </div>
    </header>
  );
}

export default Header;
