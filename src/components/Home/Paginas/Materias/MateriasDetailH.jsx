import { useParams, Navigate, Link, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState, Fragment } from "react";

import { CRMContext } from "../../../../context/CRMContext.jsx";
import Sidebar from "../../Principal/Sidebar";
import clienteAxios from "../../../../config/axios.js";
import Spinner from "../../../Layout/Spinner.jsx";

const MateriasDetailH = ({ open, setOpen, loginData }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [auth] = useContext(CRMContext);
  const [materia, setMateria] = useState({});
  const [loading, setLoading] = useState(true);

  const consultarApi = async () => {
    try {
      const clientesConsulta = await clienteAxios.get(
        `/materias/detail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.jwtToken}`,
          },
        }
      );

      // Guardar respuesta en estado local
      setMateria(clientesConsulta.data);
    } catch (error) {
      // Error actualizacion
      if (error.response.status === 500) {
        navigate("/home/materias");
        console.log(error);
      }
    }
  };

  useEffect(() => {
    consultarApi()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  if (!auth.auth) {
    return <Navigate to={"/"} />;
  }

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
                      {materia.nombre}
                    </p>
                    <Link to="/home/materias">
                      <button className="uppercase bg-green-700 text-white font-bold w-[200px] text-center p-4 rounded-lg">
                        volver
                      </button>
                    </Link>
                    <img
                      src={materia.imagen}
                      alt={materia.nombre}
                      className="h-96 w-auto"
                    />

                    <p className="py-2 font-bold text-lg text-green-600">
                      Descripción:{" "}
                      <p className="text-gray-700 py-2 font-normal text-base text-justify">
                        {materia.descripcion}
                      </p>
                    </p>
                    <div>
                      <p className="mb-2 text-green-600 font-bold">
                        Herramientas:
                      </p>
                      {materia.herramientas && (
                        <div className="text-sm ml-4">
                          {" "}
                          {materia.herramientas.map((herramienta) => (
                            <Link
                              key={herramienta.id}
                              to={`/home/herramientas/detail/${herramienta.id}`}
                            >
                              <p className="my-2 text-gray-900 hover:text-blue-800 hover:underline">
                                {herramienta.nombre}
                              </p>{" "}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MateriasDetailH;
