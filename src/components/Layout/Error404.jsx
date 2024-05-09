import { Link } from "react-router-dom";
import NavBarConf from "../Confirmacion/NavBarConf";
import imgNotFound from "../../images/undraw_reading_re_29f8.svg";

const Error404 = () => {
  return (
    <div className="min-h-screen mx-auto">
      <NavBarConf />
      <div className="flex gap-x-3 mx-32">
        <div className="w-1/2 grid h-auto place-content-center px-4 py-20">
          <div className="text-left">
            <p className="text-6xl font-bold tracking-tight text-gray-900">
              ¡Oh vaya!
            </p>

            <p className="mt-4 text-gray-500 text-4xl">
              {"No podemos encontrar la página que estás buscando :("}
            </p>

            <Link
              to={"/"}
              className="mt-6 inline-block rounded bg-green-700 px-5 py-3 text-lg text-white font-semibold hover:bg-green-500 focus:outline-none focus:ring"
            >
              Ir al inicio
            </Link>
          </div>
        </div>
        <img className='hidden md:block w-1/2 h-96' src={imgNotFound} alt="Imagen not found" />
      </div>
    </div>
  );
};

export default Error404;

