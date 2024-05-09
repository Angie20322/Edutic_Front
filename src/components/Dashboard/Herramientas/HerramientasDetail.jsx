import { useNavigate, useParams, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useContext, Fragment } from "react";
import { FiEdit, FiTrash2, FiArrowLeft, FiMinusCircle } from "react-icons/fi";
import { BiSolidUserCircle } from "react-icons/bi";
import { BsDownload } from "react-icons/bs";
import Swal from "sweetalert2";
import ReactPlayer from "react-player";

import {
  deleteHerramienta,
  herramientaById,
  getAllComentarios,
  deleteComentario,
} from "../../../redux/actions.js";
import { CRMContext } from "../../../context/CRMContext.jsx";
import Nav from "../Nav-Pag/Nav";
import HerramientasEditar from "./HerramientasEditar";
import Spinner from "../../Layout/Spinner.jsx";

const HerramientasDetail = () => {
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
    dispatch(herramientaById(id, auth))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, auth, id]);

  useEffect(() => {
    dispatch(getAllComentarios(auth));
  }, [auth, dispatch]);

  const eliminarComentario = async (comentario) => {
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
          dispatch(deleteComentario(comentario, auth));
          swalWithBootstrapButtons.fire({
            title: "Eliminado",
            text: "La herramienta ha sido eliminada",
            icon: "success",
          });
          navigate("/dashboard/herramientas");
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

  let comentarios = useSelector((state) => state.comentarios);
  const herramientaComentarios = comentarios.filter(
    (comentario) => comentario.herramienta?.id === id
  );

  let herramienta = useSelector((state) => state.herramienta);

  const cancelarButton = () => {
    navigate("/dashboard/herramientas");
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
          dispatch(deleteHerramienta(herramienta.id, auth));
          swalWithBootstrapButtons.fire({
            title: "Eliminado",
            text: "La herramienta ha sido eliminada",
            icon: "success",
          });
          navigate("/dashboard/herramientas");
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
        <div className="flex flex-col">
          {loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <div className="flex flex-col md:flex-row justify-between items-center mb-4 ">
                <h2 className="text-lg font-semibold">
                  Visualización de la herramienta
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
                <HerramientasEditar
                  herramienta={herramienta}
                  serEdit={setEdit}
                  edit={edit}
                />
              )}
              <div className={`flex flex-col p-4 ${edit && "hidden"}`}>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-2">
                    {herramienta.nombre}
                  </h2>
                  {herramienta.usuario && (
                    <p className="text-gray-600">
                      Autor: {herramienta.usuario.nombre}{" "}
                      {herramienta.usuario.apellido}
                    </p>
                  )}
                  {herramienta.admin && (
                    <p className="text-gray-600">
                      Autorizado por: {herramienta.admin.nombre}
                    </p>
                  )}

                  <p className="text-gray-600">
                    Fecha: {formatFecha(herramienta.createdAt)}
                  </p>
                  {herramienta.imagen && (
                    <img
                      src={herramienta.imagen}
                      alt={herramienta.nombre}
                      className="mt-4 rounded-lg h-40"
                    />
                  )}
                </div>
                {herramienta.video ? (
                  <div>
                    <ReactPlayer
                      url={herramienta.video}
                      className="react-player"
                      width="50%"
                      height="100%"
                    />
                  </div>
                ) : (
                  <p className="text-center">Video aun no disponible</p>
                )}
                <div>
                  <p className="text-gray-600">{herramienta.descripcion}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-bold">Materias: </p>
                  <ul className="list-disc mb-4">
                    {herramienta.materias ? (
                      herramienta.materias.map((materia, index) => (
                        <li className="text-gray-600 ml-10" key={index}>
                          {" "}
                          {materia.nombre}
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-600 ml-10">Ninguna</li>
                    )}
                  </ul>
                </div>
                <div>
                  <p className="mb-2">Manual Aqui:</p>
                  <Link to={herramienta.manual} target="_blank">
                    <BsDownload className="text-[84px] bg-red-600 p-4 text-white font-bold" />
                  </Link>
                </div>
              </div>
              {herramientaComentarios.length === 0 ? (
                <p className="text-gray-700 py-2 font-normal text-base text-justify">
                  No hay comentarios
                </p>
              ) : (
                herramientaComentarios.map((c) => (
                  <div key={c.id} className="md:p-2 w-full bg-gray-200">
                    <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                      <div className="w-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                        {c.usuario.imagen ? (
                          <img
                            src={c.usuario.imagen}
                            alt={`Imagen de ${c.usuario.nombre} ${c.usuario.apellido}`}
                            className="rounded-full w-14 h-14"
                          />
                        ) : (
                          <BiSolidUserCircle className="w-14 h-14" />
                        )}
                      </div>
                      <div className="flex-grow">
                        <div>
                          <p className="text-gray-700 py-2 italic font-normal text-base text-left">
                            {c.usuario.nombre} {c.usuario.apellido} el{" "}
                            {formatFecha(c.createdAt)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-700 py-2 font-normal text-base text-justify">
                            {c.comentario}
                          </p>
                        </div>
                      </div>
                      <div>
                        <button
                          className="bg-rose-600 text-white hover:bg-rose-500 p-4 rounded-lg"
                          onClick={() => eliminarComentario(c.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default HerramientasDetail;
