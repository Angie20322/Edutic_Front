import { useNavigate, useParams, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useContext, useState } from "react";
import { FiEdit, FiTrash2, FiArrowLeft } from "react-icons/fi";
import Swal from "sweetalert2";

import { adminById, deleteAdmin } from "../../../redux/actions.js";
import { CRMContext } from "../../../context/CRMContext.jsx";
import Nav from "../Nav-Pag/Nav";
import Spinner from "../../Layout/Spinner.jsx";

const AdminDetail = ({ loginData }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auth] = useContext(CRMContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(adminById(id, auth))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, id, auth]);

  let admin = useSelector((state) => state.admin);

  const cancelarButton = () => {
    navigate("/dashboard/miembros");
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
        text: "Eliminar un miembro es una decisión permanente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteAdmin(usuario.id, auth));
          swalWithBootstrapButtons.fire({
            title: "Eliminado",
            text: "El miembro ha sido eliminado",
            icon: "success",
          });
          navigate("/dashboard/miembros");
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
                <Link to={`/dashboard/miembros/editar/${admin.id}`}>
                  <button
                    className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded focus:outline-none flex items-center ${
                      loginData.admin.nombre !== "admin" && "cursor-not-allowed"
                    } ${admin.nombre === "admin" && "hidden"}`}
                    disabled={loginData.admin.nombre !== "admin"}
                  >
                    <FiEdit className="mr-1" /> Editar
                  </button>
                </Link>
                <button
                  className={`bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded focus:outline-none flex items-center ${
                    loginData.admin.nombre !== "admin" && "cursor-not-allowed"
                  } ${admin.nombre === "admin" && "hidden"}`}
                  disabled={loginData.admin.nombre !== "admin"}
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
            <div className="flex flex-grow items-center justify-center mt-20">
              <div className="w-1/2">
                <div className="text-center">
                  <h2 className="text-xl font-semibold">{admin.nombre}</h2>
                  {!admin.confirmado && (
                    <p className="font-bold text-red-700">
                      Sin confirmar cuenta
                    </p>
                  )}
                  <p className="text-gray-600">{admin.email}</p>
                  <p className="text-gray-600">{admin.telefono}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDetail;
