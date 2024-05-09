import { Link, Navigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../../Principal/Sidebar";
import { getAllHerramientas } from "../../../../redux/actions.js";
import { CRMContext } from "../../../../context/CRMContext.jsx";

const HerramientasH = ({ open, setOpen, loginData }) => {
  const dispatch = useDispatch();
  const herramientas = useSelector((state) => state.herramientas);
  const [auth] = useContext(CRMContext);

  useEffect(() => {
    dispatch(getAllHerramientas(auth));
  }, [auth, dispatch]);

  if (!auth.auth) {
    return <Navigate to={"/"} />;
  }

  const herramientasPublicadas = herramientas.filter(
    (herramienta) => herramienta.publicado
  );

  const herramientasEmpresa = herramientas.filter(
    (herramienta) => herramienta.usuarioId === loginData.usuario.id
  );

  if (loginData.usuario.rol === "colegio") {
    return (
      <div className="flex">
        <Sidebar open={open} setOpen={setOpen} loginData={loginData} />
        <div className="md:p-7 text-2xl font-semibold flex-1 h-screen overflow-y-auto">
          <div className="p-2 mb-14">
            <h1 className="md:text-[60px] text-4xl text-center mt-10 text-green-500">
              Herramientas
            </h1>
          </div>
          {herramientasPublicadas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-5 ">
              {herramientasPublicadas.map((e, index) => {
                return (
                  <Link
                    key={index}
                    to={`/home/herramientas/detail/${e.id}`}
                    className="group block bg-green-100 p-4 shadow-md rounded-md hover:bg-green-200 duration-100"
                  >
                    <img
                      src={e.imagen}
                      alt={e.nombre}
                      className="aspect-square w-full rounded object-cover"
                    />

                    <div className="mt-3">
                      <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4 duration-100">
                        {e.nombre}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p>No hay Herramientas</p>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex">
        <Sidebar open={open} setOpen={setOpen} loginData={loginData} />
        <div className="p-7 text-2xl font-semibold flex-1 w-screen h-screen overflow-y-auto">
          <div className="p-2 mb-14">
            <h1 className="text-[60px] text-center mt-10 text-green-500">
              Herramientas
            </h1>
            <Link to={"/home/herramientas/agregar"}>
              <button className="bg-sky-700 hover:bg-sky-600 my-10 md:m-10 text-white p-4 rounded-lg text-lg md:text-2xl">
                Agrega tu herramienta
              </button>
            </Link>
          </div>
          {herramientasEmpresa.length > 0 ? (
            <div className="grid grid-cols-3 gap-8 m-5 ">
              {herramientasEmpresa.map((e, index) => {
                return (
                  <Link
                    key={index}
                    to={`/home/herramientas/detail/${e.id}`}
                    className="group block bg-green-100 p-4 shadow-md rounded-md hover:bg-green-200 duration-100"
                  >
                    <img
                      src={e.imagen}
                      alt={e.nombre}
                      className="aspect-square w-full rounded object-cover"
                    />

                    <div className="mt-3">
                      <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4 duration-100">
                        {e.nombre}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-8 m-5 ">
              <p>No ha creado herramientas</p>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default HerramientasH;
