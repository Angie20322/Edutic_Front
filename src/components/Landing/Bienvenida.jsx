import Bienvenida1 from "../../images/bienvenida1.jpg";
import Bienvenida2 from "../../images/bienvenida2.jpg";
import Bienvenida3 from "../../images/bienvenida3.jpg";
import Modal from "./Modal.jsx";
import Login from "../Modales/Login.jsx";
import Unete from "../Modales/Unete.jsx";
import NavBarInicio from "./NavBar/NavBarInicio.jsx";
import { Fragment } from "react";

const Bienvenida = (props) => {
  const { modal, setModal, login, setLogin, setLoginData, navbar } = props;
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
        className="h-screen w-screen pt-72 lg:pt-40 px-16 mb-6"
        id="bienvenida"
      >
        {" "}
        <h1 className="text-center my-16 text-3xl font-bold uppercase">
          ¡BIENVENIDO!
        </h1>
        <div className="space-y-5 text-center">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            <div className="rounded-lg">
              <img src={Bienvenida1} alt="imagen Bienvenida1" />
            </div>
            <div className="rounded-lg lg:col-span-2 p-4">
              <h2 className="text-xl font-semibold my-3">¿Quiénes somos?</h2>
              <p className="p-3 font-base">
                Somos estudiantes de Ingeniería de Sistemas y hemos desarrollado
                un aplicativo web con el objetivo de proporcionar a los
                profesores un espacio centralizado donde puedan descubrir y
                acceder a diversas herramientas tecnológicas para motivar a sus
                estudiantes durante las clases. Nuestra plataforma busca
                facilitar el proceso de integración de tecnología en el aula,
                brindando opciones innovadoras que enriquezcan la experiencia de
                aprendizaje.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            <div className=" rounded-lg lg:col-span-2">
              <h2 className="text-xl font-semibold my-3">Reseña</h2>
              <p className="p-3 font-base">
                Un aplicativo que consolide herramientas tecnológicas en el
                ámbito educativo puede transformar la experiencia de aprendizaje
                y enseñanza, haciéndola más eficiente, accesible y
                personalizada.  
              </p>
            </div>
            <div className="rounded-lg">
              <img src={Bienvenida2} alt="imagen Bienvenida1" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            <div className="hidden rounded-lg lg:block">
              <img src={Bienvenida3} alt="imagen Bienvenida1" />
            </div>
            <div className="rounded-lg lg:col-span-2 p-4">
              <h2 className="text-xl font-semibold my-3">Objetivo</h2>
              <p className="p-3 font-base">
                Consolidar la información sobre el uso de herramientas
                tecnológicas en educación media de Ubaté y Sabana Centro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Bienvenida;
