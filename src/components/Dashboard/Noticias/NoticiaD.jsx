import { Link, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllNoticias } from "../../../redux/actions.js";
import { CRMContext } from "../../../context/CRMContext.jsx";
import Nav from "../Nav-Pag/Nav.jsx";
import Paginado from "../Nav-Pag/Paginado.jsx";
import NoticiasCard from "./NoticiasCard.jsx";
import Spinner from "../../Layout/Spinner.jsx";

const NoticiaD = () => {
  const dispatch = useDispatch();
  const noticias = useSelector((state) => state.noticias);
  const [auth] = useContext(CRMContext);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllNoticias(auth))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [auth, dispatch]);

  if (!auth.auth) {
    return <Navigate to={"/"} />;
  }

  const noticiasPublicadas = noticias.filter((noticia) => noticia.publicado);

  const totalCards = noticiasPublicadas.length;

  const lastIndex = currentPage * cardsPerPage;
  const firstIndex = lastIndex - cardsPerPage;

  return (
    <div className="min-h-full">
      <Nav />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Noticias
          </h1>
        </div>
      </header>
      {loading ? (
        <Spinner />
      ) : (
        <main>
          <div className="flex flex-col md:flex-row justify-around">
            <Link to="/dashboard/noticias/nueva">
              <button className="uppercase ml-10 md:ml-0  font-bold inline-block rounded-2xl bg-lime-600 border-none text-white text-center text-lg p-3 w-[200px] transition-all cursor-pointer my-10 hover:bg-lime-400">
                Nueva
              </button>
            </Link>
            <Link to="/dashboard/noticias/solicitudes">
              <button className="uppercase font-bold inline-block rounded-2xl bg-indigo-600 border-none text-white text-center text-lg p-3 w-[200px] transition-all cursor-pointer ml-10 md:mx-14 my-10 hover:bg-indigo-400">
                solicitudes
              </button>
            </Link>
          </div>
          <Paginado
            cardsPerPage={cardsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalCards={totalCards}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-20 my-6">
            {noticiasPublicadas.length > 0 ? (
              noticiasPublicadas
                .slice(firstIndex, lastIndex)
                .map((noticia) => (
                  <NoticiasCard key={noticia.id} noticia={noticia} />
                ))
            ) : (
              <p className="text-2xl text-center py-10">No hay herramientas</p>
            )}
          </div>
        </main>
      )}
    </div>
  );
};

export default NoticiaD;
