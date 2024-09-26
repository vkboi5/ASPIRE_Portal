import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
// import Resources from "@/pages/Resources/Resources";
// import Networks from "@/pages/Networks/Networks";
const PublicLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      {/* <Resources />
      <Networks /> */}
    </div>
  );
};

export default PublicLayout;
