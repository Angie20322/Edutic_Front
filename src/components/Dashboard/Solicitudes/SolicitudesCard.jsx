import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useContext } from "react";

import { CRMContext } from "../../../context/CRMContext.jsx";
import { deleteSolicitud } from "../../../redux/actions.js";

const SolicitudesCard = ({ solicitud }) => {
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
        text: "Una vez rechazada, se eliminará la solicitud",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, rechazar",
        cancelButtonText: "No, cancelar",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteSolicitud(solicitud.id, auth));
          swalWithBootstrapButtons.fire({
            title: "Rechazado",
            text: "Se ha rechazado la solicitud",
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

  return (
    <div className="transform transition-transform hover:scale-105">
      <div className="bg-gray-100 p-4 rounded shadow">
        <Link to={`/dashboard/solicitudes/${solicitud.id}`}>
          <h2 className="text-lg font-bold mb-2">
            {solicitud.nombre} {solicitud.apellido}
          </h2>
          <p className="text-gray-600">{solicitud.email}</p>
          <p className="text-gray-600">{solicitud.telefono}</p>
          <p className="text-gray-600">{solicitud.colegio}</p>
          <p className="text-gray-600">{solicitud.cargo}</p>
        </Link>

        <div className="flex mt-4">
          <Link to={`/dashboard/solicitudes/${solicitud.id}`}>
            <button className="bg-green-600 text-white px-4 py-2 rounded mr-2">
              Ver más
            </button>
          </Link>
          <button
            className="bg-rose-600 text-white px-4 py-2 rounded"
            onClick={() => eliminarButton(solicitud.id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolicitudesCard;
