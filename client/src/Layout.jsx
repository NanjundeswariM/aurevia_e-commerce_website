import { Outlet } from "react-router-dom";
import HeroBar from "./HeroBar";
import Footer from "./Footer";

function Layout() {
  return (
    <>
      <HeroBar />
      <main style={{ marginTop: "8vh", minHeight: "92vh" }}>
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}

export default Layout;