import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import verNoticia from "./verNoticia.js";
import { CRMContext } from "../../../context/CRMContext.jsx";
import { uploadImage } from "../../../config/configFirebase.js";
import clienteAxios from "../../../config/axios.js";

const NoticiaEditar = (props) => {
  const navigate = useNavigate();
  const { noticia } = props;
  const [errores, setErrores] = useState({});
  const [auth] = useContext(CRMContext);
  const [imagenEdit, setImagenEdit] = useState("");
  const { id, titulo, imagen, contenido } = noticia;
  const initialNoticia = {
    id,
    titulo,
    imagen,
    contenido,
  };
  const [noti, setNoti] = useState(initialNoticia);

  const cambiarImagen = async () => {
    try {
      const result = await uploadImage(imagenEdit);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImagenEdit(file);
    } else {
      alert("Por favor, selecciona una imagen.");
    }
  };

  const handleChange = (e) => {
    setNoti({
      ...noti,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Editar noticia",
      text: "¿Quieres editar esta noticia?",
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
          let nuevaNoti;
          if (imagenEdit) {
            const imageUrl = await cambiarImagen();
            nuevaNoti = {
              ...noti,
              imagen: imageUrl,
            };
          } else {
            nuevaNoti = noti;
          }

          setErrores(verNoticia(noti));
          if (noti.titulo && noti.contenido && !Object.keys(errores).length) {
            const res = await clienteAxios.put(
              "/noticias/editar",
              nuevaNoti,
              {
                headers: {
                  Authorization: `Bearer ${auth.jwtToken}`,
                },
              }
            );
            if (res.status === 200) {
              Swal.fire({
                title: "Editado correctamente",
                icon: "success",
              });
            }
            navigate("/dashboard/noticias");
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

  return (
    <div className="mt-10 mx-auto w-full ">
      <div className="bg-white py-4 px-4">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="titulo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Titulo{" "}
              <span className={errores.titulo ? "text-red-700" : "hidden"}>
                *
              </span>
            </label>
            <input
              className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                errores.titulo ? "border-red-600" : "border-gray-300 "
              }`}
              placeholder="Titulo de la noticia"
              type="text"
              value={noti.titulo}
              name="titulo"
              onChange={handleChange}
              id="titulo"
            />
          </div>

          <div>
            <label
              htmlFor="imagen"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Imagen
            </label>
            <div className="bg-gray-300 p-4">
              <input
                className={`w-full px-3 py-2 border border-dashed border-gray-600 placeholder-gray-400 rounded-md outline-none `}
                type="file"
                name="manual"
                accept="image/*"
                onChange={handleImageChange}
                id="manual"
              />
              {imagenEdit ? (
                <div className="flex justify-center items-center p-4">
                  <img className="w-48" src={URL.createObjectURL(imagenEdit)} />
                </div>
              ) : (
                <div className="flex justify-center items-center p-4">
                  <img className="w-40" src={imagen} />
                </div>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="contenido"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Contenido{" "}
              <span className={errores.contenido ? "text-red-700" : "hidden"}>
                *
              </span>
            </label>
            <textarea
              className={`w-full h-32 px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                errores.contenido ? "border-red-600" : "border-gray-300 "
              }`}
              placeholder="Contenido de la noticia"
              type="text"
              value={noti.contenido}
              name="contenido"
              onChange={handleChange}
              id="contenido"
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
              Editar Noticia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoticiaEditar;
