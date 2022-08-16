import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { AiOutlineClose } from "react-icons/ai";

const RPopup = (props) => {

    const { title, children, openRPopup, setROpenPopup } = props;

    return(
        <Dialog open={openRPopup}>
            <DialogTitle>
                <div className='dia-header'>Add Role
                <button onClick={()=> setROpenPopup(false)}><AiOutlineClose /></button></div>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default RPopup