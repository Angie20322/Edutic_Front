import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

import clienteAxios from "../../../../config/axios.js";
import { CRMContext } from "../../../../context/CRMContext.jsx";

const CambiarPassword = ({ usuarioId }) => {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();

  const [auth, setAuth] = useContext(CRMContext);

  const ingresarPassword = async (password) => {
    try {
      const res = await clienteAxios.post(
        `/password/cambiarpass/${usuarioId}`,
        password,
        {
          headers: {
            Authorization: `Bearer ${auth.jwtToken}`,
          },
        }
      );
      return res;
    } catch (error) {
      const res = error;
      return res;
    }
  };

  const onSubmit = async (e) => {
    const resultado = await ingresarPassword({
      password: e.password,
      actualPass: e.actualPass,
    });
    if (resultado.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Contraseña cambiada",
        text: "Se ha cambiado la contraseña",
      });
      setAuth({
        token: "",
        auth: false,
      });
      localStorage.setItem("token", "");

      // Redireccion
      navigate("/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Error en la solicitud",
        text: resultado.response.data.error,
      });
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <form
          className="mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-center text-lg font-medium">
            Ingresa la nueva contraseña
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
            <label htmlFor="actualPass" className="sr-only">
              Contraseña actual
            </label>

            <div className="relative">
              <input
                id="actualPass"
                type="password"
                {...register("actualPass", {
                  required: {
                    value: true,
                    message: "Ingrese su contraseña actual",
                  },
                })}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Contraseña actual"
              />
            </div>
          </div>
          {errors.actualPass && (
            <p className="text-rose-700 text-sm font-bold">
              {errors.actualPass.message}
            </p>
          )}

          <div className="text-gray-700">
            <label htmlFor="email" className="sr-only ">
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
            Cambiar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CambiarPassword;
