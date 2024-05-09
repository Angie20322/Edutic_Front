import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext.jsx";
import clienteAxios from "../../config/axios.js";

const Login = ({ setModal, setLoginData }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useContext(CRMContext);
  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredenciales({
      ...credenciales,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Espere, por favor",
      allowOutsideClick: false,
      showConfirmButton: false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const respuesta = await clienteAxios.post(
        "/usuarios/login",
        credenciales
      );
      const { jwtToken, usuario } = respuesta.data;
      localStorage.setItem("token", jwtToken);
      setAuth({
        jwtToken,
        auth: true,
      });
      console.log(respuesta.data);
      if (usuario) {
        navigate("/home/noticias");
      } else {
        navigate("/dashboard");
      }
      setLoginData(respuesta.data);
      setModal(false);
      Swal.close();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: error.response.data.error,
      });
    }
  };
  return (
    <div className="flex h-[500px] overflow-y-scroll flex-col justify-center px-6 py-1 lg:px-1">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm border-b-2 border-b-slate-200 pb-3">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 uppercase">
          ingreso de miembro
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Correo electrónico
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="email"
                placeholder="ingresa tu email para iniciar sesión"
                value={credenciales.email}
                required
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 pl-3"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Contraseña
              </label>
            </div>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                placeholder="**********"
                value={credenciales.password}
                required
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pl-3"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
            >
              Ingresar
            </button>
          </div>
          <div className="text-sm">
            <Link to={"/olvidemipass"}>
              <p
                className="font-semibold text-green-800 hover:text-green-700 cursor-pointer"
                onClick={() => setModal(false)}
              >
                ¿Olvidó su contraseña?
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
