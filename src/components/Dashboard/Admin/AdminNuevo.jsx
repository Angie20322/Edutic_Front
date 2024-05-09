import { useNavigate, Navigate } from "react-router-dom";
import { useState, useContext, Fragment } from "react";
import Swal from "sweetalert2";
import axios from "axios";

import { CRMContext } from "../../../context/CRMContext.jsx";
import Nav from "../Nav-Pag/Nav";
import verificarAdmin from "./VerificarAdmin.js";

const AdminNuevo = () => {
  const navigate = useNavigate();
  const initialAdmin = {
    nombre: "",
    email: "",
    telefono: "",
  };
  const [adm, setAdm] = useState(initialAdmin);
  const [errores, setErrores] = useState({});
  const [auth] = useContext(CRMContext);

  const handleChange = (e) => {
    setAdm({
      ...adm,
      [e.target.name]: e.target.value,
    });

    if (Object.keys(errores).length) {
      setErrores(
        verificarAdmin({
          ...adm,
          [e.target.name]: e.target.value,
        })
      );
    }
  };

  const confirmarMiembro = async (datos) => {
    try {
      const res = await axios.post("http://localhost:3001/admin/nuevo", datos, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      return res;
    } catch (error) {
      const res = error;
      console.log(error);
      return res;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Nuevo miembro",
      text: "¿Quieres agregar a este miembro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, guardarla",
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
          setErrores(verificarAdmin(adm));
          if (
            adm.nombre &&
            adm.email &&
            adm.telefono &&
            !Object.keys(errores).length
          ) {
            try {
              await confirmarMiembro(adm);

              Swal.fire({
                icon: "success",
                title: "Solicitud enviada",
                text: `Se ha aceptado a ${adm.nombre}`,
              });
              navigate("/dashboard/miembros");
            } catch (error) {
              Swal.fire({
                icon: "error",
                title: "Error en la solicitud",
              });
            }

            Swal.close();
          } else {
            Swal.fire({
              icon: "error",
              title: "Error en la solicitud",
              text: "Hay espacios vacíos",
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error en la solicitud",
          });
        }
      }
    });
  };

  if (!auth.auth) {
    return <Navigate to={"/"} />;
  }

  return (
    <Fragment>
      <Nav />
      <div className="p-3 text-center lg:col-span-3 xl:col-span-5 bg-gray-100 h-screen overflow-y-scroll">
        <div className="justify-center">
          <div className="text-left">
            <div className="font-bold">
              <h1 className="text-4xl text-green-800 py-6 text-center">
                Nuevo Miembro
              </h1>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="bg-white py-4 px-4">
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
                      value={adm.nombre}
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
                      value={adm.telefono}
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
                      value={adm.email}
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
                      Nuevo Miembro
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

export default AdminNuevo;
