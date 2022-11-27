import React from "react";
import { MainContext } from "../App";

function OutPut() {

    const appContext = React.useContext(MainContext);

    return (
        <div>
            {
                appContext?.executeResult?.map(result => (
                    <div>{result}</div>
                ))
            }
        </div>
    )
}

export default OutPut