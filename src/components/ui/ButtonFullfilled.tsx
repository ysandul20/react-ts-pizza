type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

function ButtonFullfilled({ children, onClick }: ButtonProps) {
  return (
    <button className="button button--fullfilled" onClick={onClick}>
      {children}
    </button>
  );
}

export default ButtonFullfilled;
