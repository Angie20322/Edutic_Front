import axios from "axios";
import {
  CONFIRMAR_USUARIO,
  DELETE_SOLICITUD,
  GET_ALL_SOLICITUDES,
  GET_ALL_USUARIOS,
  GET_CITY,
  GET_STATE,
  SOLICITUD_BY_ID,
  ADD_SOLICITUD,
  USUARIO_BY_ID,
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

const URL = import.meta.env.VITE_BACKEND_URL;

export const addSolicitud = (solicitud) => {
  const endpoint = `${URL}/solicitud`;
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, solicitud);
      return dispatch({
        type: ADD_SOLICITUD,
        payload: data,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const getState = () => {
  const endpoint = `${URL}/colombia`;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint);
      return dispatch({
        type: GET_STATE,
        payload: data,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const getCity = (state) => {
  const endpoint = `${URL}/colombia/city/${state}`;
  return async (dispatch) => {
    console.log(state);
    try {
      const { data } = await axios(endpoint);
      return dispatch({
        type: GET_CITY,
        payload: data,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const getAllSolicitudes = (auth) => {
  const endpoint = `${URL}/solicitud`;
  console.log(endpoint);
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      return dispatch({
        type: GET_ALL_SOLICITUDES,
        payload: data,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const getAllUsuarios = (auth) => {
  const endpoint = `${URL}/usuarios`;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      return dispatch({
        type: GET_ALL_USUARIOS,
        payload: data,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const solicitudById = (id, auth) => {
  const endpoint = `${URL}/solicitud/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      return dispatch({
        type: SOLICITUD_BY_ID,
        payload: data,
      });
    } catch (error) {
      return { error: `No hay una solicitud con el siguiente ID: "${id}"` };
    }
  };
};

export const usuarioById = (id, auth) => {
  const endpoint = `${URL}/usuarios/user/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      return dispatch({
        type: USUARIO_BY_ID,
        payload: data,
      });
    } catch (error) {
      return { error: `No hay un usuario con el siguiente ID: "${id}"` };
    }
  };
};

export const deleteSolicitud = (id, auth) => {
  const endpoint = `${URL}/solicitud/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      return dispatch({
        type: DELETE_SOLICITUD,
        payload: data,
      });
    } catch (error) {
      return { error: `No hay un usuario con el siguiente ID: "${id}"` };
    }
  };
};

export const deleteUsuario = (id, auth) => {
  const endpoint = `${URL}/usuarios/eliminar/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      return dispatch({
        type: DELETE_USUARIO,
        payload: data,
      });
    } catch (error) {
      return { error: `No hay un usuario con el siguiente ID: "${id}"` };
    }
  };
};

export const confirmarUsuario = (enlace) => {
  const endpoint = `${URL}/usuarios/confirmar/${enlace}`;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint);
      return dispatch({
        type: CONFIRMAR_USUARIO,
        payload: data,
      });
    } catch (error) {
      return { error: "Enlace errado o ya caducado" };
    }
  };
};

export const getAllHerramientas = (auth) => {
  const endpoint = `${URL}/herramientas`;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      return dispatch({
        type: GET_HERRAMIENTAS,
        payload: data,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const herramientaById = (id, auth) => {
  const endpoint = `${URL}/herramientas/detail/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      return dispatch({
        type: HERRAMIENTA_BY_ID,
        payload: data,
      });
    } catch (error) {
      return { error: `No hay una solicitud con el siguiente ID: "${id}"` };
    }
  };
};

export const nuevaHerramienta = (herr, auth) => {
  const endpoint = `${URL}/herramientas/nueva`;
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, herr, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      return dispatch({
        type: NUEVA_HERRAMIENTA,
        payload: data,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const getAllMaterias = (auth) => {
  const endpoint = `${URL}/materias`;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      return dispatch({
        type: GET_MATERIAS,
        payload: data,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const materiasById = (id, auth) => {
  const endpoint = `${URL}/materias/detail/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      return dispatch({
        type: MATERIAS_BY_ID,
        payload: data,
      });
    } catch (error) {
      return { error: `No hay una materia con el siguiente ID: "${id}"` };
    }
  };
};

export const nuevaMaterias = (mat, auth) => {
  const endpoint = `${URL}/materias/nueva`;
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, mat, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      return dispatch({
        type: NUEVA_MATERIAS,
        payload: data,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};
export const getAllNoticias = (auth) => {
  const endpoint = `${URL}/noticias`;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      return dispatch({
        type: GET_NOTICIAS,
        payload: data,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const noticiasById = (id, auth) => {
  const endpoint = `${URL}/noticias/detail/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      return dispatch({
        type: NOTICIAS_BY_ID,
        payload: data,
      });
    } catch (error) {
      return { error: `No hay una materia con el siguiente ID: "${id}"` };
    }
  };
};

export const nuevaNoticia = (noti, auth) => {
  const endpoint = `${URL}/noticias/nueva`;
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, noti, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      return dispatch({
        type: NUEVA_NOTICIAS,
        payload: data,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const deleteHerramienta = (id, auth) => {
  const endpoint = `${URL}/herramientas/eliminar/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      return dispatch({
        type: DELETE_HERRAMIENTA,
        payload: data,
      });
    } catch (error) {
      return { error: `No se encuentra el ID: "${id}"` };
    }
  };
};

export const deleteMateria = (id, auth) => {
  const endpoint = `${URL}/materias/eliminar/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      return dispatch({
        type: DELETE_MATERIA,
        payload: data,
      });
    } catch (error) {
      return { error: `No se encuentra el ID: "${id}"` };
    }
  };
};

export const deleteNoticia = (id, auth) => {
  const endpoint = `${URL}/noticias/eliminar/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      return dispatch({
        type: DELETE_NOTICIA,
        payload: data,
      });
    } catch (error) {
      return { error: `No se encuentra el ID: "${id}"` };
    }
  };
};

export const getAllAdmin = (auth) => {
  const endpoint = `${URL}/admin`;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      return dispatch({
        type: GET_ALL_ADMIN,
        payload: data,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const adminById = (id, auth) => {
  const endpoint = `${URL}/admin/detail/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      return dispatch({
        type: ADMIN_BY_ID,
        payload: data,
      });
    } catch (error) {
      return { error: `No hay un admin con el siguiente ID: "${id}"` };
    }
  };
};

export const nuevoAdmin = (admin, auth) => {
  const endpoint = `${URL}/admin/nuevo`;
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, admin, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      return dispatch({
        type: NUEVO_ADMIN,
        payload: data,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const deleteAdmin = (id, auth) => {
  const endpoint = `${URL}/admin/eliminar/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      return dispatch({
        type: DELETE_ADMIN,
        payload: data,
      });
    } catch (error) {
      return { error: `No hay un ADMIN con el siguiente ID: "${id}"` };
    }
  };
};

export const nuevoComentario = (comentario, auth) => {
  const endpoint = `${URL}/comentarios/nuevo`;
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, comentario, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      return dispatch({
        type: NUEVO_COMENTARIO,
        payload: data,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const getAllComentarios = (auth) => {
  const endpoint = `${URL}/comentarios/all`;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      return dispatch({
        type: GET_ALL_COMENTARIOS,
        payload: data,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const deleteComentario = (id, auth) => {
  const endpoint = `${URL}/comentarios/eliminar/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      return dispatch({
        type: DELETE_COMENTARIO,
        payload: data,
      });
    } catch (error) {
      return { error: `No se encuentra el ID: "${id}"` };
    }
  };
};
