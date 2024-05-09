import analytics from "../../images/analytics.png";
import Modal from "./Modal.jsx";
import Login from "../Modales/Login.jsx";
import Unete from "../Modales/Unete.jsx";
import NavBarInicio from "./NavBar/NavBarInicio.jsx";
import { Fragment } from "react";

const Herramientas = (props) => {
  const { modal, setModal, login, setLogin, setLoginData, navbar } = props;

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
        className="h-screen w-screen pt-72 md:pt-[400px] px-16 block md:flex justify-around text-gray-900 text-left gap-20 items-center"
        id="herramientas"
      >
        <div className="w-1/2 py-5">
          <h2 className="text-4xl my-3 font-bold">ESTADÍSTICAS GENERALES</h2>
          <div className="flex flex-col">
            <p className="font-basic text-lg">
              {`Con mi mentoría entenderás mejor como y donde poner tu tiempo y
        energía. Pensarás estratégicamente sobre como gestionar tu carrera, tu
        hogar y tu vida, sintíendote en control y enfocándote en lo
        verdaderamente importante. Tal vez tengas una idea para un negocio
        nuevo, o simplemente sabes que quieres trabajar para ti mismo pero no
        sabes "en qué". Cualquiera sea el caso, estaré encantada de esclarecer
        tus objetivos y ayudarte a comenzar el camino hacia convertirte en un
        emprendedor.`}
            </p>
            <button
              className="p-4 my-5 bg-green-800 text-white hover:bg-green-700 font-bold text-lg"
              onClick={handleButton}
            >
              Editar estadísticas
            </button>
          </div>
        </div>
        <div className="hidden md:block w-1/2 py-5 space-y-6">
          <img src={analytics} className="h-[280px]" />
          <img src={analytics} className="h-[280px]" />
        </div>
      </div>
    </Fragment>
  );
};

export default Herramientas;
