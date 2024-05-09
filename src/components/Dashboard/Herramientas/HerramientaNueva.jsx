import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useContext, Fragment, useEffect } from "react";
import Swal from "sweetalert2";

import { getAllMaterias, nuevaHerramienta } from "../../../redux/actions.js";
import { CRMContext } from "../../../context/CRMContext.jsx";
import verHerramienta from "./verHerramienta";
import imagenRef from "../../../images/image.png";
import { uploadImage, uploadDoc } from "../../../config/configFirebase.js";
import Nav from "../Nav-Pag/Nav";

const HerramientaNueva = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imagen, setImagen] = useState("");
  const [doc, setDoc] = useState("");
  const allMaterias = useSelector((state) => state.materias);
  const initialHerramienta = {
    nombre: "",
    imagen: "",
    descripcion: "",
    manual: "",
    video: "",
    materias: [],
    publicado: true,
  };
  const [herr, setHerr] = useState(initialHerramienta);
  const [errores, setErrores] = useState({});
  const [auth] = useContext(CRMContext);

  useEffect(() => {
    dispatch(getAllMaterias(auth));
  }, [auth, dispatch]);

  const cambiarImagen = async () => {
    try {
      const result = await uploadImage(imagen);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  const cambiarDoc = async () => {
    try {
      const result = await uploadDoc(doc);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setHerr({
      ...herr,
      [e.target.name]: e.target.value,
    });

    if (Object.keys(errores).length) {
      setErrores(
        verHerramienta({
          ...herr,
          [e.target.name]: e.target.value,
        })
      );
    }
  };

  const handleFileChange = (event) => {
    const archivo = event.target.files[0];
    if (archivo && archivo.type === "application/pdf") {
      setDoc(archivo);
    } else {
      alert("Por favor, selecciona un archivo PDF.");
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

  const handleAgregarMateria = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setHerr({
        ...herr,
        materias: [...herr.materias, value],
      });
    } else {
      setHerr({
        ...materias,
        materias: herr.materias.filter((x) => x !== value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Guardar herramienta?",
      text: "¿Quieres guardar esta herramienta",
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
          const docUrl = await cambiarDoc();
          const nuevaHerr = {
            ...herr,
            imagen: imageUrl,
            manual: docUrl,
          };
          setErrores(verHerramienta(herr));
          if (
            herr.nombre &&
            herr.descripcion &&
            imagen &&
            doc &&
            !Object.keys(errores).length
          ) {
            dispatch(nuevaHerramienta(nuevaHerr, auth));
            navigate("/dashboard/herramientas");
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
                Nueva Herramienta
              </h1>
            </div>
            <div className="mt-10">
              <div className="bg-white lg:mx-80 py-4 px-4">
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
                      placeholder="Nombre de la herramienta"
                      type="text"
                      value={herr.nombre}
                      name="nombre"
                      onChange={handleChange}
                      id="nombre"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="imagen"
                      className="block text-basic mb-2 font-bold leading-6 text-gray-900"
                    >
                      Imagen:
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
                        name="imagen"
                        accept="image/*"
                        onChange={handleImageChange}
                        id="imagen"
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
                      htmlFor="descripcion"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Descripcion{" "}
                      <span
                        className={
                          errores.descripcion ? "text-red-700" : "hidden"
                        }
                      >
                        *
                      </span>
                    </label>
                    <textarea
                      className={`w-full h-32 px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                        errores.descripcion
                          ? "border-red-600"
                          : "border-gray-300 "
                      }`}
                      placeholder="Descripcion"
                      type="text"
                      value={herr.descripcion}
                      name="descripcion"
                      onChange={handleChange}
                      id="descripcion"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="video"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Enlace video{" "}
                      <span
                        className={errores.video ? "text-red-700" : "hidden"}
                      >
                        *
                      </span>
                    </label>
                    <input
                      className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                        errores.video ? "border-red-600" : "border-gray-300 "
                      }`}
                      placeholder="Nombre de la herramienta"
                      type="text"
                      value={herr.video}
                      name="video"
                      onChange={handleChange}
                      id="video"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="manual"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Manual
                    </label>
                    <input
                      className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none `}
                      type="file"
                      name="manual"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      id="manual"
                    />
                  </div>
                  <p className="block text-basic mb-2 font-bold leading-6 text-gray-900">
                    Herramientas:{" "}
                  </p>
                  {allMaterias?.map((e, index) => {
                    return (
                      <div key={index} className="ml-7">
                        <input
                          type="checkbox"
                          onChange={handleAgregarMateria}
                          name="materia"
                          value={e.nombre}
                          className="outline-none focus:outline-none w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
                        />{" "}
                        <label className="outline-none focus:outline-none ms-2 text-sm font-medium text-gray-900">
                          {e.nombre}
                        </label>
                      </div>
                    );
                  })}
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-green-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
                    >
                      Crear Herramienta
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

export default HerramientaNueva;
