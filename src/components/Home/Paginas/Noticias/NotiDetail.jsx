import { useParams, Navigate, Link } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CRMContext } from "../../../../context/CRMContext.jsx";
import Sidebar from "../../Principal/Sidebar.jsx";
import { noticiasById } from "../../../../redux/actions.js";
import Spinner from "../../../Layout/Spinner.jsx";

const NotiDetail = ({ open, setOpen, loginData }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [auth] = useContext(CRMContext);
  const [loading, setLoading] = useState(true);

  const formatFecha = (fecha) => {
    // Convierte la fecha de la base de datos a un formato legible
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    dispatch(noticiasById(id, auth))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, id, auth]);

  let noticia = useSelector((state) => state.noticia);

  if (!auth.auth) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex">
      <Sidebar open={open} setOpen={setOpen} loginData={loginData} />
      <div className="p-3 text-center lg:col-span-3 xl:col-span-5 bg-gray-100 w-screen h-screen overflow-y-scroll">
        <div>
          <div className="text-left p-6">
            <div className="py-3 text-gray-900">
              {loading ? (
                <Spinner />
              ) : (
                <div className="grid grid-cols-1 gap-6 md:mx-20">
                  <Link to="/home/noticias">
                    <button className="uppercase bg-green-700 text-white font-bold w-[200px] text-center p-4 rounded-lg">
                      volver
                    </button>
                  </Link>
                  <div className="space-y-3">
                    <p className=" text-green-700 text-4xl font-bold uppercase">
                      {noticia.titulo}
                    </p>
                    <img
                      src={noticia.imagen}
                      alt={noticia.titulo}
                      className="w-96 h-auto rounded-md"
                    />
                    {noticia.usuario ? (
                      <p className="text-gray-700 m-0 p-0 text-sm text-justify">
                        Autor: {noticia.usuario.nombre}{" "}
                        {noticia.usuario.apellido}
                      </p>
                    ) : (
                      <p className="text-gray-700 m-0 p-0 text-sm text-justify">
                        Autor: Redacción Edutic
                      </p>
                    )}

                    <p className="text-gray-700 text-sm text-justify">
                      Fecha de publicación: {formatFecha(noticia.createdAt)}
                    </p>
                    <p className="text-gray-700 text-sm text-justify">
                      Fecha de actualización: {formatFecha(noticia.updatedAt)}
                    </p>

                    <p className="text-gray-700 text-base text-justify">
                      {noticia.contenido}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotiDetail;
