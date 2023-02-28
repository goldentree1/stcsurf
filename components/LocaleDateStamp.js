import { useEffect, useState } from "react";

export default function LocaleDateStamp({ utc, children }) {
    const [dateString, setDateString] = useState("");

    useEffect(() => {
        const str = new Date(utc).toLocaleString();
        setDateString(str);
    })

    return (
        <>
            <span style={{ fontWeight: 600 }}>
                {children}
            </span> 
            <span >
                &nbsp;{dateString}
            </span>

        </>
    )
}
