import { Navigate, Link } from "react-router-dom";
import { useState, useEffect, useContext, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllAdmin } from "../../../redux/actions.js";
import { CRMContext } from "../../../context/CRMContext.jsx";
import Nav from "../Nav-Pag/Nav.jsx";
import Paginado from "../Nav-Pag/Paginado.jsx";
import AdminCard from "./AdminCard.jsx";
import Spinner from "../../Layout/Spinner.jsx";

const Admins = ({ loginData }) => {
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins);
  const [auth] = useContext(CRMContext);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;
  const [loading, setLoading] = useState(true);

  const totalCards = admins.length;

  const lastIndex = currentPage * cardsPerPage;
  const firstIndex = lastIndex - cardsPerPage;

  useEffect(() => {
    dispatch(getAllAdmin(auth))
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
            Miembros
          </h1>
        </div>
      </header>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <main>
            <Link to="/dashboard/miembros/nuevo">
              <button className="inline-block rounded-2xl bg-lime-600 border-none text-white text-center text-lg p-3 w-[200px] transition-all cursor-pointer mx-14 my-10 hover:bg-lime-400">
                Nuevo Miembro
              </button>
            </Link>

            <Paginado
              cardsPerPage={cardsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalCards={totalCards}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-20 my-6">
              {admins.length ? (
                admins
                  .map((admin) => (
                    <div
                      key={admin.id}
                      className="bg-gray-100 p-4 rounded shadow transform transition-transform hover:scale-105"
                    >
                      <AdminCard loginData={loginData} admin={admin} />
                    </div>
                  ))
                  .slice(firstIndex, lastIndex)
              ) : (
                <p className="text-2xl text-center py-10">No hay Miembros</p>
              )}
            </div>
          </main>
        </Fragment>
      )}
    </div>
  );
};

export default Admins;
