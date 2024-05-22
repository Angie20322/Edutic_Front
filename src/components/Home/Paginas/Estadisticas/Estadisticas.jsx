import { Navigate } from "react-router-dom";
import { useContext } from "react";

import { CRMContext } from "../../../../context/CRMContext.jsx";
import Sidebar from "../../Principal/Sidebar.jsx";

const Estadísticas = ({ open, setOpen, loginData }) => {
  const [auth] = useContext(CRMContext);

  if (!auth.auth) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex">
      <Sidebar open={open} setOpen={setOpen} loginData={loginData} />
      <div>
        <div className="p-7 text-xl font-semibold flex-1 w-screen h-screen overflow-y-auto">
          <div className="">
            <iframe
              className="w-[300px] md:w-[800px] h-[200px] md:h-[500px]"
              title="Estadísticas mostrar"
              src="https://app.powerbi.com/view?r=eyJrIjoiOWU5MGM2ZTUtNDAwOS00ZDM5LThhODEtMjZmZjYxYTY0MTRjIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9"
              frameBorder="0"
              allowFullScreen="true"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estadísticas;
