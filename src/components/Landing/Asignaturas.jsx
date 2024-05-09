import matematicas from "../../images/matematicas.png";
import english from "../../images/english.jpg";
import sociales from "../../images/sociales.png";
import Modal from "./Modal.jsx";
import Login from "../Modales/Login.jsx";
import Unete from "../Modales/Unete.jsx";
import NavBarInicio from "./NavBar/NavBarInicio.jsx";
import { Fragment } from "react";

const Asignaturas = (props) => {
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
        className="h-screen w-screen pt-80 md:pt-48 bg-gray-100 py-20 text-center px-20 text-gray-900"
        id="asignaturas"
      >
        <h2 className="text-4xl font-semibold my-5">ASIGNATURAS</h2>
        <p className="text-lg py-5">
          Algunas de las asignaturas se podran visualizar en este apartado con
          sus herramientas tecnologicas:
        </p>
        <div className="space-y-10">
          <div className="items-center shadow-md p-4">
            <div className="flex justify-center">
              <img src={matematicas} className="h-80 my-4" />
            </div>

            <h3 className="text-xl font-semibold p-3">Matemáticas</h3>
            <p className="p-2 text-base text-justify">
              Las matemáticas son una disciplina que se ocupa del estudio de los
              números, las estructuras, las propiedades y las relaciones
              cuantitativas. Esta materia abarca una amplia gama de conceptos,
              desde aritmética básica, álgebra, geometría, estadísticas hasta
              cálculo avanzado. Las matemáticas son fundamentales en la
              resolución de problemas en ciencias naturales, ingeniería,
              economía y muchas otras áreas.
            </p>
          </div>
          <div className="items-center shadow-md p-4">
            <div className="flex justify-center">
              <img src={english} className="h-80 my-4" />
            </div>

            <h3 className="text-xl font-semibold p-3">Inglés</h3>
            <p className="p-2 text-base text-justify">
              El inglés es un idioma ampliamente hablado en todo el mundo y es
              la lengua franca en muchos campos, incluyendo los negocios, la
              ciencia y la tecnología. El estudio del inglés abarca la
              gramática, la sintaxis, el vocabulario y las habilidades de
              comunicación oral y escrita. Además, la literatura inglesa también
              es una parte importante del currículo, lo que permite a los
              estudiantes explorar obras literarias de autores como William
              Shakespeare, Jane Austen y George Orwell.
            </p>
          </div>
          <div className="items-center shadow-md p-4">
            <div className="flex justify-center">
              <img src={sociales} className="h-80 my-4" />
            </div>

            <h3 className="text-xl font-semibold p-3">Ciencias Sociales</h3>
            <p className="p-2 text-base text-justify">
              Las ciencias sociales son un conjunto de disciplinas que se
              enfocan en el estudio de la sociedad y el comportamiento humano.
              Esto incluye áreas como la sociología, la psicología, la
              antropología, la economía y la política. Los estudiantes de
              ciencias sociales investigan temas como la cultura, la sociedad,
              la historia, la política, la economía y las interacciones humanas
              para comprender mejor cómo funcionan las sociedades y cómo las
              personas se relacionan entre sí.{" "}
            </p>
          </div>
        </div>
        <button
          className="text-xl uppercase bg-green-800 px-7 py-5 mt-5 text-white font-bold rounded-lg hover:bg-green-700"
          onClick={handleButton}
        >
          Ver más
        </button>
      </div>
    </Fragment>
  );
};

export default Asignaturas;
