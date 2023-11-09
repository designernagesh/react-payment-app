import { useState } from "react"
import { PaymentDialog } from "./PaymentDialog";

export const PaymentButton = () => {
    const [ dialogOpen, setDialogOpen ] = useState(false);

    const openDialog = () => {
        setDialogOpen(true);
    }

    return (
        <>
            <button onClick={ openDialog }>Open Payment Dialog</button>
            {dialogOpen && <PaymentDialog onClose={() => setDialogOpen(false)} />}
        </>
    )
}