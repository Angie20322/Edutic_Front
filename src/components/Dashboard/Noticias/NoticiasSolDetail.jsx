import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState, useContext } from "react";
import { FiCheckCircle, FiXCircle, FiArrowLeft } from "react-icons/fi";
import Swal from "sweetalert2";

import { deleteNoticia } from "../../../redux/actions.js";
import { CRMContext } from "../../../context/CRMContext.jsx";
import Nav from "../Nav-Pag/Nav";
import clienteAxios from "../../../config/axios.js";
import Spinner from "../../Layout/Spinner.jsx";

const NoticiasSolDetail = ({ loginData }) => {
  const [auth] = useContext(CRMContext);
  const [noticia, setNoticia] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const formatFecha = (fecha) => {
    // Convierte la fecha de la base de datos a un formato legible
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const consultarApi = async () => {
    try {
      const clientesConsulta = await clienteAxios.get(
        `/noticias/detail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.jwtToken}`,
          },
        }
      );

      // Guardar respuesta en estado local
      setNoticia(clientesConsulta.data);
    } catch (error) {
      // Error actualizacion
      if (error.response.status === 500) {
        navigate("/dashboard/herramientas");
      }
    }
  };

  useEffect(() => {
    consultarApi()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  const cancelarButton = () => {
    navigate("/dashboard/noticias/solicitudes");
  };

  const confirmarHerramienta = async (datos) => {
    try {
      const res = await clienteAxios.put("/noticias/editar", datos, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      return res;
    } catch (error) {
      const res = error;
      return res;
    }
  };

  const aceptarButton = async () => {
    let confirmar = {
      ...noticia,
      publicado: true,
      adminId: loginData.admin.id,
    };
    const resultado = await confirmarHerramienta(confirmar);
    if (resultado.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Noticia publicada",
        text: "Se ha publicado la noticia",
      });
      navigate("/dashboard/noticias");
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
        text: "Esta acción es permanente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteNoticia(noticia.id, auth));
          swalWithBootstrapButtons.fire({
            title: "Eliminado",
            text: "La noticia ha sido eliminada",
            icon: "success",
          });
          navigate("/dashboard/noticias");
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

  if (!auth.auth) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="h-screen overflow-y-scroll">
      <Nav />
      <div className="lg:col-span-3 xl:col-span-5 bg-gray-100 h-screen p-10">
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 ">
              <h2 className="text-xl font-semibold">
                Visualización de la noticia
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
            <div className={`flex flex-col p-4`}>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  {noticia.titulo}
                </h2>
                <p className="text-gray-600">Autor: {noticia.autor}</p>
                <p className="text-gray-600">
                  Fecha: {formatFecha(noticia.createdAt)}
                </p>
                {noticia.imagen && (
                  <img
                    src={noticia.imagen}
                    alt={noticia.nombre}
                    className="mt-4 rounded-lg h-40"
                  />
                )}
              </div>
              <div>
                <p className="text-gray-600">{noticia.contenido}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticiasSolDetail;
