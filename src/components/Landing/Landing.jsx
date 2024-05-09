import { Fragment, useState } from "react";

import Modal from "./Modal.jsx";
import Login from "../Modales/Login.jsx";
import Unete from "../Modales/Unete.jsx";
import NavBarInicio from "./NavBar/NavBarInicio.jsx";
import "./Landing.css";

const Landing = (props) => {
  const { modal, setModal, login, setLogin, setLoginData } = props;

  const [navbar, setNavbar] = useState(false);

  const changeBg = () => {
    if (window.scrollY >= 60) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBg);

  const handleButton = () => {
    setModal(!modal);
    setLogin(false);
  };

  return (
    <Fragment>
      <NavBarInicio
        modal={modal}
        setModal={setModal}
        setLogin={setLogin}
        navbar={navbar}
      />
      <Modal modal={modal} setModal={setModal}>
        {login ? (
          <Login setModal={setModal} setLoginData={setLoginData} />
        ) : (
          <Unete setModal={setModal} />
        )}
      </Modal>
      <div
        className="h-full w-full lg:h-screen lg:w-screen bg-cover md:bg-center fondo grid grid-cols-1 lg:grid-cols-2 gap-14 pt-72 md:pt-52 px-16"
        id="inicio"
      >
        <iframe
          className="mt-10 lg:mt-0 lg:ml-6 w-72 md:w-full md:h-full"
          src="https://www.youtube.com/embed/Ae5n33PC2kk"
          title="12 herramientas educativas digitales para mejorar el aprendizaje 😀"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <div className="items-center">
          <p className="text-5xl text-center text-white font-semibold italic">
            «Tenemos que preparar a los estudiantes para su futuro, no para
            nuestro pasado» <br /> <span className="not-italic">Ian Jukes</span>{" "}
            <br />
            <button
              className={`mt-6 p-3 text-lg bg-transparent border-2 font-bold hover:border-gray-300 hover:text-gray-300`}
              onClick={handleButton}
            >
              Unete
            </button>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Landing;
