import { Route, Routes } from "react-router-dom";
import { useState, Fragment, useContext } from "react";

import Landing from "./components/Landing/Landing.jsx";
import Solicitudes from "./components/Dashboard/Solicitudes/Solicitudes.jsx";
import Usuarios from "./components/Dashboard/Usuarios/Usuarios.jsx";
import SolicitudDetail from "./components/Dashboard/Solicitudes/SolicitudDetail.jsx";
import Confirmacion from "./components/Confirmacion/Confirmacion.jsx";
import UsuariosDetail from "./components/Dashboard/Usuarios/UsuariosDetail.jsx";
import HerramientasD from "./components/Dashboard/Herramientas/HerramientasD.jsx";
import HerramientasDetail from "./components/Dashboard/Herramientas/HerramientasDetail.jsx";
import HerramientaNueva from "./components/Dashboard/Herramientas/HerramientaNueva.jsx";
import MateriasD from "./components/Dashboard/Materias/MateriasD.jsx";
import MateriasDetail from "./components/Dashboard/Materias/MateriasDetail.jsx";
import MateriaNueva from "./components/Dashboard/Materias/MateriaNueva.jsx";
import NoticiaD from "./components/Dashboard/Noticias/NoticiaD.jsx";
import NoticiaDetail from "./components/Dashboard/Noticias/NoticiaDetail.jsx";
import NoticiaNueva from "./components/Dashboard/Noticias/NoticiaNueva.jsx";
import Noticias from "./components/Home/Paginas/Noticias/Noticias.jsx";
import NotiDetail from "./components/Home/Paginas/Noticias/NotiDetail.jsx";
import Estadisticas from "./components/Home/Paginas/Estadisticas/Estadisticas.jsx";
import HerramientasH from "./components/Home/Paginas/Herramientas/HerramientasH.jsx";
import HerramientasDetailH from "./components/Home/Paginas/Herramientas/HerramientasDetailH.jsx";
import MateriasH from "./components/Home/Paginas/Materias/MateriasH.jsx";
import MateriasDetailH from "./components/Home/Paginas/Materias/MateriasDetailH.jsx";
import { CRMProvider, CRMContext } from "./context/CRMContext.jsx";
import Error404 from "./components/Layout/Error404.jsx";
import EditarUsuario from "./components/Dashboard/Usuarios/EditarUsuario.jsx";
import Admins from "./components/Dashboard/Admin/Admins.jsx";
import AdminDetail from "./components/Dashboard/Admin/AdminDetail.jsx";
import EditarAdmin from "./components/Dashboard/Admin/EditarAdmin.jsx";
import AdminNuevo from "./components/Dashboard/Admin/AdminNuevo.jsx";
import Perfil from "./components/Home/Paginas/Perfil/Perfil.jsx";
import HerramientasSolicitudes from "./components/Dashboard/Herramientas/HerramientasSolicitudes.jsx";
import HerramientaSolDetail from "./components/Dashboard/Herramientas/HerramientaSolDetail.jsx";
import SolicitudHerramienta from "./components/Home/Paginas/Herramientas/SolicitudHerramienta.jsx";
import SolicitudNoticia from "./components/Home/Paginas/Noticias/SolicitudNoticia.jsx";
import NoticiasSolicitudes from "./components/Dashboard/Noticias/NoticiasSolicitudes.jsx";
import NoticiasSolDetail from "./components/Dashboard/Noticias/NoticiasSolDetail.jsx";
import Bienvenida from "./components/Landing/Bienvenida.jsx";
import Herramientas from "./components/Landing/Herramientas.jsx";
import Asignaturas from "./components/Landing/Asignaturas.jsx";
import OlvidePass from "./components/Confirmacion/OlvidePass.jsx";
import RestablecerPass from "./components/Confirmacion/RestablecerPass.jsx";

function App() {
  const [auth, setAuth] = useContext(CRMContext);
  const [modal, setModal] = useState(false);
  const [login, setLogin] = useState(true);
  const [open, setOpen] = useState(false);
  const [loginData, setLoginData] = useState({});
  return (
    <Fragment>
      <CRMProvider value={[auth, setAuth]}>
        <Routes>
          <Route
            path="/"
            element={
              <Landing
                modal={modal}
                setModal={setModal}
                login={login}
                setLogin={setLogin}
                setLoginData={setLoginData}
              />
            }
          />
          <Route
            path="/bienvenida"
            element={
              <Bienvenida
                navbar={true}
                modal={modal}
                setModal={setModal}
                login={login}
                setLogin={setLogin}
                setLoginData={setLoginData}
              />
            }
          />
          <Route
            path="/herramientas"
            element={
              <Herramientas
                navbar={true}
                modal={modal}
                setModal={setModal}
                login={login}
                setLogin={setLogin}
                setLoginData={setLoginData}
              />
            }
          />
          <Route
            path="/asignaturas"
            element={
              <Asignaturas
                navbar={true}
                modal={modal}
                setModal={setModal}
                login={login}
                setLogin={setLogin}
                setLoginData={setLoginData}
              />
            }
          />
          <Route path="*" element={<Error404 />} />
          <Route path="/dashboard/" element={<Solicitudes />} />
          <Route
            path="/dashboard/solicitudes/:id"
            element={<SolicitudDetail />}
          />
          <Route path="/dashboard/usuarios" element={<Usuarios />} />
          <Route
            path="/dashboard/usuarios/usuario/:id"
            element={<UsuariosDetail />}
          />
          <Route
            path="/dashboard/usuarios/editar/:id"
            element={<EditarUsuario />}
          />
          <Route path="/dashboard/herramientas" element={<HerramientasD />} />
          <Route
            path="/dashboard/herramientas/detail/:id"
            element={<HerramientasDetail />}
          />
          <Route
            path="/dashboard/herramientas/nueva"
            element={<HerramientaNueva />}
          />
          <Route
            path="/dashboard/herramientas/solicitudes"
            element={<HerramientasSolicitudes />}
          />
          <Route
            path="/dashboard/herramientas/solicitudes/:id"
            element={<HerramientaSolDetail loginData={loginData} />}
          />
          <Route path="/dashboard/materias" element={<MateriasD />} />
          <Route
            path="/dashboard/materias/detail/:id"
            element={<MateriasDetail />}
          />
          <Route path="/dashboard/materias/nueva" element={<MateriaNueva />} />

          <Route path="/dashboard/noticias" element={<NoticiaD />} />
          <Route
            path="/dashboard/noticias/detail/:id"
            element={<NoticiaDetail />}
          />
          <Route
            path="/dashboard/noticias/solicitudes"
            element={<NoticiasSolicitudes />}
          />
          <Route
            path="/dashboard/noticias/solicitudes/:id"
            element={<NoticiasSolDetail loginData={loginData} />}
          />
          <Route path="/dashboard/noticias/nueva" element={<NoticiaNueva />} />
          <Route path="/usuario/confirmar/:enlace" element={<Confirmacion />} />
          <Route
            path="/usuario/restpass/:enlace"
            element={<RestablecerPass />}
          />
          <Route path="/olvidemipass" element={<OlvidePass />} />
          <Route
            path="/dashboard/miembros"
            element={<Admins loginData={loginData} />}
          />
          <Route
            path="/dashboard/miembros/miembro/:id"
            element={<AdminDetail loginData={loginData} />}
          />
          <Route
            path="/dashboard/miembros/editar/:id"
            element={<EditarAdmin />}
          />
          <Route path="/dashboard/miembros/nuevo" element={<AdminNuevo />} />
          <Route
            path="/home/noticias"
            element={
              <Noticias open={open} setOpen={setOpen} loginData={loginData} />
            }
          />
          <Route
            path="/home/noticias/agregar"
            element={
              <SolicitudNoticia
                open={open}
                setOpen={setOpen}
                loginData={loginData}
              />
            }
          />
          <Route
            path="/home/perfil"
            element={
              <Perfil
                open={open}
                setOpen={setOpen}
                loginData={loginData}
                modal={modal}
                setModal={setModal}
              />
            }
          />
          <Route
            path="/home/noticias/detail/:id"
            element={
              <NotiDetail open={open} setOpen={setOpen} loginData={loginData} />
            }
          />

          <Route
            path="/home/estadisticas"
            element={
              <Estadisticas
                open={open}
                setOpen={setOpen}
                loginData={loginData}
              />
            }
          />
          <Route
            path="/home/herramientas"
            element={
              <HerramientasH
                open={open}
                setOpen={setOpen}
                loginData={loginData}
              />
            }
          />
          <Route
            path="/home/herramientas/agregar"
            element={
              <SolicitudHerramienta
                open={open}
                setOpen={setOpen}
                loginData={loginData}
              />
            }
          />
          <Route
            path="/home/herramientas/detail/:id"
            element={
              <HerramientasDetailH
                open={open}
                setOpen={setOpen}
                loginData={loginData}
              />
            }
          />
          <Route
            path="/home/materias"
            element={
              <MateriasH open={open} setOpen={setOpen} loginData={loginData} />
            }
          />
          <Route
            path="/home/materias/detail/:id"
            element={
              <MateriasDetailH
                open={open}
                setOpen={setOpen}
                loginData={loginData}
              />
            }
          />
        </Routes>
      </CRMProvider>
    </Fragment>
  );
}

export default App;
