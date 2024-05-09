import { Navigate } from "react-router-dom";
import { useState, useEffect, useContext, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllUsuarios } from "../../../redux/actions.js";
import { CRMContext } from "../../../context/CRMContext.jsx";
import Nav from "../Nav-Pag/Nav.jsx";
import Paginado from "../Nav-Pag/Paginado.jsx";
import UsuarioCard from "./UsuarioCard.jsx";
import Spinner from "../../Layout/Spinner.jsx";

const Usuarios = () => {
  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.usuarios);
  const [auth] = useContext(CRMContext);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;
  const [loading, setLoading] = useState(true);

  const totalCards = usuarios.length;

  const lastIndex = currentPage * cardsPerPage;
  const firstIndex = lastIndex - cardsPerPage;

  useEffect(() => {
    dispatch(getAllUsuarios(auth))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [auth, dispatch]);

  if (!auth.auth) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="min-h-full">
      <Nav />
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Usuarios
          </h1>
        </div>
      </div>
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
              {usuarios.length ? (
                usuarios
                  .map((usuario) => (
                    <div
                      key={usuario.id}
                      className="bg-gray-100 p-4 rounded shadow transform transition-transform hover:scale-105"
                    >
                      <UsuarioCard usuario={usuario} />
                    </div>
                  ))
                  .slice(firstIndex, lastIndex)
              ) : (
                <p className="text-2xl text-center py-10">No hay usuarios</p>
              )}
            </div>
          </main>
        </Fragment>
      )}
    </div>
  );
};

export default Usuarios;
