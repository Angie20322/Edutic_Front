import { Link, Navigate } from "react-router-dom";
import { useEffect, useContext, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../../Principal/Sidebar";
import { getAllNoticias } from "../../../../redux/actions.js";
import { CRMContext } from "../../../../context/CRMContext.jsx";
import Spinner from "../../../Layout/Spinner.jsx";

const Noticias = ({ open, setOpen, loginData }) => {
  const dispatch = useDispatch();
  const noticias = useSelector((state) => state.noticias);
  const [auth] = useContext(CRMContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllNoticias(auth))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [auth, dispatch]);

  if (!auth.auth) {
    return <Navigate to={"/"} />;
  }

  const noticasPublicadas = noticias.filter((noticia) => noticia.publicado);

  return (
    <div className="flex">
      <Sidebar open={open} setOpen={setOpen} loginData={loginData} />
      <div className="p-7 text-2xl font-semibold flex-1 w-screen h-screen overflow-y-auto">
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <div className="p-2">
              <h1 className="md:text-[60px] text-4xl text-center mt-10 text-green-500">
                Noticias
              </h1>
              {loginData.usuario.rol === "colegio" && (
                <Link to={"/home/noticias/agregar"}>
                  <button className="bg-sky-700 hover:bg-sky-600 my-10 md:m-10 text-white p-4 rounded-lg text-lg md:text-2xl">
                    Sugiere tu noticia
                  </button>
                </Link>
              )}
            </div>
            {noticasPublicadas.length > 0 ? (
              <div>
                {noticasPublicadas.map((e, index) => {
                  return (
                    <article
                      key={index}
                      className="md:mx-20 my-10 flex bg-white transition hover:shadow-xl"
                    >
                      <div className="hidden sm:block sm:basis-56">
                        <img
                          alt={e.titulo}
                          src={e.imagen}
                          className="aspect-square h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                          <Link to="">
                            <h3 className="font-bold uppercase text-gray-900">
                              {e.titulo}
                            </h3>
                          </Link>

                          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                            {e.contenido}
                          </p>
                        </div>

                        <div className="sm:flex sm:items-end sm:justify-end">
                          <Link
                            to={`/home/noticias/detail/${e.id}`}
                            className="block bg-green-500 text-white px-5 py-3 text-center text-xs font-bold uppercase transition hover:bg-green-200 hover:text-green-700"
                          >
                            Leer más
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <p>No hay noticias</p>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Noticias;
