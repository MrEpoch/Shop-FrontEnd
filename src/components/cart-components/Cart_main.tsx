import { Modal } from "@mui/material"
import CartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from "react";

export default function Cart__main() {
    
    const [openModal, setOpenModal] = useState(false);

    return (
    <div className="shop__cart_modal">
        <button onClick={() => setOpenModal(true)} className="shop__cart_modal__button button">
            <CartIcon />
        </button>
        <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div>fa</div>
        </Modal>
    </div>
    )
}
