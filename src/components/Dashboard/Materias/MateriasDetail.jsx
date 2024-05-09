import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useContext } from "react";
import { FiEdit, FiTrash2, FiArrowLeft, FiMinusCircle } from "react-icons/fi";
import Swal from "sweetalert2";

import { materiasById, deleteMateria } from "../../../redux/actions.js";
import { CRMContext } from "../../../context/CRMContext.jsx";
import Nav from "../Nav-Pag/Nav";
import MateriasEditar from "./MateriasEditar";
import Spinner from "../../Layout/Spinner.jsx";

const MateriasDetail = () => {
  const formatFecha = (fecha) => {
    // Convierte la fecha de la base de datos a un formato legible
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [auth] = useContext(CRMContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(materiasById(id, auth))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, auth, id]);

  let materia = useSelector((state) => state.materia);

  const cancelarButton = () => {
    navigate("/dashboard/materias");
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
          dispatch(deleteMateria(materia.id, auth));
          swalWithBootstrapButtons.fire({
            title: "Eliminado",
            text: "La materia ha sido eliminada",
            icon: "success",
          });
          navigate("/dashboard/materias");
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

  console.log(materia);

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
              <MateriasEditar materia={materia} serEdit={setEdit} edit={edit} />
            )}
            <div className={`flex flex-col p-4 ${edit && "hidden"}`}>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  {materia.nombre}
                </h2>
                <p className="text-gray-600">Autor: {materia.autor}</p>
                <p className="text-gray-600">
                  Fecha: {formatFecha(materia.createdAt)}
                </p>
                {materia.imagen && (
                  <img
                    src={materia.imagen}
                    alt={materia.nombre}
                    className="mt-4 rounded-lg h-40"
                  />
                )}
              </div>
              <div>
                <p className="text-gray-600">{materia.descripcion}</p>
              </div>
              <div>
                <p className="text-gray-600 font-bold">Herramientas: </p>
                <ul className="list-disc">
                  {materia.herramientas ? (
                    materia.herramientas.map((herramienta, index) => (
                      <li className="text-gray-600 ml-10" key={index}>
                        {" "}
                        {herramienta.nombre}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-600 ml-10">Ninguna</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MateriasDetail;
