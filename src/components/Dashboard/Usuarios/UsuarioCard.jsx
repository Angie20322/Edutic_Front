import { Fragment, useContext } from "react";
import { FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { CRMContext } from "../../../context/CRMContext.jsx";
import { deleteUsuario } from "../../../redux/actions.js";

const UsuarioCard = ({ usuario }) => {
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
          dispatch(deleteUsuario(usuario.id, auth));
          swalWithBootstrapButtons.fire({
            title: "Eliminado",
            text: "El usuario ha sido eliminado",
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
      <div className="flex items-center justify-center mb-4">
        {usuario.imagen ? ( // Verifica si el cliente tiene foto de perfil
          <img
            src={usuario.imagen}
            alt={`Foto de perfil de ${usuario.nombre}`}
            className="w-16 h-16 rounded-full"
          />
        ) : (
          <FiUser className="w-16 h-16 text-gray-500" /> // Usa el icono predeterminado si no hay foto de perfil
        )}
      </div>
      <h2 className="text-lg font-bold mb-2">
        {usuario.nombre} {usuario.apellido}
      </h2>
      {!usuario.confirmado && (
        <p className="font-bold text-red-700">Sin confirmar cuenta</p>
      )}
      <p className="text-gray-600">{usuario.email}</p>
      <p className="text-gray-600">{usuario.telefono}</p>
      <p className="text-gray-600">{usuario.colegio}</p>
      <p className="text-gray-600">{usuario.cargo}</p>
      <div className="flex mt-4">
        <Link to={`/dashboard/usuarios/usuario/${usuario.id}`}>
          <button className="bg-green-600 text-white px-4 py-2 rounded mr-2">
            Ver
          </button>
        </Link>

        <Link to={`/dashboard/usuarios/editar/${usuario.id}`}>
          <button className="bg-blue-600 text-white px-4 py-2 rounded mr-2">
            Editar
          </button>
        </Link>

        <button
          className="bg-rose-600 text-white px-4 py-2 rounded"
          onClick={() => eliminarButton(usuario.id)}
        >
          Eliminar
        </button>
      </div>
    </Fragment>
  );
};

export default UsuarioCard;
