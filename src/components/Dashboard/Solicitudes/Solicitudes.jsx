import { Navigate } from "react-router-dom";
import { useState, useEffect, useContext, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllSolicitudes } from "../../../redux/actions.js";
import { CRMContext } from "../../../context/CRMContext.jsx";
import Nav from "../Nav-Pag/Nav.jsx";
import Paginado from "../Nav-Pag/Paginado.jsx";
import SolicitudesCard from "./SolicitudesCard.jsx";
import Spinner from "../../Layout/Spinner.jsx";

const Solicitudes = () => {
  const dispatch = useDispatch();
  const solicitudes = useSelector((state) => state.solicitudes);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;
  const [loading, setLoading] = useState(true);

  const totalCards = solicitudes.length;

  const lastIndex = currentPage * cardsPerPage;
  const firstIndex = lastIndex - cardsPerPage;

  const [auth] = useContext(CRMContext);

  useEffect(() => {
    dispatch(getAllSolicitudes(auth))
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
            Solicitudes
          </h1>
        </div>
      </header>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Paginado
            cardsPerPage={cardsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalCards={totalCards}
          />
          <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-5 md:mx-20 my-6">
              {solicitudes.length ? (
                solicitudes
                  .map((solicitud) => (
                    <div key={solicitud.id}>
                      <SolicitudesCard solicitud={solicitud} />
                    </div>
                  ))
                  .slice(firstIndex, lastIndex)
              ) : (
                <p className="text-2xl text-center py-10">No hay solicitudes</p>
              )}
            </div>
          </main>
        </Fragment>
      )}
    </div>
  );
};

export default Solicitudes;
