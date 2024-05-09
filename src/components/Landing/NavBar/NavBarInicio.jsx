import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import logo1 from "../../../images/logo1.png";
import logo2 from "../../../images/logo2.png";

const NavBarInicio = (props) => {
  const { modal, setModal, setLogin, navbar } = props;

  const handleChange = () => {
    setModal(!modal);
    setLogin(true);
  };

  return (
    <header
      className={`py-8 px-8 fixed w-full font-semibold ${
        navbar ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex flex-wrap p-5 flex-col lg:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src={navbar ? logo1 : logo2} className="h-14 md:h-20" />
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/" spy={true} smooth={true} offset={-50} duration={500}>
            <p
              className={`mr-5 transition cursor-pointer hover:border-b-2 active:border-b-2 ${
                navbar
                  ? "hover:border-green-800 active:border-green-800"
                  : "hover:border-yellow-100 text-yellow-100 active:border-yellow-100"
              } `}
            >
              INICIO
            </p>
          </Link>

          <Link
            to="/bienvenida"
            spy={true}
            smooth={true}
            offset={-135}
            duration={500}
          >
            <p
              className={`mr-5 transition cursor-pointer hover:border-b-2 active:border-b-2 ${
                navbar
                  ? "hover:border-green-800 active:border-green-800"
                  : "hover:border-yellow-100 text-yellow-100 active:border-yellow-100"
              } `}
            >
              BIENVENIDA
            </p>
          </Link>

          <Link
            to="/herramientas"
            spy={true}
            smooth={true}
            offset={-135}
            duration={500}
          >
            <p
              className={`mr-5 transition cursor-pointer hover:border-b-2 active:border-b-2 ${
                navbar
                  ? "hover:border-green-800 active:border-green-800"
                  : "hover:border-yellow-100 text-yellow-100 active:border-yellow-100"
              } `}
            >
              ESTADISTICAS
            </p>
          </Link>

          <Link
            to="/asignaturas"
            spy={true}
            smooth={true}
            offset={-135}
            duration={500}
          >
            <p
              className={` mr-5 transition cursor-pointer hover:border-b-2 active:border-b-2 ${
                navbar
                  ? "hover:border-green-800 active:border-green-800"
                  : "hover:border-yellow-100 text-yellow-100 active:border-yellow-100"
              } `}
            >
              ASIGNATURAS
            </p>
          </Link>

          <NavLink
            to="https://www.facebook.com/FacultadIngenieriaUCundinamarca/"
            target="_blank"
          >
            <p
              className={`mr-5 transition cursor-pointer hover:border-b-2 active:border-b-2 ${
                navbar
                  ? "hover:border-green-800 active:border-green-800"
                  : "hover:border-yellow-100 text-yellow-100 active:border-yellow-100"
              } `}
            >
              Facebook
            </p>
          </NavLink>
        </nav>
        <button
          className={`cursor-pointer p-5 rounded-md text-lg font-bold ${
            navbar
              ? "bg-green-800 text-white hover:bg-green-700"
              : "bg-transparent text-yellow-100 border-yellow-100 border-2 hover:border-white hover:text-white"
          } `}
          onClick={handleChange}
        >
          Ingresar
        </button>
      </div>
    </header>
  );
};

export default NavBarInicio;
