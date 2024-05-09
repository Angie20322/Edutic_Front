import { useParams, Navigate, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useContext, useState, Fragment } from "react";
import { BsDownload } from "react-icons/bs";
import { BiSolidUserCircle } from "react-icons/bi";
import ReactPlayer from "react-player";

import { getAllComentarios } from "../../../../redux/actions.js";
import { CRMContext } from "../../../../context/CRMContext.jsx";
import Sidebar from "../../Principal/Sidebar";
import AgregarComentario from "../../Principal/AgregarComentario.jsx";
import clienteAxios from "../../../../config/axios.js";
import Spinner from "../../../Layout/Spinner.jsx";

const HerramientasDetailH = ({ open, setOpen, loginData }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [auth] = useContext(CRMContext);
  const [herramienta, setHerramienta] = useState({});
  const [loading, setLoading] = useState(true);

  const formatFecha = (fecha) => {
    // Convierte la fecha de la base de datos a un formato legible
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const consultarApi = async () => {
    try {
      const clientesConsulta = await clienteAxios.get(
        `/herramientas/detail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.jwtToken}`,
          },
        }
      );

      // Guardar respuesta en estado local
      setHerramienta(clientesConsulta.data);
    } catch (error) {
      // Error actualizacion
      if (error.response.status === 500) {
        navigate("/dashboard/herramientas");
        console.log(error);
      }
    }
  };

  useEffect(() => {
    consultarApi()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    dispatch(getAllComentarios(auth));
  }, [auth, dispatch]);

  let comentarios = useSelector((state) => state.comentarios);
  const herramientaComentarios = comentarios.filter(
    (comentario) => comentario.herramienta?.id === id
  );

  if (!auth.auth) {
    return <Navigate to={"/"} />;
  }

  if (loading) {
    <Spinner />;
  } else {
    return (
      <div className="flex">
        <Sidebar open={open} setOpen={setOpen} loginData={loginData} />
        <div className="p-3 text-center lg:col-span-3 xl:col-span-5 bg-gray-100 w-screen h-screen overflow-y-scroll">
          <div>
            <div className="text-left">
              <div className="text-basic py-3 text-gray-900">
                {loading ? (
                  <Spinner />
                ) : (
                  <Fragment>
                    <div className="grid grid-cols-1 gap-6 md:mx-20">
                      <p className="font-bold text-4xl text-green-800 py-6 text-center">
                        {herramienta.nombre}
                      </p>
                      <Link to="/home/herramientas">
                        <button className="uppercase my-6 bg-green-700 text-white font-bold w-[200px] text-center p-4 rounded-lg">
                          volver
                        </button>
                      </Link>
                      <div className="flex flex-col md:flex-row justify-around gap-3">
                        <img
                          src={herramienta.imagen}
                          alt={herramienta.nombre}
                          className="h-auto md:w-1/2"
                        />

                        {herramienta.video ? (
                          <div className="md:flex-1">
                            <ReactPlayer
                              url={herramienta.video}
                              className="react-player"
                              width="100%"
                              height="100%"
                            />
                          </div>
                        ) : (
                          <p className="flex-1 items-center text-center">
                            Video aun no disponible
                          </p>
                        )}
                      </div>

                      <p className="py-2 font-bold text-lg text-green-600">
                        Descripción:{" "}
                        <p className="text-gray-700 py-2 font-normal text-base text-justify">
                          {herramienta.descripcion}
                        </p>
                      </p>
                      <p className="py-2 font-bold text-lg text-green-600">
                        Materias:
                      </p>
                      {herramienta.materias && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center text-white ">
                          {herramienta.materias.map((materia) => (
                            <Link
                              key={materia.id}
                              to={`/home/materias/detail/${materia.id}`}
                            >
                              <p className="p-2 mx-6 bg-green-600 my-3 hover:bg-green-700">
                                {materia.nombre}
                              </p>
                            </Link>
                          ))}
                        </div>
                      )}
                      <div>
                        <p className="py-2 font-bold text-lg text-green-600">
                          Manual aquí:
                        </p>
                        <Link to={herramienta.manual} target="_blank">
                          <BsDownload className="text-[84px] bg-red-600 p-4 text-white font-bold" />
                        </Link>
                      </div>
                      <p className="py-2 font-bold text-lg text-green-600">
                        Comentarios:
                      </p>
                      {herramientaComentarios.length === 0 ? (
                        <p className="text-gray-700 py-2 font-normal text-base text-justify">
                          No hay comentarios
                        </p>
                      ) : (
                        herramientaComentarios.map((c) => (
                          <div key={c.id} className="md:p-2 w-full bg-gray-200">
                            <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                              <div className="w-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                                {c.usuario.imagen ? (
                                  <img
                                    src={c.usuario.imagen}
                                    alt={`Imagen de ${c.usuario.nombre} ${c.usuario.apellido}`}
                                    className="rounded-full w-14 h-14"
                                  />
                                ) : (
                                  <BiSolidUserCircle className="w-14 h-14" />
                                )}
                              </div>
                              <div className="flex-grow">
                                <div>
                                  <p className="text-gray-700 py-2 italic font-normal text-base text-left">
                                    {c.usuario.nombre} {c.usuario.apellido} el{" "}
                                    {formatFecha(c.createdAt)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-700 py-2 font-normal text-base text-justify">
                                    {c.comentario}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                      {herramienta && loginData.usuario.rol === "colegio" && (
                        <AgregarComentario
                          usuario={loginData.usuario.id}
                          herramienta={herramienta.id}
                          auth={auth}
                        />
                      )}
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default HerramientasDetailH;
