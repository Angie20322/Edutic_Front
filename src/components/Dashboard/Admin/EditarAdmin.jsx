import { Fragment, useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import Nav from "../Nav-Pag/Nav.jsx";
import verificarAdmin from "./VerificarAdmin.js";
import { CRMContext } from "../../../context/CRMContext.jsx";
import clienteAxios from "../../../config/axios.js";

const EditarAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [errores, setErrores] = useState({});
  const [admin, setAdmin] = useState("");
  const [auth] = useContext(CRMContext);

  const consultarAdmin = async () => {
    const productoConsulta = await clienteAxios.get(`/admin/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.jwtToken}`,
      },
    });

    // Guardar respuesta en estado local
    setAdmin(productoConsulta.data);
  };

  useEffect(() => {
    consultarAdmin();
  }, []);

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.preventDefault();
    Swal.fire({
      title: "Editar Miembro",
      text: "¿Quieres editar este miembro?",
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
          setErrores(verificarAdmin(admin));
          if (
            admin.nombre &&
            admin.email &&
            admin.telefono &&
            !Object.keys(errores).length
          ) {
            const res = await clienteAxios.put(`/admin/editar/${id}`, admin, {
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
            navigate(`/dashboard/miembros/miembro/${id}`);
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
    navigate("/dashboard/miembros");
    setAdmin({
      nombre: "",
      email: "",
      telefono: "",
    });
  };

  return (
    <Fragment>
      <Nav />
      <div className="p-3 text-center lg:col-span-3 xl:col-span-5 bg-gray-100 h-screen overflow-y-scroll">
        <div className="justify-center">
          <div className="text-left">
            <div className="font-bold">
              <h1 className="text-4xl text-green-800 py-6 text-center">
                Editar Miembro
              </h1>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="bg-white py-4 px-4">
                <button
                  className="bg-yellow-600 px-6 py-3 rounded-xl text-white uppercase font-bold hover:bg-yellow-500 mb-4"
                  onClick={cancelarButton}
                >
                  Cancelar
                </button>
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="nombre"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Nombre{" "}
                      <span
                        className={errores.nombre ? "text-red-700" : "hidden"}
                      >
                        *
                      </span>
                    </label>
                    <input
                      className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                        errores.nombre ? "border-red-600" : "border-gray-300 "
                      }`}
                      placeholder="Ingrese el nombre. (Ej: Pepito S.)"
                      type="text"
                      value={admin.nombre}
                      name="nombre"
                      onChange={handleChange}
                      id="nombre"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="telefono"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Teléfono{" "}
                      <span
                        className={errores.telefono ? "text-red-700" : "hidden"}
                      >
                        *
                      </span>
                    </label>
                    <input
                      className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                        errores.telefono ? "border-red-600" : "border-gray-300 "
                      }`}
                      placeholder="3100000000 o 6018000000"
                      type="number"
                      value={admin.telefono}
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
                      <span
                        className={errores.email ? "text-red-700" : "hidden"}
                      >
                        *
                      </span>
                    </label>
                    <input
                      className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                        errores.email ? "border-red-600" : "border-gray-300 "
                      }`}
                      placeholder="correo@correo.com"
                      type="email"
                      value={admin.email}
                      name="email"
                      onChange={handleChange}
                      id="email"
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
                      Editar Miembro
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditarAdmin;
