const verificarEditar = (solicitud) => {
  const errores = {};
  if (!solicitud.nombre.trim()) errores.nombre = "Espacio vacío";
  if (!solicitud.apellido.trim()) errores.apellido = "Espacio vacío";
  if (!solicitud.email.trim()) errores.email = "Espacio vacío";
  if (!solicitud.telefono.trim()) errores.telefono = "Espacio vacío";
  if (!solicitud.departamento.trim()) errores.departamento = "Espacio vacío";
  if (!solicitud.ciudad.trim()) errores.ciudad = "Espacio vacío";
  if (!solicitud.colegio.trim()) errores.colegio = "Espacio vacío";
  if (!solicitud.nit.trim()) errores.nit = "Espacio vacío";
  if (!solicitud.direccion.trim()) errores.direccion = "Espacio vacío";
  if (!solicitud.enfasis.trim()) errores.enfasis = "Espacio vacío";

  return errores;
};

export default verificarEditar;
