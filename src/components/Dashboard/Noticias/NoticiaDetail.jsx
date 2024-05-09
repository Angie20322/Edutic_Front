import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useContext } from "react";
import { FiEdit, FiTrash2, FiArrowLeft, FiMinusCircle } from "react-icons/fi";
import Swal from "sweetalert2";

import { deleteNoticia, noticiasById } from "../../../redux/actions.js";
import { CRMContext } from "../../../context/CRMContext.jsx";
import Nav from "../Nav-Pag/Nav";
import NoticiaEditar from "./NoticiaEditar.jsx";
import Spinner from "../../Layout/Spinner.jsx";

const NoticiaDetail = () => {
  const formatFecha = (fecha) => {
    // Convierte la fecha de la base de datos a un formato legible
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [auth] = useContext(CRMContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(noticiasById(id, auth))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, id, auth]);

  let noticia = useSelector((state) => state.noticia);

  const cancelarButton = () => {
    navigate("/dashboard/noticias");
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
    <div className="min-h-full">
      <Nav />
      <div className="lg:col-span-3 xl:col-span-5 bg-gray-100 h-screen p-10">
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 ">
              <h2 className="text-lg font-semibold">
                Visualización de artículo
              </h2>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded focus:outline-none flex items-center"
                  onClick={() => setEdit(!edit)}
                >
                  {!edit ? (
                    <>
                      <FiEdit className="mr-1" /> Editar
                    </>
                  ) : (
                    <>
                      <FiMinusCircle className="mr-1" /> Ver
                    </>
                  )}
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded focus:outline-none flex items-center"
                  onClick={eliminarButton}
                >
                  <FiTrash2 className="mr-1" /> Eliminar
                </button>
                <button
                  onClick={cancelarButton}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none flex items-center"
                >
                  <FiArrowLeft className="mr-1" /> Volver
                </button>
              </div>
            </div>
            {edit && (
              <NoticiaEditar noticia={noticia} serEdit={setEdit} edit={edit} />
            )}
            <div className={`flex flex-col p-4 ${edit && "hidden"}`}>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  {noticia.titulo}
                </h2>
                {noticia.usuario && (
                  <p className="text-gray-600">
                    Autor: {noticia.usuario.nombre} {noticia.usuario.apellido}
                  </p>
                )}
                {noticia.usuario && (
                  <p className="text-gray-600">
                    Autorizado por: {noticia.admin.nombre}
                  </p>
                )}
                <p className="text-gray-600">
                  Fecha: {formatFecha(noticia.createdAt)}
                </p>
                <p className="text-gray-600">
                  Actualización: {formatFecha(noticia.updatedAt)}
                </p>
                {noticia.imagen && (
                  <img
                    src={noticia.imagen}
                    alt={noticia.titulo}
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

export default NoticiaDetail;
