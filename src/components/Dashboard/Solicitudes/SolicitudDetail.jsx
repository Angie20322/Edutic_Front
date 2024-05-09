import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useContext, useState, Fragment } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FiCheckCircle, FiXCircle, FiArrowLeft } from "react-icons/fi";

import { deleteSolicitud, solicitudById } from "../../../redux/actions.js";
import { CRMContext } from "../../../context/CRMContext.jsx";
import Nav from "../Nav-Pag/Nav.jsx";
import Spinner from "../../Layout/Spinner.jsx";
import clienteAxios from "../../../config/axios.js";

const SolicitudDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auth] = useContext(CRMContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(solicitudById(id, auth))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, id, auth]);

  let userSolicitud = useSelector((state) => state.solicitud);

  const cancelarButton = () => {
    navigate("/dashboard/");
  };

  const confirmarMiembro = async (datos) => {
    try {
      const res = await clienteAxios.post(
        "/usuarios/registrar",
        datos,
        {
          headers: {
            Authorization: `Bearer ${auth.jwtToken}`,
          },
        }
      );
      return res;
    } catch (error) {
      const res = error;
      return res;
    }
  };

  const aceptarButton = async () => {
    const resultado = await confirmarMiembro(userSolicitud);
    if (resultado.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Solicitud enviada",
        text: `Se ha aceptado a ${userSolicitud.nombre} ${userSolicitud.apellido}`,
      });
      navigate("/dashboard");
    } else {
      Swal.fire({
        icon: "error",
        title: "Error en la solicitud",
        text: resultado.response.data.error,
      });
    }
  };

  const eliminarButton = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-green-500 p-2 m-3 text-white rounded-md",
        cancelButton: "bg-red-500 p-2 m-3 text-white rounded-md",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "¿Estás seguro?",
        text: "Una vez rechazada, se eliminará la solicitud",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, rechazar",
        cancelButtonText: "No, cancelar",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteSolicitud(id, auth));
          swalWithBootstrapButtons.fire({
            title: "Rechazado",
            text: "El usuario ha sido rechazado",
            icon: "success",
          });
          navigate("/dashboard");
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Abortado",
            text: "El procedimiento ha sido abortado",
            icon: "question",
          });
        }
      });
  };

  return (
    <div className="min-h-full">
      <Nav />
      <div className="flex flex-col h-screen p-20">
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 ">
              <h2 className="text-4xl font-bold text-green-800">
                Perfil de solicitud
              </h2>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded focus:outline-none flex items-center"
                  onClick={aceptarButton}
                >
                  <FiCheckCircle className="mr-1" /> Aceptar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded focus:outline-none flex items-center"
                  onClick={eliminarButton}
                >
                  <FiXCircle className="mr-1" /> Rechazar
                </button>
                <button
                  className="text-gray-600 hover:text-gray-800 focus:outline-none flex items-center"
                  onClick={cancelarButton}
                >
                  <FiArrowLeft className="mr-1" /> Volver
                </button>
              </div>
            </div>
            <div className="flex flex-col p-4">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  {userSolicitud.nombre} {userSolicitud.apellido}
                </h2>
                <p className="text-gray-600">{userSolicitud.email}</p>
                <p className="text-gray-600">{userSolicitud.telefono}</p>
                <p className="text-gray-600">
                  <span className="font-semibold">Departamento:</span>{" "}
                  {userSolicitud.departamento}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Ciudad:</span>{" "}
                  {userSolicitud.ciudad}
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Razón social</h3>
                <p className="text-gray-600">{userSolicitud.colegio}</p>
                <p className="text-gray-600">
                  <span className="font-semibold">Nit:</span>{" "}
                  {userSolicitud.nit}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Cargo:</span>{" "}
                  {userSolicitud.cargo}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Materia interés:</span>{" "}
                  {userSolicitud.materia}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Dirección:</span>{" "}
                  {userSolicitud.direccion}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Enfásis (solo IE):</span>{" "}
                  {userSolicitud.enfasis}
                </p>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default SolicitudDetail;
