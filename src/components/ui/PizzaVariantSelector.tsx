type PizzaVariantSelectorProps = {
  types: number[];
  typeOption: number;
  setTypeOption: (value: number) => void;
  sizes: number[];
  sizeOption: number;
  setSizeOption: (value: number) => void;
  typeLabels: string[];
};

function PizzaVariantSelector({
  types,
  typeOption,
  setTypeOption,
  sizes,
  sizeOption,
  setSizeOption,
  typeLabels,
}: PizzaVariantSelectorProps) {
  return (
    <div className="pizza-block__selector">
      <p>Choose the dough type:</p>
      <ul>
        {types.map((type) => (
          <li key={type} className={typeOption === type ? "active" : ""} onClick={() => setTypeOption(type)}>
            {typeLabels[type]}
          </li>
        ))}
      </ul>
      <p>Choose the pizza size:</p>
      <ul>
        {sizes.map((size) => (
          <li key={size} className={sizeOption === size ? "active" : ""} onClick={() => setSizeOption(size)}>
            {size} cm.
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PizzaVariantSelector;
