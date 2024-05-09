import { Link } from "react-router-dom";

const NoticiasCard = ({ noticia }) => {
  const formatFecha = (fecha) => {
    // Convierte la fecha de la base de datos a un formato legible
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Link
      className="bg-fuchsia-400 p-2 text-sm text-white font-semibold rounded-lg hover:bg-fuchsia-300 transform transition-transform hover:scale-105"
      to={`/dashboard/noticias/detail/${noticia.id}`}
    >
      <div className="bg-fuchsia-400 p-4 rounded shadow hover:bg-fuchsia-300">
        <h2 className="text-lg font-bold mb-2">{noticia.titulo}</h2>
        <img className="h-24" src={noticia.imagen} alt={noticia.titulo} />
        <p>Fecha: {formatFecha(noticia.createdAt)}</p>
        <p>Actualización: {formatFecha(noticia.updatedAt)}</p>
      </div>
    </Link>
  );
};

export default NoticiasCard;
