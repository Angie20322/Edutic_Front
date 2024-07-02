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
              src="https://app.powerbi.com/reportEmbed?reportId=0086532e-3546-4ac2-8fbf-64b8e7110595&autoAuth=true&ctid=07da67a0-1f43-4e8c-977f-5f88b6470ee6"
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
