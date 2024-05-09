import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useContext, Fragment } from "react";
import Swal from "sweetalert2";

import Nav from "../Nav-Pag/Nav";
import imagenRef from "../../../images/image.png";
import verNoticia from "./verNoticia.js";
import { nuevaNoticia } from "../../../redux/actions.js";
import { CRMContext } from "../../../context/CRMContext.jsx";
import { uploadImage } from "../../../config/configFirebase.js";

const NoticiaNueva = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auth] = useContext(CRMContext);
  const [imagen, setImagen] = useState("");
  const initialNoticia = {
    titulo: "",
    imagen: "",
    contenido: "",
  };
  const [noti, setNoti] = useState(initialNoticia);
  const [errores, setErrores] = useState({});

  const cambiarImagen = async () => {
    try {
      const result = await uploadImage(imagen);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImagen(file);
    } else {
      alert("Por favor, selecciona una imagen.");
    }
  };

  const handleChange = (e) => {
    setNoti({
      ...noti,
      [e.target.name]: e.target.value,
    });

    if (Object.keys(errores).length) {
      setErrores(
        verNoticia({
          ...noti,
          [e.target.name]: e.target.value,
        })
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Guardar Noticia?",
      text: "¿Quieres guardar esta noticia?",
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
          const imageUrl = await cambiarImagen();
          const nuevaNoti = {
            ...noti,
            imagen: imageUrl,
          };
          setErrores(verNoticia(noti));
          if (
            noti.titulo &&
            noti.contenido &&
            imagen &&
            !Object.keys(errores).length
          ) {
            dispatch(nuevaNoticia(nuevaNoti, auth));
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
                Nueva Noticia
              </h1>
            </div>
            <div className="mt-10">
              <div className="bg-white lg:mx-80 py-4 px-4">
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="titulo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Título{" "}
                      <span
                        className={errores.titulo ? "text-red-700" : "hidden"}
                      >
                        *
                      </span>
                    </label>
                    <input
                      className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                        errores.titulo ? "border-red-600" : "border-gray-300 "
                      }`}
                      placeholder="Título de la noticia"
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
                      className="block text-basic mb-2 font-bold leading-6 text-gray-900"
                    >
                      Imagen{" "}
                      <span
                        className={errores.imagen ? "text-red-700" : "hidden"}
                      >
                        *
                      </span>
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
                      {imagen ? (
                        <div className="flex justify-center items-center p-4">
                          <img
                            className="w-48"
                            src={URL.createObjectURL(imagen)}
                          />
                        </div>
                      ) : (
                        <div className="flex justify-center items-center p-4">
                          <img className="w-40" src={imagenRef} />
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
                      <span
                        className={
                          errores.contenido ? "text-red-700" : "hidden"
                        }
                      >
                        *
                      </span>
                    </label>
                    <textarea
                      className={`w-full h-32 px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                        errores.contenido
                          ? "border-red-600"
                          : "border-gray-300 "
                      }`}
                      placeholder="contenido de la noticia"
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
                      Crear Noticia
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

export default NoticiaNueva;
