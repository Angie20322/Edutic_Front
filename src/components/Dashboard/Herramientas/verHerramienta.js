const verHerramienta = (solicitud) => {
  const errores = {};
  if (!solicitud.nombre.trim()) errores.nombre = "Espacio vacío";
  if (!solicitud.descripcion.trim()) errores.manual = "Espacio vacío";
  if (!solicitud.video.trim()) errores.video = "Espacio vacío";
  return errores;
};

export default verHerramienta;
