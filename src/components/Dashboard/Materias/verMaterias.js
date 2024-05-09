const verMaterias = (solicitud) => {
    const errores = {};
    if (!solicitud.nombre.trim()) errores.nombre = "Espacio vacío";
    if (!solicitud.descripcion.trim()) errores.descripcion = "Espacio vacío";
    return errores;
  };
  
  export default verMaterias;