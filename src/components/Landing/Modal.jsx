import { Fragment } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Modal = (props) => {
  const { children, modal, setModal } = props;
  return (
    <Fragment>
      {modal && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="w-[500px] min-h-[100px] overflow-y-auto bg-white relative rounded-md shadow-md">
            
            <button
              className="absolute top-3 right-3 w-9 h-9 text-2xl rounded-md text-green-800 hover:text-green-700 hover:bg-slate-100 flex justify-center items-center"
              onClick={() => setModal(!modal)}
            >
              <AiOutlineClose />
            </button>
            {children}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Modal;
