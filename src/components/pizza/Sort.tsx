import { useEffect, useRef, useState } from "react";
import { HiChevronUp } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";

function Sort() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownRef = useRef();
  const sortOptions = [
    { option: "rating desc", label: "Popular" },
    { option: "price asc", label: "Price (Low to High)" },
    { option: "price desc", label: "Price (High to Low)" },
    { option: "name asc", label: "Alphabet (A-Z)" },
    { option: "name desc", label: "Alphabet (Z-A)" },
  ];
  const sortValue = searchParams.get("sortBy") || "rating desc";
  // console.log(sortValue, "sortValue");

  const currentSortOption = sortOptions.find((item) => item.option === sortValue);
  // console.log("currentSortOption", currentSortOption);

  function handleChange(value) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("sortBy", value);
    setSearchParams(newSearchParams);
  }

  function handleClickOutside(e) {
    // console.log(e.target, dropdownRef.current.contains(e.target));
    if (!dropdownRef.current.contains(e.target)) {
      console.log("click outside");
      setIsOpen(false);
    }
  }

  useEffect(() => {
    // console.log("component mount");
    document.addEventListener("click", handleClickOutside);
    return () => {
      // console.log("component unmount");
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div ref={dropdownRef} className="sort">
        <div className="sort__label" onClick={() => setIsOpen((cur) => !cur)}>
          <HiChevronUp />
          <b>Sort by:</b>
          <span>{currentSortOption.label}</span>
        </div>
        {isOpen && (
          <div className="sort__popup">
            <ul>
              {sortOptions.map((sortOption) => (
                <li
                  key={sortOption.label}
                  className={sortOption.option === currentSortOption.option ? "active" : ""}
                  onClick={() => {
                    handleChange(sortOption.option);
                    setIsOpen((cur) => !cur);
                  }}
                >
                  {sortOption.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Sort;

{
  /* <div className="sort">
  <label className="sort__label">Sort by:</label>
  <select id="fruits" name="fruits" className="sort__select">
    <option value="Popular">Popular</option>
    <option value="banana">Price (High to Low)</option>
    <option value="orange">Alphabet (A-Z)</option>
    <option value="grape">Grape</option>
  </select>
</div> */
}

// { option: "rating", order: "desc", label: "Popular" },
// { option: "price", order: "asc", label: "Price (Low to High)" },
// { option: "price", order: "desc", label: "Price (High to Low)" },
// { option: "name", order: "asc", label: "Alphabet (A-Z)" },
// { option: "name", order: "desc", label: "Alphabet (Z-A)" },
