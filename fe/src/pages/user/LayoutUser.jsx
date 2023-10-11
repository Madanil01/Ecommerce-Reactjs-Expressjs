import React from "react";
import CardProduct from "../../components/CardProduct";
import FooterComponent from "../../components/FooterComponent";
import NavbarComponent from "../../components/NavbarUser";

const LayoutUser = ({ children }) => {
  return (
    <React.Fragment>
      <NavbarComponent />
      <div className="container md:min-h-[50rem]">
        <main>{children}</main>
      </div>
      <FooterComponent/>
    </React.Fragment>
  );
};

export default LayoutUser;
