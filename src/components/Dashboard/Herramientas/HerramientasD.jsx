import { Link, Navigate } from "react-router-dom";
import { useState, useEffect, useContext, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav-Pag/Nav";
import Paginado from "../Nav-Pag/Paginado.jsx";
import { getAllHerramientas } from "../../../redux/actions.js";
import { CRMContext } from "../../../context/CRMContext.jsx";
import HerramientaCard from "./HerramientaCard.jsx";
import Spinner from "../../Layout/Spinner.jsx";

const HerramientasD = () => {
  const dispatch = useDispatch();
  const herramientas = useSelector((state) => state.herramientas);
  const [auth] = useContext(CRMContext);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllHerramientas(auth))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [auth, dispatch]);

  if (!auth.auth) {
    return <Navigate to={"/"} />;
  }

  // Filtrar las herramientas por las que están publicadas
  const herramientasPublicadas = herramientas.filter(
    (herramienta) => herramienta.publicado
  );

  // Calcular el número total de tarjetas publicadas
  const totalCards = herramientasPublicadas.length;

  // Calcular los índices de las tarjetas a mostrar en la página actual
  const lastIndex = currentPage * cardsPerPage;
  const firstIndex = lastIndex - cardsPerPage;

  return (
    <div className="min-h-full">
      <Nav />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Herramientas
          </h1>
        </div>
      </header>

      <main>
        <div className="flex flex-col md:flex-row justify-around">
          <Link to="/dashboard/herramientas/nueva">
            <button className="uppercase ml-10 md:ml-0  font-bold inline-block rounded-2xl bg-lime-600 border-none text-white text-center text-lg p-3 w-[200px] transition-all cursor-pointer my-10 hover:bg-lime-400">
              Nueva
            </button>
          </Link>
          <Link to="/dashboard/herramientas/solicitudes">
            <button className="uppercase font-bold inline-block rounded-2xl bg-indigo-600 border-none text-white text-center text-lg p-3 w-[200px] transition-all cursor-pointer ml-10 md:mx-14 my-10 hover:bg-indigo-400">
              solicitudes
            </button>
          </Link>
        </div>

        {loading ? ( // Mostrar indicador de carga mientras loading es true
          <Spinner />
        ) : (
          <Fragment>
            <Paginado
              cardsPerPage={cardsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalCards={totalCards}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-20 my-6">
              {herramientasPublicadas.length > 0 ? (
                herramientasPublicadas
                  .slice(firstIndex, lastIndex)
                  .map((herramienta) => (
                    <HerramientaCard
                      key={herramienta.id}
                      herramienta={herramienta}
                    />
                  ))
              ) : (
                <p className="text-2xl text-center py-10">
                  No hay herramientas publicadas
                </p>
              )}
            </div>
          </Fragment>
        )}
      </main>
    </div>
  );
};

export default HerramientasD;
