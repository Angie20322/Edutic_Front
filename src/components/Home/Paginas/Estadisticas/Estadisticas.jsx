import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

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
              title="Sales & Returns Sample v201912"
              width="1140"
              height="541.25"
              src="https://app.powerbi.com/reportEmbed?reportId=15f6cba4-d31e-432b-82ea-edbf7198202c&autoAuth=true&ctid=07da67a0-1f43-4e8c-977f-5f88b6470ee6"
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
