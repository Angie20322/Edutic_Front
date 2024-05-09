const verificarAdmin = (solicitud) => {
  const errores = {};
  if (!solicitud.nombre.trim()) errores.nombre = "Espacio vacío";
  if (!solicitud.email.trim()) errores.nombre = "Espacio vacío";
  if (!solicitud.telefono.trim()) errores.nombre = "Espacio vacío";
  return errores;
};

export default verificarAdmin;
