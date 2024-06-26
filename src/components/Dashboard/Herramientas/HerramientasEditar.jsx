import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import verHerramienta from "./verHerramienta.js";
import { CRMContext } from "../../../context/CRMContext.jsx";
import { uploadImage, uploadDoc } from "../../../config/configFirebase.js";
import clienteAxios from "../../../config/axios.js";
import { getAllMaterias } from "../../../redux/actions.js";

const HerramientasEditar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { herramienta } = props;
  const [errores, setErrores] = useState({});
  const [imagenEdit, setImagenEdit] = useState("");
  const [doc, setDoc] = useState("");
  const { id, nombre, imagen, descripcion, manual, video, materias } =
    herramienta;
  const mat = materias.map((e) => {
    return e.nombre;
  });
  const initialHerramienta = {
    id,
    nombre,
    imagen,
    descripcion,
    manual,
    video,
    materias: mat,
  };
  const [herr, setHerr] = useState(initialHerramienta);
  const allMaterias = useSelector((state) => state.materias);
  const [auth] = useContext(CRMContext);

  const cambiarImagen = async () => {
    try {
      const result = await uploadImage(imagenEdit);
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

  useEffect(() => {
    dispatch(getAllMaterias(auth));
  }, [auth, dispatch]);

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

  const handleChange = (e) => {
    setHerr({
      ...herr,
      [e.target.name]: e.target.value,
    });
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
      setImagenEdit(file);
    } else {
      alert("Por favor, selecciona una imagen.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Editar herramienta",
      text: "¿Quieres editar esta herramienta?",
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
          let nuevaHerr;
          if (imagenEdit || doc) {
            const imageUrl = await cambiarImagen();
            const docUrl = await cambiarDoc();
            nuevaHerr = {
              ...herr,
              imagen: imageUrl,
              manual: docUrl,
            };
          } else {
            nuevaHerr = herr;
          }

          setErrores(verHerramienta(herr));
          if (
            herr.nombre &&
            herr.descripcion &&
            herr.video &&
            !Object.keys(errores).length
          ) {
            const res = await clienteAxios.put(
              `/herramientas/editar`,
              nuevaHerr,
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

  return (
    <div className="mt-10 mx-auto w-full ">
      <div className="bg-white py-4 px-4">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nombre{" "}
              <span className={errores.nombre ? "text-red-700" : "hidden"}>
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
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Imagen{" "}
              <span className={errores.imagen ? "text-red-700" : "hidden"}>
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
              htmlFor="descripcion"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Descripcion{" "}
              <span className={errores.descripcion ? "text-red-700" : "hidden"}>
                *
              </span>
            </label>
            <textarea
              className={`w-full h-32 px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                errores.descripcion ? "border-red-600" : "border-gray-300 "
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
              <span className={errores.video ? "text-red-700" : "hidden"}>
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
              Manual{" "}
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

          {Object.keys(errores).length ? (
            <p className="w-full text-red-700">* Espacio Obligatorio</p>
          ) : (
            <p></p>
          )}
          <p className="block text-basic mb-2 font-bold leading-6 text-gray-900">
            Herramientas:{" "}
          </p>
          {allMaterias?.map((e, index) => {
            const isChecked = herr.materias.includes(e.nombre);
            return (
              <div key={index} className="ml-7">
                <input
                  type="checkbox"
                  onChange={handleAgregarMateria}
                  name="materia"
                  checked={isChecked}
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
              Editar Herramienta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HerramientasEditar;
