import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowFromRight } from "react-icons/bi";
import { FaPowerOff } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  LuBarChartBig,
  LuUser2,
  LuSettings,
  LuPresentation,
  LuNewspaper,
} from "react-icons/lu";

import { CRMContext } from "../../../context/CRMContext.jsx";
import Logo2 from "../../../images/logo2.png";

const Sidebar = ({ open, setOpen, loginData }) => {
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
    <div
      className={`w-20 ${
        open ? "md:w-72" : "w-20"
      } duration-300 h-screen p-5 pt-8 bg-green-700 relative`}
    >
      <BiArrowFromRight
        className={`hidden md:block absolute cursor-pointer -right-5 top-9 border-2 text-green-700 w-10 h-10 bg-white rounded-full border-green-700 ${
          !open && "rotate-180"
        } duration-300 `}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <img
          src={Logo2}
          className={`cursor-pointer ${
            open ? "md:w-[80px] md:h-[80px]" : "w-12 h-12"
          } duration-300 `}
        />
      </div>
      <ul>
        <Link to={`/home/perfil`}>
          <li
            className={`text-gray-200 py-1 text-sm font-bold flex items-center gap-x-4 cursor-pointer hover:bg-green-100 hover:text-green-700 rounded-md mt-12`}
          >
            <LuUser2 className="text-[40px]" />
            <span
              className={`${
                !open && "hidden"
              } origin-left duration-300 uppercase`}
            >
              Perfil
            </span>
          </li>
        </Link>
        <Link to={`/home/noticias`}>
          <li
            className={`text-gray-200 py-1 text-sm font-bold flex items-center gap-x-4 cursor-pointer hover:bg-green-100 hover:text-green-700 rounded-md mt-12`}
          >
            <LuNewspaper className="text-[40px]" />
            <span
              className={`${
                !open && "hidden"
              } origin-left duration-300 uppercase`}
            >
              noticias
            </span>
          </li>
        </Link>
        {loginData.usuario.rol === "colegio" && (
          <Link to={`/home/estadisticas`}>
            <li
              className={`text-gray-200 py-1 text-sm font-bold flex items-center gap-x-4 cursor-pointer hover:bg-green-100 hover:text-green-700 rounded-md mt-2`}
            >
              <LuBarChartBig className="text-[40px]" />
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-300 uppercase`}
              >
                estadísticas
              </span>
            </li>
          </Link>
        )}

        <Link to={`/home/herramientas`}>
          <li
            className={`text-gray-200 py-1 text-sm font-bold flex items-center gap-x-4 cursor-pointer hover:bg-green-100 hover:text-green-700 rounded-md mt-2`}
          >
            <LuSettings className="text-[40px]" />
            <span
              className={`${
                !open && "hidden"
              } origin-left duration-300 uppercase`}
            >
              herramientas
            </span>
          </li>
        </Link>
        {loginData.usuario.rol === "colegio" && (
          <Link to={`/home/materias`}>
            <li
              className={`text-gray-200 py-1 text-sm font-bold flex items-center gap-x-4 cursor-pointer hover:bg-green-100 hover:text-green-700 rounded-md mt-2`}
            >
              <LuPresentation className="text-[40px]" />
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-300 uppercase`}
              >
                materias
              </span>
            </li>
          </Link>
        )}

        <button
          className={`p-2 w-full bg-rose-700 rounded-lg text-gray-200 text-sm font-bold flex items-center gap-x-4 cursor-pointer hover:text-green-100 hover:bg-rose-500 mt-12`}
          onClick={cerrarSesion}
        >
          <FaPowerOff className="text-[40px]" />{" "}
          <span
            className={`${
              !open && "hidden"
            } origin-left duration-300 uppercase`}
          >
            Cerrar Sesion
          </span>
        </button>
      </ul>
    </div>
  );
};

export default Sidebar;
