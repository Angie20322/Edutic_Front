import { useNavigate, useParams, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useContext, useState } from "react";
import { FiUser, FiEdit, FiTrash2, FiArrowLeft } from "react-icons/fi";
import Swal from "sweetalert2";

import { usuarioById, deleteUsuario } from "../../../redux/actions.js";
import { CRMContext } from "../../../context/CRMContext.jsx";
import Nav from "../Nav-Pag/Nav";
import Spinner from "../../Layout/Spinner.jsx";

const UsuariosDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auth] = useContext(CRMContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(usuarioById(id, auth))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, id, auth]);

  let usuario = useSelector((state) => state.usuario);

  const cancelarButton = () => {
    navigate("/dashboard/usuarios");
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
        text: "Eliminar un usuario es una decisión permanente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteUsuario(usuario.id, auth));
          swalWithBootstrapButtons.fire({
            title: "Eliminado",
            text: "El usuario ha sido eliminado",
            icon: "success",
          });
          navigate("/dashboard/usuarios");
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
    <div className="min-h-full overflow-y-scroll">
      <Nav />
      <div className="lg:col-span-3 xl:col-span-5 bg-gray-100 h-screen p-10">
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 ">
              <h2 className="text-4xl mx-20 pt-6 font-semibold">
                Datos usuario
              </h2>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Link to={`/dashboard/usuarios/editar/${usuario.id}`}>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded focus:outline-none flex items-center">
                    <FiEdit className="mr-1" /> Editar
                  </button>
                </Link>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded focus:outline-none flex items-center"
                  onClick={eliminarButton}
                >
                  <FiTrash2 className="mr-1" /> Eliminar
                </button>
                <button
                  className="text-gray-600 hover:text-gray-800 focus:outline-none flex items-center"
                  onClick={cancelarButton}
                >
                  <FiArrowLeft className="mr-1" /> Volver
                </button>
              </div>
            </div>
            <div className="flex flex-grow items-center justify-center">
              <div className="w-1/2">
                <div className="mr-4">
                  {usuario.imagen ? (
                    <img
                      src={usuario.imagen}
                      alt={`${usuario.nombre} ${usuario.apellido}`}
                      className="w-32 h-32 rounded-full mx-auto mb-4"
                    />
                  ) : (
                    <FiUser className="w-32 h-32 text-gray-500 mx-auto mb-4" />
                  )}
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-semibold">
                    {usuario.nombre} {usuario.apellido}
                  </h2>
                  {!usuario.confirmado && (
                    <p className="font-bold text-red-700">
                      Sin confirmar cuenta
                    </p>
                  )}
                  <p className="text-gray-600">{usuario.email}</p>
                  <p className="text-gray-600">{usuario.telefono}</p>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-semibold">
                    Información adicional
                  </h3>
                  <p>
                    <span className="font-semibold">Departamento:</span>{" "}
                    {usuario.departamento}
                  </p>
                  <p>
                    <span className="font-semibold">Ciudad:</span>{" "}
                    {usuario.ciudad}
                  </p>
                  <p>
                    <span className="font-semibold">Razón social:</span>{" "}
                    {usuario.colegio}
                  </p>
                  <p>
                    <span className="font-semibold">Nit:</span> {usuario.nit}
                  </p>
                  <p>
                    <span className="font-semibold">Cargo:</span> {usuario.cargo}
                  </p>
                  <p>
                    <span className="font-semibold">Materia interés:</span> {usuario.materia}
                  </p>
                  <p>
                    <span className="font-semibold">Dirección:</span>{" "}
                    {usuario.direccion}
                  </p>
                  <p>
                    <span className="font-semibold">
                      Enfasis (solo Educación):
                    </span>{" "}
                    {usuario.enfasis}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsuariosDetail;
