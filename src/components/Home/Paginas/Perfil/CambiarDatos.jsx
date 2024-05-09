import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import clienteAxios from "../../../../config/axios.js";

const CambiarDatos = (props) => {
  const { setModal, usuarioId, auth } = props;
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const realizarSolicitud = async (id, contenido) => {
    try {
      const res = await clienteAxios.post(
        `/usuarios/solicitudes/editar/${id}`,
        contenido,
        {
          headers: {
            Authorization: `Bearer ${auth.jwtToken}`,
          },
        }
      );
      return res;
    } catch (error) {
      const res = error;
      console.log(error.response.data.error);
      return res;
    }
  };

  const onSubmit = async (e) => {
    const resultado = await realizarSolicitud(usuarioId, {
      contenido: e.contenido,
    });
    if (resultado.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Se ha hecho la solicitud",
      });
      setModal(false);
      navigate("/home/noticias");
    } else {
      Swal.fire({
        icon: "error",
        title: "Error en la solicitud",
      });
    }
  };

  return (
    <div className=" h-[500px] overflow-y-scroll px-6 py-12 lg:px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm border-b-2 border-b-slate-200 pb-3">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 uppercase">
          Cambiar datos
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="text-gray-800 text-base">
          A continuación estará el espacio correspondiente para hacer la
          solicitud para cambiar datos. Ingrese cuales son los datos a cambiar y
          un administrador lo hará en el menor tiempo posible
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-white py-4 px-4">
          <form className=" mt-5" onSubmit={handleSubmit(onSubmit)}>
            <p className="text-sm leading-6 text-gray-900 font-bold mb-2">
              Ingrese su solicitud:
            </p>
            <div>
              <label
                htmlFor="contenido"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Recuerde que no podemos cambiar contraseñas o fotos de perfil
              </label>
              <textarea
                className={`w-full h-32 px-3 py-2 border placeholder-gray-400 rounded-md outline-none border-gray-500`}
                placeholder="Ingrese sus datos a cambiar. Ej: nombre: Fulano; apellido: De Tal; correo: un correo"
                id="contenido"
                {...register("contenido", {
                  required: "No deje este campo vacio",
                  minLength: {
                    value: 10,
                    message: "El mensaje no puede ser menor a 10 caracteres",
                  },
                })}
              ></textarea>
              {errors.contenido && (
                <p className="text-red-500 text-xs">
                  {errors.contenido.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="block w-full mt-3 rounded-lg bg-green-800 px-5 py-3 text-sm font-medium text-white hover:bg-green-700"
            >
              Confirmar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CambiarDatos;
