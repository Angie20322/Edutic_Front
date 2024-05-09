const veriNoticias = (solicitud) => {
    const errores = {};
    if (!solicitud.titulo.trim()) errores.titulo = "Espacio vacío";
    if (!solicitud.contenido.trim()) errores.contenido = "Espacio vacío";
    return errores;
  };
  
  export default veriNoticias;