import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

import NavBarConf from "./NavBarConf.jsx";
import clienteAxios from "../../config/axios.js";
import Spinner from "../Layout/Spinner.jsx";

const Confirmacion = () => {
  const navigate = useNavigate();
  const [userConfirmar, setUserConfirmar] = useState("");
  const [loading, setLoading] = useState(true);
  const { enlace } = useParams();
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();

  const confirmarUsuario = async (datos) => {
    try {
      await clienteAxios.get(`/usuarios/confirmar/${datos}`);
      setUserConfirmar(undefined);
    } catch (error) {
      setUserConfirmar(error.response.data.error);
    }
  };

  const ingresarPassword = async (enlace, password) => {
    try {
      const res = await clienteAxios.post(
        `/usuarios/confirmar/${enlace}`,
        password
      );
      return res;
    } catch (error) {
      const res = error;
      return res;
    }
  };

  const onSubmit = async (e) => {
    const resultado = await ingresarPassword(enlace, {
      password: e.password,
    });
    if (resultado.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Contraseña cambiada",
        text: "Se ha cambiado la contraseña",
      });
      navigate("/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Error en la solicitud",
        text: resultado.response.data.error,
      });
    }
  };

  useEffect(() => {
    confirmarUsuario(enlace)
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [enlace]);

  return (
    <div className="min-h-screen mx-auto text-center">
      <NavBarConf />
      <h1 className="py-2 mt-10 text-4xl font-bold">Confirmación de cuenta</h1>
      {loading ? (
        <Spinner />
      ) : userConfirmar === undefined ? (
        <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg">
            <form
              className="mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <p className="text-center text-lg font-medium">
                Ingresa una contraseña para acceder a tu cuenta
              </p>
              <div className="text-lime-800 text-xs text-left ml-5">
                <p className="font-bold">Reglas de la contraseña: </p>
                <ul className="list-disc">
                  <li className="ml-5">De 8 a 16 caracteres</li>
                  <li className="ml-5">Al menos un número</li>
                  <li className="ml-5">Al menos una letra minúscula</li>
                  <li className="ml-5">Al menos una letra mayúscula</li>
                  <li className="ml-5">
                    Al menos un símbolo especial (~!@#$%^&*+)
                  </li>
                </ul>
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Contraseña
                </label>

                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Se necesita una contraseña",
                      },
                      minLength: {
                        value: 8,
                        message: "Mínimo 8 caracteres",
                      },
                      maxLength: {
                        value: 16,
                        message: "Máximo 16 caracteres",
                      },
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/,
                        message:
                          "Una letra minúscula, una mayúscula y un caracter especial (~!@#$%^&*)",
                      },
                    })}
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Contraseña"
                  />
                </div>
              </div>
              {errors.password && (
                <p className="text-rose-700 text-sm font-bold">
                  {errors.password.message}
                </p>
              )}

              <div>
                <label htmlFor="repPassword" className="sr-only">
                  Repetir Contraseña
                </label>

                <div className="relative">
                  <input
                    id="repPassword"
                    type="password"
                    {...register("passwordConfirmation", {
                      required: "Vuelva a ingresar la contraseña",
                      validate: {
                        matchesPreviousPassword: (value) => {
                          const { password } = getValues();
                          return (
                            password === value || "Las contraseñas no coinciden"
                          );
                        },
                      },
                    })}
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Repetir contraseña"
                  />
                </div>
              </div>

              {errors.passwordConfirmation && (
                <p className="text-rose-700 text-sm font-bold">
                  {errors.passwordConfirmation.message}
                </p>
              )}
              <button
                type="submit"
                className="block w-full rounded-lg bg-green-800 px-5 py-3 text-sm font-medium text-white hover:bg-green-700"
              >
                Confirmar
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow my-10 mx-auto py-4 px-4 rounded-lg max-w-md mx auto text-center">
          <h1 className="bg-red-500 py-2 px-5 rounded-lg w-full text-white font-bold text-center">
            {userConfirmar}
          </h1>
        </div>
      )}
    </div>
  );
};

export default Confirmacion;
