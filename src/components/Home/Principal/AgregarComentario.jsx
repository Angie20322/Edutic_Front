import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";

import { nuevoComentario } from "../../../redux/actions.js";

const verificarComentario = (comentario) => {
  const errores = {};
  if (!comentario.comentario.trim()) errores.comentario = "Espacio vacío";
  return errores;
};

const AgregarComentario = (props) => {
  const navigate = useNavigate()
  const { usuario, herramienta, auth } = props;
  const dispatch = useDispatch();
  const [errores, setErrores] = useState({});
  const initialComentario = {
    comentario: "",
    usuarioId: usuario,
    herramientaId: herramienta,
  };
  const [comentarios, setComentarios] = useState(initialComentario);

  const handleChange = (e) => {
    setComentarios({
      ...comentarios,
      [e.target.name]: e.target.value,
    });

    if (Object.keys(errores).length) {
      setErrores(
        verificarComentario({
          ...comentarios,
          [e.target.name]: e.target.value,
        })
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "¿Agregar comentario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, agregar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setErrores(verificarComentario(comentarios));
        if (comentarios.comentario && !Object.keys(errores).length) {
          dispatch(nuevoComentario(comentarios, auth));
          Swal.fire({
            title: "Comentario Agregado",
            icon: "success",
          });
          setComentarios("");
          navigate("/home/herramientas")
        } else {
          Swal.fire({
            icon: "error",
            title: "Debes ingresar un comentario",
            text: `${errores.comentario}`,
          });
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        type="text"
        value={comentarios.comentario}
        name="comentario"
        onChange={handleChange}
        className={`w-full h-20 border px-3 py-2 text-black border-gray-400 bg-white rounded-md shadow-md outline-none ${
          errores.nombre ? "border-red-600" : "border-gray-300"
        }`}
        placeholder="Agrega un comentario"
      ></textarea>
      <div className="flex justify-end">
        <button className="p-4 bg-green-700 rounded-sm my-2 text-white hover:bg-green-600">
          Comentar
        </button>
      </div>
    </form>
  );
};

export default AgregarComentario;
