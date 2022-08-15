import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { AiOutlineClose } from "react-icons/ai";
import "./add-Popup.css";

const Popup = (props) => {

    const { title, children, openPopup, setOpenPopup } = props;

    return(
        <Dialog open={openPopup}>
            <DialogTitle>
                <div className='dia-header'>Add Employee
                <button onClick={()=> setOpenPopup(false)}><AiOutlineClose /></button></div>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default Popup
