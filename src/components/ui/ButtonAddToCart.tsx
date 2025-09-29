import { FaPlus } from "react-icons/fa6";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

function ButtonAddToCart({ children, onClick }: ButtonProps) {
  return (
    <button className="button button--outline button--add" onClick={onClick}>
      <FaPlus />
      {children}
    </button>
  );
}

export default ButtonAddToCart;
