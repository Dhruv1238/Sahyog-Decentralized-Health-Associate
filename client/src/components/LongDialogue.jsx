import React, { useEffect } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
} from "@material-tailwind/react";

import { ChatBlock } from "../pages/AllChat";

export function LongDialog({ chats, user }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);
    useEffect(() => {
        console.log(chats);

    })

    return (
        <>
            <Button onClick={handleOpen}>Long Dialog</Button>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Long Dialog</DialogHeader>
                <DialogBody className="h-[42rem] overflow-scroll">
                    <Typography className="font-normal">
                        {chats.map((chat) => (
                            <ChatBlock chat={chat} user={user} />
                        ))}
                    </Typography>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="text" color="blue-gray" onClick={handleOpen}>
                        cancel
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleOpen}>
                        confirm
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}