import { Fragment, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { CRMContext } from "../../../context/CRMContext.jsx";
import { deleteAdmin } from "../../../redux/actions.js";

const AdminCard = ({ admin, loginData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auth] = useContext(CRMContext);

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
          dispatch(deleteAdmin(admin.id, auth));
          swalWithBootstrapButtons.fire({
            title: "Eliminado",
            text: "El miembro ha sido eliminado",
            icon: "success",
          });
          navigate("/dashboard/");
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
    <Fragment>
      <div className="flex items-center justify-center mb-4"></div>
      <h2 className="text-lg font-bold mb-2">{admin.nombre}</h2>
      {!admin.confirmado && (
        <p className="font-bold text-red-700">Sin confirmar cuenta</p>
      )}
      <p className="text-gray-600">{admin.email}</p>
      <p className="text-gray-600">{admin.telefono}</p>
      <div className="flex mt-4">
        <Link to={`/dashboard/miembros/miembro/${admin.id}`}>
          <button className="bg-green-600 text-white px-4 py-2 rounded mr-2">
            Ver
          </button>
        </Link>

        <Link to={`/dashboard/miembros/editar/${admin.id}`}>
          <button
            className={`bg-blue-600 text-white px-4 py-2 rounded mr-2 ${
              loginData.admin.nombre !== "admin" && "cursor-not-allowed"
            } ${admin.nombre === "admin" && "hidden"}`}
            disabled={loginData.admin.nombre !== "admin"}
          >
            Editar
          </button>
        </Link>

        <button
          className={`bg-rose-600 text-white px-4 py-2 rounded ${
            loginData.admin.nombre !== "admin" && "cursor-not-allowed"
          } ${admin.nombre === "admin" && "hidden"}`}
          disabled={loginData.admin.nombre !== "admin"}
          onClick={() => eliminarButton(admin.id)}
        >
          Eliminar
        </button>
      </div>
    </Fragment>
  );
};

export default AdminCard;
