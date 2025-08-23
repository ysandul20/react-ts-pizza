import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function AppLayout() {
   return (
      <div className="container">
         <div className="wrapper">
            <Header />

            <div className="content">
               <Outlet />
            </div>
         </div>
      </div>
   );
}

export default AppLayout;
