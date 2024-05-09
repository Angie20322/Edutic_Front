import { FaUserCircle, FaPen } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useContext, useState } from "react";

import { CRMContext } from "../../../../context/CRMContext.jsx";
import Sidebar from "../../Principal/Sidebar.jsx";
import Modal from "../../../Landing/Modal.jsx";
import EditarFoto from "./EditarFoto.jsx";
import { usuarioById } from "../../../../redux/actions.js";
import Spinner from "../../../Layout/Spinner.jsx";
import CambiarDatos from "./CambiarDatos.jsx";
import CambiarPassword from "./CambiarPassword.jsx";

const Perfil = (props) => {
  const dispatch = useDispatch();
  const [datos, setDatos] = useState(false);
  const [password, setPassword] = useState(false);
  const { open, setOpen, loginData, modal, setModal } = props;
  const [auth] = useContext(CRMContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(usuarioById(loginData.usuario.id, auth))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, loginData.usuario.id, auth]);

  let usuario = useSelector((state) => state.usuario);

  const renderFotoPerfil = () => {
    if (usuario.imagen) {
      return (
        <img
          src={usuario.imagen}
          alt="Foto de perfil"
          className="w-44 h-44 rounded-full object-cover mx-auto"
        />
      );
    } else {
      return <FaUserCircle className="w-44 h-44 text-gray-500 mx-auto" />;
    }
  };

  const editarButton = () => {
    setModal(!modal);
    setDatos(true);
    setPassword(false);
  };

  const cambiarButton = () => {
    setModal(!modal);
    setDatos(false);
    setPassword(false);
  };
  const cambiarPass = () => {
    setModal(!modal);
    setDatos(false);
    setPassword(true);
  };

  if (!auth.auth) {
    return <Navigate to={"/"} />;
  }

  if (loginData.usuario === undefined) {
    return <Navigate to={"/"} />;
  }

  const funcionModal = () => {
    if (datos) {
      return (
        <EditarFoto setModal={setModal} usuarioId={usuario.id} auth={auth} />
      );
    } else {
      if (password) {
        return <CambiarPassword
          setModal={setModal}
          usuarioId={usuario.id}
        />;
      } else {
        return (
          <CambiarDatos
            setModal={setModal}
            usuarioId={usuario.id}
            auth={auth}
          />
        );
      }
    }
  };
  return (
    <div className="flex">
      <Sidebar open={open} setOpen={setOpen} loginData={loginData} />
      <Modal modal={modal} setModal={setModal}>
        {funcionModal()}
      </Modal>
      <div className="md:p-3 text-center lg:col-span-3 xl:col-span-5 bg-gray-100 h-screen w-screen overflow-y-scroll">
        <div>
          <div className="text-left">
            <div className="text-basic py-3 text-gray-900">
              {loading ? (
                <Spinner />
              ) : (
                <div className="grid grid-cols-1 gap-6 md:mx-10">
                  <h1 className="font-bold text-4xl text-green-800 py-6 text-center">
                    Perfil de Usuario
                  </h1>
                  <div className="flex flex-col mx-3 md:mx-0 md:flex-row">
                    <div className="flex flex-col items-center md:w-3/12 ml-20 md:ml-0">
                      <div>{renderFotoPerfil()}</div>
                      <button
                        className="w-[100px] m-2 p-3 bg-gray-400 hover:bg-gray-300 hover:underline flex"
                        onClick={editarButton}
                      >
                        <FaPen className="mr-1" />
                        Editar
                      </button>
                    </div>
                    <div className="text-xl md:w-7/12">
                      <div className="p-3 bg-neutral-300">
                        <p className="text-4xl font-semibold">
                          {usuario.nombre} {usuario.apellido}
                        </p>
                        <p>
                          <span className="text-green-800 font-semibold">
                            Email:
                          </span>{" "}
                          {usuario.email}
                        </p>
                        <p>
                          <span className="text-green-800 font-semibold">
                            Teléfono:
                          </span>{" "}
                          {usuario.telefono}
                        </p>
                        <p>
                          <span className="text-green-800 font-semibold">
                            Departamento:
                          </span>{" "}
                          {usuario.departamento}
                        </p>
                        <p>
                          <span className="text-green-800 font-semibold">
                            Ciudad:
                          </span>{" "}
                          {usuario.ciudad}
                        </p>
                      </div>

                      <div className="p-3 bg-neutral-300 mt-4">
                        <p className="text-basic mt-4 font-semibold">
                          Información adicional:
                        </p>
                        <p>
                          <span className="text-green-800 font-semibold">
                            Razón social:
                          </span>{" "}
                          {usuario.colegio}
                        </p>
                        <p>
                          <span className="text-green-800 font-semibold">
                            Nit:
                          </span>{" "}
                          {usuario.nit}
                        </p>
                        <p>
                          <span className="text-green-800 font-semibold">
                            Dirección:
                          </span>{" "}
                          {usuario.direccion}
                        </p>
                        <p>
                          <span className="text-green-800 font-semibold">
                            Cargo:
                          </span>{" "}
                          {usuario.cargo}
                        </p>
                        <p>
                          <span className="text-green-800 font-semibold">
                            Materia:
                          </span>{" "}
                          {usuario.materia}
                        </p>
                        {usuario.enfasis && (
                          <p>
                            <span className="text-green-800 font-semibold">
                              Enfásis:
                            </span>{" "}
                            {usuario.enfasis}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col md:flex-row md:justify-around mt-3 text-white font-bold">
                        <button
                          className="bg-blue-700 hover:bg-blue-600 p-3 my-3 md:my-0 rounded-md"
                          onClick={cambiarPass}
                        >
                          Cambiar Contraseña
                        </button>
                        <button
                          className="bg-emerald-700 hover:bg-emerald-600 p-3 my-3 md:my-0 rounded-md"
                          onClick={cambiarButton}
                        >
                          Cambiar datos
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
