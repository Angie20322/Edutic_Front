import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

import NavBarConf from "./NavBarConf.jsx";
import clienteAxios from "../../config/axios.js";

const OlvidePass = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();

  const ingresarEmail = async (email) => {
    try {
      const res = await clienteAxios.post(`/password/resetpass/`, email);
      console.log(res);
      return res;
    } catch (error) {
      const res = error;
      console.log(error.response.data.error);
      return res;
    }
  };

  const onSubmit = async (e) => {
    const resultado = await ingresarEmail({
      email: e.email,
    });
    if (resultado.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Ha solicitado restablecer su contraseña",
        text: "Este pendiente de la bandeja de entrada de su email",
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
  return (
    <div className="min-h-screen mx-auto text-center">
      <NavBarConf />
      <h1 className="py-2 mt-10 text-4xl font-bold">Restablecer contraseña</h1>
      <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <form
            className="mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-center text-lg font-medium">
              Escriba su correo electrónico para restablecer su contraseña
            </p>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Se necesita un correo electrónico",
                    },
                    pattern: {
                      // value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Ingrese un correo electrónico válido",
                    },
                  })}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Su email"
                />
              </div>
            </div>
            {errors.email && (
              <p className="text-rose-700 text-sm font-bold">
                {errors.email.message}
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
    </div>
  );
};

export default OlvidePass;
