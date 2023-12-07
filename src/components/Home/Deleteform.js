import React from 'react';
import Modal from "react-modal";
import axios from 'axios';
import { toast } from "react-toastify";


function Deleteform({Isopen,deleteIsOpen,deleteId,refresh,setRefresh}) {
  
    const handleDelete = async () => {
        try {
       
          // deleteIsOpen();
            let response = await axios.delete(
            `${process.env.REACT_APP_API_URL}/employees/${deleteId}`
          );
          // console.log("response", response);
          setRefresh(!refresh);
          toast.success("Employee Removed Successfully");
          deleteIsOpen();      
       
        } catch (error) {
          toast.error("Employee not Removed Successfully");
          setRefresh(!refresh);
    
          console.log("handleDelete-error", error);
        }
      };
  
    return (
        <div>
            <Modal
                 isOpen={Isopen}
                 onRequestClose={deleteIsOpen}
                 // style={customStyles}
                 contentLabel="Modal"
                 className={{
                   base: "modal-base",
                   afterOpen: "modal-base_after-open",
                   beforeClose: "modal-base_before-close",
                 }}
                 overlayClassName={{
                   base: "overlay-base",
                   afterOpen: "overlay-base_after-open",
                   beforeClose: "overlay-base_before-close",
                 }}
                 shouldCloseOnOverlayClick={false}
            >
                <div>
                    <p>
                Are You Sure Want To delete ?
                    </p>
                 <div className='w-25 d-flex justify-content-between' >
                    <button className='btn btn-primary'
                    onClick={handleDelete}
                    >
                        yes
                    </button>
                 <button className='btn btn-light'
                 onClick={deleteIsOpen}
                 >
                    cancel
                 </button>

                 </div>

                </div>

            </Modal>
        </div>
    );
}

export default Deleteform;