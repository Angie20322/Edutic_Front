import { Link } from "react-router-dom";

const MateriaCard = ({ materia }) => {
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
      className="bg-teal-600 p-2 text-sm text-white font-semibold rounded-lg hover:bg-teal-500 transform transition-transform hover:scale-105"
      to={`/dashboard/materias/detail/${materia.id}`}
    >
      <div className="bg-teal-600 p-4 rounded shadow hover:bg-teal-500">
        <h2 className="text-lg font-bold mb-2">{materia.nombre}</h2>
        <img className="h-24" src={materia.imagen} alt={materia.nombre} />
        <p>Fecha: {formatFecha(materia.createdAt)}</p>
        <p>Actualización: {formatFecha(materia.updatedAt)}</p>
      </div>
    </Link>
  );
};

export default MateriaCard;
