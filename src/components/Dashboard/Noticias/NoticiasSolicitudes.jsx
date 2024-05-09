import { FiArrowLeft } from "react-icons/fi";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useContext, useState } from "react";

import Nav from "../Nav-Pag/Nav.jsx";
import { CRMContext } from "../../../context/CRMContext.jsx";
import { getAllNoticias } from "../../../redux/actions";
import Spinner from "../../Layout/Spinner.jsx";

const NoticiasSolicitudes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auth] = useContext(CRMContext);
  const [loading, setLoading] = useState(true);

  const noticias = useSelector((state) => state.noticias);

  const formatFecha = (fecha) => {
    // Convierte la fecha de la base de datos a un formato legible
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    dispatch(getAllNoticias(auth))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [auth, dispatch]);

  const cancelarButton = () => {
    navigate("/dashboard/noticias");
  };

  if (!auth.auth) {
    return <Navigate to={"/"} />;
  }

  const noticiasNoPublicadas = noticias.filter((noticia) => !noticia.publicado);

  return (
    <div className="min-h-full overflow-y-scroll">
      <Nav />
      <div className="lg:col-span-3 xl:col-span-5 bg-gray-100 h-screen p-10">
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 ">
              <h2 className="text-4xl mx-20 pt-6 font-semibold">
                Solicitudes de noticias
              </h2>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <button
                  className="text-gray-600 hover:text-gray-800 focus:outline-none flex items-center"
                  onClick={cancelarButton}
                >
                  <FiArrowLeft className="mr-1" /> Volver
                </button>
              </div>
            </div>
            <section className="m-10">
              <div className="grid grid-cols-1 gap-12 lg:gap-24 lg:grid-cols-2">
                {noticiasNoPublicadas.length > 0 ? (
                  noticiasNoPublicadas.map((noticia) => {
                    return (
                      <div
                        key={noticia.id}
                        className="sm:flex lg:items-start group"
                      >
                        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                          <img
                            className="w-full rounded-md sm:h-32 sm:w-32 object-cover"
                            src={noticia.imagen}
                            alt="text"
                          />
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">
                            {formatFecha(noticia.createdAt)}
                          </span>
                          <p className="mt-3 text-lg font-medium leading-6">
                            <Link
                              to={`/dashboard/noticias/solicitudes/${noticia.id}`}
                              className="text-xl text-gray-800 hover:text-gray-500"
                            >
                              {noticia.titulo}
                            </Link>
                          </p>
                          <p className="mt-2 line-clamp-3 text leading-normal text-gray-500">
                            {noticia.contenido}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-2xl text-center py-10">
                    No hay solicitudes
                  </p>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticiasSolicitudes;
