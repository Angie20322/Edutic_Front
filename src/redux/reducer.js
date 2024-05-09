import {
  CONFIRMAR_USUARIO,
  DELETE_SOLICITUD,
  GET_ALL_SOLICITUDES,
  GET_ALL_USUARIOS,
  GET_CITY,
  GET_STATE,
  SOLICITUD_BY_ID,
  USUARIO_BY_ID,
  ADD_SOLICITUD,
  GET_HERRAMIENTAS,
  HERRAMIENTA_BY_ID,
  NUEVA_HERRAMIENTA,
  GET_MATERIAS,
  MATERIAS_BY_ID,
  NUEVA_MATERIAS,
  GET_NOTICIAS,
  NOTICIAS_BY_ID,
  NUEVA_NOTICIAS,
  DELETE_USUARIO,
  DELETE_HERRAMIENTA,
  DELETE_MATERIA,
  DELETE_NOTICIA,
  GET_ALL_ADMIN,
  ADMIN_BY_ID,
  DELETE_ADMIN,
  NUEVO_ADMIN,
  NUEVO_COMENTARIO,
  GET_ALL_COMENTARIOS,
  DELETE_COMENTARIO,
} from "./actions.types.js";

const initialstate = {
  states: [],
  cities: [],
  solicitudes: [],
  allSolicitudes: [],
  solicitud: [],
  usuario: [],
  usuarios: [],
  allUsuarios: [],
  allHerramientas: [],
  herramienta: [],
  herramientas: [],
  allMaterias: [],
  materia: [],
  materias: [],
  allNoticias: [],
  noticia: [],
  noticias: [],
  allComentarios: [],
  comentario: [],
  comentarios: [],
  admins: [],
  allAdmins: [],
  admin: [],
};

let reducer = (state = initialstate, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_SOLICITUD:
      return {
        ...state,
        solicitudes: [...state.solicitudes, payload],
        allSolicitudes: [...state.allSolicitudes, payload],
      };
    case GET_STATE:
      return {
        ...state,
        states: payload,
      };
    case GET_CITY:
      return {
        ...state,
        cities: payload,
      };
    case GET_ALL_SOLICITUDES:
      return {
        ...state,
        solicitudes: payload,
        allSolicitudes: payload,
      };
    case GET_ALL_USUARIOS:
      return {
        ...state,
        usuarios: payload,
        allUsuarios: payload,
      };
    case SOLICITUD_BY_ID:
      return {
        ...state,
        solicitud: payload,
      };
    case USUARIO_BY_ID:
      return {
        ...state,
        usuario: payload,
      };
    case DELETE_SOLICITUD:
      return {
        ...state,
        solicitud: payload,
      };
    case DELETE_USUARIO:
      return {
        ...state,
        usuario: payload,
      };
    case DELETE_HERRAMIENTA:
      return {
        ...state,
        herramienta: payload,
      };

    case DELETE_MATERIA:
      return {
        ...state,
        herramienta: payload,
      };

    case DELETE_NOTICIA:
      return {
        ...state,
        noticia: payload,
      };

    case CONFIRMAR_USUARIO:
      return {
        ...state,
        usuario: payload,
      };

    case GET_HERRAMIENTAS:
      return {
        ...state,
        herramientas: payload,
        allHerramientas: payload,
      };

    case HERRAMIENTA_BY_ID:
      return {
        ...state,
        herramienta: payload,
      };

    case NUEVA_HERRAMIENTA:
      return {
        ...state,
        allHerramientas: [...state.allHerramientas, payload],
        herramientas: [...state.herramientas, payload],
      };
    case GET_MATERIAS:
      return {
        ...state,
        materias: payload,
        allMaterias: payload,
      };

    case MATERIAS_BY_ID:
      return {
        ...state,
        materia: payload,
      };

    case NUEVA_MATERIAS:
      return {
        ...state,
        allMaterias: [...state.allMaterias, payload],
        materias: [...state.materias, payload],
      };
    case GET_NOTICIAS:
      return {
        ...state,
        noticias: payload,
        allNoticias: payload,
      };

    case NOTICIAS_BY_ID:
      return {
        ...state,
        noticia: payload,
      };

    case NUEVA_NOTICIAS:
      return {
        ...state,
        allNoticias: [...state.allNoticias, payload],
        noticias: [...state.noticias, payload],
      };
    case GET_ALL_ADMIN:
      return {
        ...state,
        admins: payload,
        allAdmins: payload,
      };
    case NUEVO_ADMIN:
      return {
        ...state,
        allAdmins: [...state.allAdmins, payload],
        admins: [...state.admins, payload],
      };
    case ADMIN_BY_ID:
      return {
        ...state,
        admin: payload,
      };
    case DELETE_ADMIN:
      return {
        ...state,
        admin: payload,
      };
    case NUEVO_COMENTARIO:
      return {
        ...state,
        allComentarios: [...state.allComentarios, payload],
        comentarios: [...state.comentarios, payload],
      };
    case GET_ALL_COMENTARIOS:
      return {
        ...state,
        comentarios: payload,
        allComentarios: payload,
      };

    case DELETE_COMENTARIO:
      return {
        ...state,
        comentario: payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;
