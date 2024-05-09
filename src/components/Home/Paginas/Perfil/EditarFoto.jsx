import { useState } from "react";
import Swal from "sweetalert2";

import imagenRef from "../../../../images/image.png";
import { uploadImage } from "../../../../config/configFirebase.js";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../../../config/axios.js";

const EditarFoto = ({ setModal, usuarioId, auth }) => {
  const navigate = useNavigate();
  const [imagen, setImagen] = useState();
  const [editar, setEditar] = useState({
    id: usuarioId,
    imagen: "",
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImagen(file);
    } else {
      alert("Por favor, selecciona una imagen.");
    }
  };

  const cambiarImagen = async () => {
    try {
      const result = await uploadImage(imagen);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let editImagen;
      if (imagen) {
        Swal.fire({
          title: "Subiendo foto",
          allowOutsideClick: false,
          showConfirmButton: false,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const imageUrl = await cambiarImagen();
        editImagen = {
          ...editar,
          imagen: imageUrl,
        };

        const res = await clienteAxios.put(
          `/usuarios/editar/${usuarioId}`,
          editImagen,
          {
            headers: {
              Authorization: `Bearer ${auth.jwtToken}`,
            },
          }
        );

        if (res.status === 200) {
          navigate("/home/noticias");
          setModal(false);
          Swal.close();
          Swal.fire({
            title: "Foto cambiada correctamente",
            icon: "success",
          });
          setEditar("");
        }
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
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="pt-20 p-6 flex flex-col items-center"
    >
      <div>
        <div className="bg-gray-300 p-4">
          <input
            className={`w-full px-3 py-2 border border-dashed border-gray-600 placeholder-gray-400 rounded-md outline-none `}
            type="file"
            name="imagen"
            accept="image/*"
            onChange={handleImageChange}
            id="manual"
          />
          {imagen ? (
            <div className="flex justify-center rounded-full items-center p-4">
              <img className="w-48" src={URL.createObjectURL(imagen)} />
            </div>
          ) : (
            <div className="flex justify-center rounded-full items-center p-4">
              <img className="w-40" src={imagenRef} />
            </div>
          )}
        </div>
      </div>

      <button className="mt-3 p-3 bg-green-800 text-white font-bold uppercase">
        Cambiar
      </button>
    </form>
  );
};

export default EditarFoto;
