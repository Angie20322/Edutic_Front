import { Link, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllMaterias } from "../../../redux/actions.js";
import { CRMContext } from "../../../context/CRMContext.jsx";
import Nav from "../Nav-Pag/Nav";
import Paginado from "../Nav-Pag/Paginado.jsx";
import MateriaCard from "./MateriaCard.jsx";
import Spinner from "../../Layout/Spinner.jsx";

const MateriasD = () => {
  const dispatch = useDispatch();
  const materias = useSelector((state) => state.materias);
  const [auth] = useContext(CRMContext);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;
  const totalCards = materias.length;
  const [loading, setLoading] = useState(true);

  const lastIndex = currentPage * cardsPerPage;
  const firstIndex = lastIndex - cardsPerPage;

  useEffect(() => {
    dispatch(getAllMaterias(auth))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [auth, dispatch]);

  if (!auth.auth) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="min-h-full">
      <Nav />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Materias
          </h1>
        </div>
      </header>
      {loading ? (
        <Spinner />
      ) : (
        <main>
          <Link to="/dashboard/materias/nueva">
            <button className="inline-block rounded-2xl bg-lime-500 border-none text-white text-center text-lg p-3 w-[200px] transition-all cursor-pointer mx-14 my-10 hover:bg-lime-400">
              Nueva Materia
            </button>
          </Link>
          <Paginado
            cardsPerPage={cardsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalCards={totalCards}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-20 my-6">
            {materias.length ? (
              materias
                .map((materia) => (
                  <MateriaCard key={materia.id} materia={materia} />
                ))
                .slice(firstIndex, lastIndex)
            ) : (
              <p className="text-2xl text-center py-10">No hay herramientas</p>
            )}
          </div>
        </main>
      )}
    </div>
  );
};

export default MateriasD;
