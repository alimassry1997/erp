import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { AiOutlineClose } from "react-icons/ai";
import "./edit-Popup.css";

const PopUp = (props) => {

    const { etitle, children, eopenPopup, esetOpenPopup } = props;

    return(
        <Dialog open={eopenPopup}>
            <DialogTitle>
                <div className='dia-header'>Edit Employee
                <button onClick={()=> esetOpenPopup(false)}><AiOutlineClose /></button></div>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default PopUp;