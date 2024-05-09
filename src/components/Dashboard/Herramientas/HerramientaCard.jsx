import { Link } from "react-router-dom";

const HerramientaCard = ({ herramienta }) => {
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
      className="bg-green-600 p-2 text-sm text-white font-semibold rounded-lg hover:bg-green-500 transform transition-transform hover:scale-105"
      to={`/dashboard/herramientas/detail/${herramienta.id}`}
    >
      <div className="bg-green-600 p-4 rounded shadow hover:bg-green-500">
        <h2 className="text-lg font-bold mb-2">{herramienta.nombre}</h2>
        <img
          className="h-24"
          src={herramienta.imagen}
          alt={herramienta.nombre}
        />
        <p>Fecha: {formatFecha(herramienta.createdAt)}</p>
        <p>Actualización: {formatFecha(herramienta.updatedAt)}</p>
      </div>
    </Link>
  );
};

export default HerramientaCard;
