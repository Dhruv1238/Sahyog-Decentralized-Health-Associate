import React, { useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';

export default function ChatReport() {
    const [selectedFile, setSelectedFile] = useState();
    const [content, setContent] = useState();
    const [sourceId, setSourceId] = useState();
    const [reply, setReply] = useState();

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const sendFile = () => {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const options = {
            headers: {
                "x-api-key": "sec_rUHFJFZAVg460ujkeAczOt9NjgcXqbQ7",
            },
        };

        axios
            .post("https://api.chatpdf.com/v1/sources/add-file", formData, options)
            .then((response) => {
                console.log("Source ID:", response.data.sourceId);

                const sourceId = response.data.sourceId;
                setSourceId(sourceId);
                // axios.post("https://api.chatpdf.com/v1/chats/message", options)
                // .then((response) => {console.log("Response:", response.data);})
                // .catch((error) => {console.log("Error:", error.message);});
            })
            .catch((error) => {
                console.log("Error:", error.message);
                console.log("Response:", error.response.data);
            });
    };

    const sendMessages = (e) => {
        e.preventDefault();
        const data = {
            sourceId: sourceId,
            messages: [
                {
                    role: "user",
                    content: content,
                }
            ]
        };

        const options = {
            headers: {
                "x-api-key": "sec_rUHFJFZAVg460ujkeAczOt9NjgcXqbQ7",
            },
        };
        axios
            .post("https://api.chatpdf.com/v1/chats/message", data, options)
            .then((response) => {
                console.log("Response:", response.data);
                const reply = response.data;
                setReply(reply);

            })
            .catch((error) => {
                console.log("Error:", error.message);
                console.log("Response:", error.response.data);
            });
    }

    return (
        <div>
            <input type="file" onChange={handleFileSelect} />
            <button onClick={sendFile}>Upload</button>
            <div>ChatReport</div>
            <form onSubmit={(e) => sendMessages(e)}>
                {sourceId}
                <label>
                    Content:
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
            {reply}
        </div>
    );
}
