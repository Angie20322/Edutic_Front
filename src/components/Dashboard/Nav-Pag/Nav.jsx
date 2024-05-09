import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Logo2 from "../../../images/logo2.png";
import { CRMContext } from "../../../context/CRMContext.jsx";

const Nav = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useContext(CRMContext);

  const cerrarSesion = () => {
    Swal.fire({
      title: "¿Quires cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setAuth({
          token: "",
          auth: false,
        });
        localStorage.setItem("token", "");

        // Redireccion
        navigate("/");
      }
    });
  };

  return (
    <nav className="bg-green-800 py-4 font-semibold">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-[60px] w-[60px]"
                src={Logo2}
                alt="Logo edutic"
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/dashboard/"
                  className="text-white hover:bg-green-700 hover:text-white rounded-md px-3 py-2 font-medium"
                >
                  Solicitudes
                </Link>
                <Link
                  to="/dashboard/usuarios"
                  className="text-white hover:bg-green-700 hover:text-white rounded-md px-3 py-2 font-medium"
                >
                  Usuarios
                </Link>
                <Link
                  to="/dashboard/herramientas"
                  className="text-white hover:bg-green-700 hover:text-white rounded-md px-3 py-2 font-medium"
                >
                  Herramientas
                </Link>
                <Link
                  to="/dashboard/materias"
                  className="text-white hover:bg-green-700 hover:text-white rounded-md px-3 py-2  font-medium"
                >
                  Materias
                </Link>
                <Link
                  to="/dashboard/noticias"
                  className="text-white hover:bg-green-700 hover:text-white rounded-md px-3 py-2  font-medium"
                >
                  Noticias
                </Link>
                <Link
                  to="/dashboard/miembros"
                  className="text-white hover:bg-green-700 hover:text-white rounded-md px-3 py-2  font-medium"
                >
                  Miembros
                </Link>
                <Link
                  to="https://www.microsoft.com/es-es/power-platform/products/power-bi"
                  target="_blank"
                  className="text-white hover:bg-green-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                >
                  Estadísticas
                </Link>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden"></div>
          <button
            className="p-3 bg-rose-700 w-52 uppercase text-white rounded-lg hover:bg-rose-500 hover:text-green-100"
            onClick={cerrarSesion}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div className="md:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <Link
            to="/dashboard/"
            className="text-white hover:bg-green-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Solicitudes
          </Link>
          <Link
            to="/dashboard/usuarios"
            className="text-white hover:bg-green-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Usuarios
          </Link>
          <Link
            to="/dashboard/herramientas"
            className="text-white hover:bg-green-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Herramientas
          </Link>
          <Link
            to="/dashboard/materias"
            className="text-white hover:bg-green-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Materias
          </Link>
          <Link
            to="/dashboard/noticias"
            className="text-white hover:bg-green-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Noticias
          </Link>
          <Link
            to="/dashboard/miembros"
            className="text-white hover:bg-green-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Miembros
          </Link>
          <Link
            to="https://www.microsoft.com/es-es/power-platform/products/power-bi"
            target="_blank"
            className="text-white hover:bg-green-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Estadísticas
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
