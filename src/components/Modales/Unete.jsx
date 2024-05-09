import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import { getState, getCity, addSolicitud } from "../../redux/actions.js";
import uneteVerificacion from "./uneteVerficacion.js";

const Unete = (props) => {
  const dispatch = useDispatch();
  const { setModal } = props;
  const states = useSelector((state) => state.states);
  const cities = useSelector((state) => state.cities);

  const initialSolicitud = {
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    departamento: "",
    ciudad: "",
    colegio: "",
    nit: "",
    direccion: "",
    enfasis: "",
    rol: "",
  };

  const [solicitud, setSolicitud] = useState(initialSolicitud);
  const [openD, setOpenD] = useState(false);
  const [openC, setOpenC] = useState(false);
  const [st, setSt] = useState("");
  const [input, setInput] = useState("");
  const [errores, setErrores] = useState({});

  useEffect(() => {
    try {
      dispatch(getState());
    } catch (error) {
      console.log(error.message);
    }
  }, [dispatch]);

  useEffect(() => {
    try {
      dispatch(getCity(st));
    } catch (error) {
      console.log(error.message);
    }
  }, [dispatch, st]);

  const handleChange = (e) => {
    setSolicitud({
      ...solicitud,
      [e.target.name]: e.target.value,
    });

    if (Object.keys(errores).length) {
      setErrores(
        uneteVerificacion({
          ...solicitud,
          [e.target.name]: e.target.value,
        })
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrores(uneteVerificacion(solicitud));
    if (
      solicitud.nombre &&
      solicitud.apellido &&
      solicitud.email &&
      solicitud.telefono &&
      solicitud.departamento &&
      solicitud.ciudad &&
      solicitud.colegio &&
      solicitud.nit &&
      solicitud.direccion &&
      !Object.keys(errores).length
    ) {
      try {
        dispatch(addSolicitud(solicitud));
        Swal.fire({
          icon: "success",
          title: "Solicitud enviada",
          text: "se ha enviado la solicitud correctamente",
        });
        setSolicitud(initialSolicitud);
        setModal(false);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error en la solicitud",
          text: error.message,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error en la solicitud",
        text: "Hay espacios vacíos",
      });
    }
  };

  return (
    <div className=" h-[500px] overflow-y-scroll px-6 py-12 lg:px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm border-b-2 border-b-slate-200 pb-3">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 uppercase">
          únete a edutic
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="text-gray-800 text-base">
          Para ser parte de esta comunidad solo debes llenar esta solicitud con
          los datos solicitados y alguien se pondrá en contacto contigo
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-white py-4 px-4">
          <p className="text-sm leading-6 text-gray-900 font-bold">
            ¿Qué quieres hacer con nosotros?
          </p>
          <form className="space-y-6 mt-2">
            <label className="text-sm font-medium leading-6 text-gray-900">
              <input
                type="radio"
                value="colegio"
                name="rol"
                onChange={handleChange}
                className="mr-2"
              />
              Adquisición de nuevas herramientas para impartir las
              clases(Profesor)
            </label>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              <input
                type="radio"
                value="empresa"
                onChange={handleChange}
                name="rol"
                className="mr-2"
              />
              Subir herramientas tecnológicas útiles para la educación(Empresa)
            </label>
          </form>
          {solicitud.rol && (
            <form className=" mt-5" onSubmit={handleSubmit}>
              <p className="text-sm leading-6 text-gray-900 font-bold mb-2">
                Ahora tus datos:
              </p>
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nombre{" "}
                  <span className={errores.nombre ? "text-red-700" : "hidden"}>
                    *
                  </span>
                </label>
                <input
                  className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                    errores.nombre ? "border-red-600" : "border-gray-300 "
                  }`}
                  placeholder="Ingresa tu(s) nombre(s)"
                  type="text"
                  value={solicitud.nombre}
                  name="nombre"
                  onChange={handleChange}
                  id="nombre"
                />
              </div>

              <div>
                <label
                  htmlFor="apellido"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Apellido{" "}
                  <span
                    className={errores.apellido ? "text-red-700" : "hidden"}
                  >
                    *
                  </span>
                </label>
                <input
                  className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                    errores.apellido ? "border-red-600" : "border-gray-300 "
                  }`}
                  placeholder="Ingresa tu(s) apellido(s)"
                  type="text"
                  value={solicitud.apellido}
                  name="apellido"
                  onChange={handleChange}
                  id="apellido"
                />
              </div>

              <div>
                <label
                  htmlFor="telefono"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Teléfono{" "}
                  <span
                    className={errores.telefono ? "text-red-700" : "hidden"}
                  >
                    *
                  </span>
                </label>
                <input
                  className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                    errores.telefono ? "border-red-600" : "border-gray-300 "
                  }`}
                  placeholder="3100000000 o 6018000000"
                  type="number"
                  value={solicitud.telefono}
                  name="telefono"
                  onChange={handleChange}
                  id="telefono"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Correo electrónico{" "}
                  <span className={errores.email ? "text-red-700" : "hidden"}>
                    *
                  </span>
                </label>
                <input
                  className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                    errores.email ? "border-red-600" : "border-gray-300 "
                  }`}
                  placeholder="correo@correo.com"
                  type="email"
                  value={solicitud.email}
                  name="email"
                  onChange={handleChange}
                  id="email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Departamento
                </label>
                <div className="text-sm font-medium">
                  <div
                    onClick={() => setOpenD(!openD)}
                    className={`bg-white border-solid border-2 text-gray-900 w-full p-2 flex items-center justify-between rounded ${
                      !solicitud.departamento && "text-gray-900"
                    }`}
                  >
                    {solicitud.departamento
                      ? solicitud.departamento?.length > 25
                        ? solicitud.departamento?.substring(0, 25) + "..."
                        : solicitud.departamento
                      : "Seleccione departameno"}{" "}
                    <BiChevronDown
                      size={20}
                      className={`${openD && "rotate-180"}`}
                    />
                  </div>
                  <ul
                    className={`mt-2 bg-white border-solid overflow-y-auto ${
                      openD ? "max-h-60" : "max-h-0"
                    }`}
                  >
                    <div className="flex items-center px-2 sticky top-0 bg-white border-solid border-2">
                      <AiOutlineSearch size={20} className="text-gray-600" />
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value.toLowerCase())}
                        placeholder="búsqueda"
                        className="placeholder:text-gray-600 p-2 outline-none w-full bg-white"
                      />
                    </div>
                    {states?.map((e, index) => {
                      return (
                        <li
                          key={index}
                          className={`p-2 hover:bg-gray-300 ${
                            e?.departamento?.toLowerCase() ===
                              solicitud.departamento?.toLowerCase() &&
                            "bg-gray-200"
                          } ${
                            e?.departamento?.toLowerCase().startsWith(input)
                              ? "block"
                              : "hidden"
                          }`}
                          onClick={() => {
                            if (
                              e?.departamento?.toLowerCase() !==
                              solicitud.departamento.toLowerCase()
                            ) {
                              setSolicitud({
                                ...solicitud,
                                departamento: e?.departamento,
                                ciudad: "",
                              });
                              setOpenD(false);
                              setInput("");
                              setSt(e.departamento);
                            }
                          }}
                        >
                          {e.departamento}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Ciudad
                </label>
                <div className="text-sm font-medium">
                  <div
                    onClick={() => setOpenC(!openC)}
                    className={`bg-white border-solid border-2 text-gray-900 w-full p-2 flex items-center justify-between rounded ${
                      !solicitud.ciudad && "text-gray-900"
                    }`}
                  >
                    {solicitud.ciudad
                      ? solicitud.ciudad?.length > 25
                        ? solicitud.ciudad?.substring(0, 25) + "..."
                        : solicitud.ciudad
                      : "Seleccione ciudad"}{" "}
                    <BiChevronDown
                      size={20}
                      className={`${openC && "rotate-180"}`}
                    />
                  </div>
                  <ul
                    className={`mt-2 bg-white border-solid overflow-y-auto ${
                      openC ? "max-h-60" : "max-h-0"
                    }`}
                  >
                    <div className="flex items-center px-2 sticky top-0 bg-white border-solid border-2">
                      <AiOutlineSearch size={20} className="text-gray-600" />
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value.toLowerCase())}
                        placeholder="búsqueda"
                        className="placeholder:text-gray-600 p-2 outline-none w-full bg-white"
                      />
                    </div>
                    {cities?.map((e, index) => {
                      return (
                        <li
                          key={index}
                          className={`p-2 hover:bg-gray-300 ${
                            e?.municipio?.toLowerCase() ===
                              solicitud.ciudad?.toLowerCase() && "bg-gray-200"
                          } ${
                            e?.municipio?.toLowerCase().startsWith(input)
                              ? "block"
                              : "hidden"
                          }`}
                          onClick={() => {
                            if (
                              e?.municipio?.toLowerCase() !==
                              solicitud.ciudad.toLowerCase()
                            ) {
                              setSolicitud({
                                ...solicitud,
                                ciudad: e?.municipio,
                              });
                              setOpenC(false);
                              setInput("");
                            }
                          }}
                        >
                          {e.municipio}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div>
                <label
                  htmlFor="colegio"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {solicitud.rol === "colegio"
                    ? "Institución Educativa"
                    : "Razón Social"}
                  <span className={errores.colegio ? "text-red-700" : "hidden"}>
                    *
                  </span>
                </label>
                <input
                  className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                    errores.colegio ? "border-red-600" : "border-gray-300 "
                  }`}
                  placeholder={
                    solicitud.rol === "colegio"
                      ? "Nombre de la institución educativa"
                      : "Nombre de la razón social que representas"
                  }
                  type="text"
                  value={solicitud.colegio}
                  name="colegio"
                  onChange={handleChange}
                  id="colegio"
                />
              </div>

              <div>
                <label
                  htmlFor="nit"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nit
                  <span className={errores.nit ? "text-red-700" : "hidden"}>
                    *
                  </span>
                </label>
                <input
                  className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                    errores.nit ? "border-red-600" : "border-gray-300 "
                  }`}
                  placeholder="300.000.000-1"
                  type="text"
                  value={solicitud.nit}
                  name="nit"
                  onChange={handleChange}
                  id="nit"
                />
              </div>

              <div>
                <label
                  htmlFor="cargo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cargo
                  <span className={errores.cargo ? "text-red-700" : "hidden"}>
                    *
                  </span>
                </label>
                <input
                  className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                    errores.cargo ? "border-red-600" : "border-gray-300 "
                  }`}
                  placeholder="Cual es tu cargo, Ej: docente, asesor"
                  type="text"
                  value={solicitud.cargo}
                  name="cargo"
                  onChange={handleChange}
                  id="cargo"
                />
              </div>

              <div>
                <label
                  htmlFor="materia"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Materia de preferencia
                  <span className={errores.materia ? "text-red-700" : "hidden"}>
                    *
                  </span>
                </label>
                <input
                  className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                    errores.materia ? "border-red-600" : "border-gray-300 "
                  }`}
                  placeholder="¿Cuál es tu materia de preferencia o que enseñas?"
                  type="text"
                  value={solicitud.materia}
                  name="materia"
                  onChange={handleChange}
                  id="materia"
                />
              </div>

              <div>
                <label
                  htmlFor="direccion"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Dirección{" "}
                  {solicitud.rol === "colegio"
                    ? "Institución Educativa"
                    : "Razón Social"}
                  <span
                    className={errores.direccion ? "text-red-700" : "hidden"}
                  >
                    *
                  </span>
                </label>
                <input
                  className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                    errores.direccion ? "border-red-600" : "border-gray-300 "
                  }`}
                  placeholder="Calle, avenida, vereda..."
                  type="text"
                  value={solicitud.direccion}
                  name="direccion"
                  onChange={handleChange}
                  id="direccion"
                />
              </div>

              {solicitud.rol === "colegio" && (
                <div>
                  <label
                    htmlFor="enfasis"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Énfasis de la institución{" "}
                    <span
                      className={errores.enfasis ? "text-red-700" : "hidden"}
                    >
                      *
                    </span>
                  </label>
                  <input
                    className={`w-full px-3 py-2 border placeholder-gray-400 rounded-md outline-none ${
                      errores.enfasis ? "border-red-600" : "border-gray-300 "
                    }`}
                    placeholder="Primaria, Bachillerato clásico, técnico..."
                    type="enfasis"
                    value={solicitud.enfasis}
                    name="enfasis"
                    onChange={handleChange}
                    id="enfasis"
                  />
                </div>
              )}
              <div className="text-sm my-2">
                <input type="checkbox" required />
                <label>
                  Acepta los{" "}
                  <Link to={""} target="_blank">
                    <span className="text-green-800 mr-1 hover:underline hover:text-green-700">
                      terminos y condiciones
                    </span>
                  </Link>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
                >
                  Enviar solicitud
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Unete;
