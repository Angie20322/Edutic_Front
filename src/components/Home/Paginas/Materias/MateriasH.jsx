import { Link, Navigate } from "react-router-dom";
import { useEffect, useContext, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../../Principal/Sidebar";
import { getAllMaterias } from "../../../../redux/actions.js";
import { CRMContext } from "../../../../context/CRMContext.jsx";
import Spinner from "../../../Layout/Spinner.jsx";

const MateriasH = ({ open, setOpen, loginData }) => {
  const dispatch = useDispatch();
  const materias = useSelector((state) => state.materias);
  const [auth] = useContext(CRMContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllMaterias(auth))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [auth, dispatch]);

  if (!auth.auth) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex">
      <Sidebar open={open} setOpen={setOpen} loginData={loginData} />
      <div className="p-7 text-2xl font-semibold flex-1 h-screen w-screen overflow-y-auto">
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <div className="p-2 mb-14">
              <h1 className="md:text-[60px] text-4xl text-center mt-10 text-green-500">
                Materias
              </h1>
            </div>
            {materias.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 md:m-5">
                {materias.map((e, index) => {
                  return (
                    <Link
                      key={index}
                      to={`/home/materias/detail/${e.id}`}
                      className="group relative block bg-black h-96"
                    >
                      <img
                        alt=""
                        src={e.imagen}
                        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                      />

                      <div className="relative p-4 sm:p-6 lg:p-8">
                        <p className="text-sm uppercase tracking-widest bg-pink-500  text-center font-bold">
                          Materia
                        </p>

                        <p className="text-xl font-bold text-white sm:text-2xl text-center">
                          {e.nombre}
                        </p>

                        <div className="mt-16 sm:mt-32 lg:mt-48">
                          <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                            <p className="text-sm text-white line-clamp-4">
                              {e.descripcion}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p>No hay Materias</p>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default MateriasH;
