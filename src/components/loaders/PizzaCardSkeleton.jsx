import ContentLoader from "react-content-loader";

const PizzaCardSkeleton = (props) => (
   <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={450}
      viewBox="0 0 280 450"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      // style={{ width: "100%", height: "auto" }} // 👈 адаптивність
      {...props}
   >
      <rect x="10" y="0" rx="10" ry="10" width="260" height="260" />
      <rect x="10" y="270" rx="0" ry="0" width="260" height="30" />
      <rect x="10" y="310" rx="0" ry="0" width="260" height="80" />
      <rect x="10" y="415" rx="0" ry="0" width="100" height="30" />
      <rect x="140" y="410" rx="20" ry="20" width="130" height="40" />
   </ContentLoader>
);

export default PizzaCardSkeleton;
