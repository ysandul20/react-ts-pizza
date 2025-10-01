import { useNavigate } from "react-router-dom";
import ButtonFullfilled from "../components/ui/ButtonFullfilled";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <section className="not-found">
        <h1>404</h1>
        <p className="not-found__subtitle">Oops! Page not found</p>
        <p className="not-found__text">
          It looks like the page you are looking for no longer exists or has been moved.
        </p>
        <ButtonFullfilled onClick={() => navigate("/")}>Go to main</ButtonFullfilled>
      </section>
    </div>
  );
}

export default NotFound;
