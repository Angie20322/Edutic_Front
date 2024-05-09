import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import verificarEditar from "./verficarEditar.js";
import { CRMContext } from "../../../context/CRMContext.jsx";
import Nav from "../Nav-Pag/Nav.jsx";
import clienteAxios from "../../../config/axios.js";

const EditarUsuario = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [errores, setErrores] = useState({});
  const [user, setUser] = useState("");
  const [auth] = useContext(CRMContext);

  const consultarUsuario = async () => {
    const productoConsulta = await clienteAxios.get(`/usuarios/user/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.jwtToken}`,
      },
    });

    // Guardar respuesta en estado local
    setUser(productoConsulta.data);
  };

  useEffect(() => {
    consultarUsuario();
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.preventDefault();
    Swal.fire({
      title: "Editar usuario",
      text: "¿Quieres editar este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, editar",
      cancelButtonText: "Aún no",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Subiendo información",
          allowOutsideClick: false,
          showConfirmButton: false,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        try {
          setErrores(verificarEditar(user));
          if (
            user.nombre &&
            user.apellido &&
            user.email &&
            user.telefono &&
            user.departamento &&
            user.ciudad &&
            user.colegio &&
            user.nit &&
            user.direccion &&
            user.cargo &&
            user.materia &&
            user.enfasis &&
            !Object.keys(errores).length
          ) {
            const res = await clienteAxios.put(`/usuarios/editar/${id}`, user, {
              headers: {
                Authorization: `Bearer ${auth.jwtToken}`,
              },
            });
            if (res.status === 200) {
              Swal.fire({
                title: "Editado correctamente",
                icon: "success",
              });
            }
            navigate(`/dashboard/usuarios/usuario/${id}`);
            Swal.close();
          } else {
            Swal.fire({
              icon: "error",
              title: "¡Error!",
              text: "Hay espacios en blanco",
            });
          }
        } catch (error) {
          console.log(error);
          Swal.close();
        }
      }
    });
  };

  const cancelarButton = () => {
    navigate("/dashboard/usuarios");
    setUser({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      departamento: "",
      ciudad: "",
      colegio: "",
      nit: "",
      direccion: "",
      cargo: "",
      materia: "",
      enfasis: "",
    });
  };

  return (
    <div className="min-h-full">
      <Nav />
      <div className="font-bold">
        <h1 className="text-4xl text-green-800 pt-6 text-center">
          Editar Usuario
        </h1>
      </div>
      <div className="mt-5 mx-32 ">
        <div className="bg-white py-4 px-4">
          <button
            className="bg-yellow-600 px-6 py-3 rounded-xl text-white uppercase font-bold hover:bg-yellow-500"
            onClick={cancelarButton}
          >
            Cancelar
          </button>
          <p className="text-sm py-8">
            * La foto de perfil solo puede ser editada por el usuario
          </p>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nombre{" "}
                <span className={errores.nombre ? "text-red-700" : "hidden"}>
                  *
                </span>
              </label>
              <input
                className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                  errores.nombre ? "border-red-600" : "border-gray-300 "
                }`}
                placeholder="Ingresa tu(s) nombre(s)"
                type="text"
                value={user.nombre}
                name="nombre"
                onChange={handleChange}
                id="nombre"
              />
            </div>

            <div>
              <label
                htmlFor="apellido"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Apellido{" "}
                <span className={errores.apellido ? "text-red-700" : "hidden"}>
                  *
                </span>
              </label>
              <input
                className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                  errores.apellido ? "border-red-600" : "border-gray-300 "
                }`}
                placeholder="Ingresa tu(s) apellido(s)"
                type="text"
                value={user.apellido}
                name="apellido"
                onChange={handleChange}
                id="apellido"
              />
            </div>

            <div>
              <label
                htmlFor="telefono"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Teléfono{" "}
                <span className={errores.telefono ? "text-red-700" : "hidden"}>
                  *
                </span>
              </label>
              <input
                className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                  errores.telefono ? "border-red-600" : "border-gray-300 "
                }`}
                placeholder="3100000000 o 6018000000"
                type="number"
                value={user.telefono}
                name="telefono"
                onChange={handleChange}
                id="telefono"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Correo electrónico{" "}
                <span className={errores.email ? "text-red-700" : "hidden"}>
                  *
                </span>
              </label>
              <input
                className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                  errores.email ? "border-red-600" : "border-gray-300 "
                }`}
                placeholder="correo@correo.com"
                type="email"
                value={user.email}
                name="email"
                onChange={handleChange}
                id="email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Departamento
              </label>
              <div className="text-sm font-medium">
                <input
                  className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                    errores.email ? "border-red-600" : "border-gray-300 "
                  }`}
                  placeholder="correo@correo.com"
                  type="text"
                  value={user.departamento}
                  name="departamento"
                  onChange={handleChange}
                  id="departamento"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Ciudad
              </label>
              <div className="text-sm font-medium">
                <input
                  className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                    errores.email ? "border-red-600" : "border-gray-300 "
                  }`}
                  placeholder="correo@correo.com"
                  type="text"
                  value={user.ciudad}
                  name="departamento"
                  onChange={handleChange}
                  id="departamento"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="colegio"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Institución Educativa{" "}
                <span className={errores.colegio ? "text-red-700" : "hidden"}>
                  *
                </span>
              </label>
              <input
                className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                  errores.colegio ? "border-red-600" : "border-gray-300 "
                }`}
                placeholder="Nombre de la institución educativa"
                type="text"
                value={user.colegio}
                name="colegio"
                onChange={handleChange}
                id="colegio"
              />
            </div>

            <div>
              <label
                htmlFor="nit"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nit Institución Educativa{" "}
                <span className={errores.nit ? "text-red-700" : "hidden"}>
                  *
                </span>
              </label>
              <input
                className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                  errores.nit ? "border-red-600" : "border-gray-300 "
                }`}
                placeholder="300.000.000-1"
                type="text"
                value={user.nit}
                name="nit"
                onChange={handleChange}
                id="nit"
              />
            </div>

            <div>
              <label
                htmlFor="cargo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Cargo{" "}
                <span className={errores.cargo ? "text-red-700" : "hidden"}>
                  *
                </span>
              </label>
              <input
                className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                  errores.cargo ? "border-red-600" : "border-gray-300 "
                }`}
                placeholder="Indique el cargo"
                type="text"
                value={user.cargo}
                name="cargo"
                onChange={handleChange}
                id="cargo"
              />
            </div>

            <div>
              <label
                htmlFor="materia"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Materia interés{" "}
                <span className={errores.materia ? "text-red-700" : "hidden"}>
                  *
                </span>
              </label>
              <input
                className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                  errores.materia ? "border-red-600" : "border-gray-300 "
                }`}
                placeholder="Materia interés"
                type="text"
                value={user.materia}
                name="materia"
                onChange={handleChange}
                id="materia"
              />
            </div>

            <div>
              <label
                htmlFor="direccion"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Dirección Institución Educativa{" "}
                <span className={errores.direccion ? "text-red-700" : "hidden"}>
                  *
                </span>
              </label>
              <input
                className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                  errores.direccion ? "border-red-600" : "border-gray-300 "
                }`}
                placeholder="Calle, avenida, vereda..."
                type="text"
                value={user.direccion}
                name="direccion"
                onChange={handleChange}
                id="direccion"
              />
            </div>

            <div>
              <label
                htmlFor="enfasis"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Énfasis de la institución{" "}
                <span className={errores.enfasis ? "text-red-700" : "hidden"}>
                  *
                </span>
              </label>
              <input
                className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                  errores.enfasis ? "border-red-600" : "border-gray-300 "
                }`}
                placeholder="Primaria, Bachillerato clásico, técnico..."
                type="enfasis"
                value={user.enfasis}
                name="enfasis"
                onChange={handleChange}
                id="enfasis"
              />
            </div>
            {Object.keys(errores).length ? (
              <p className="w-full text-red-700">* Espacio Obligatorio</p>
            ) : (
              <p></p>
            )}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
              >
                Editar Usuario
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarUsuario;
