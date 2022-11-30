import React from "react";
import { MainContext } from "../App";

function OutPut() {

    const appContext = React.useContext(MainContext);

    return (
        <div>
            {
                appContext?.executeResult?.map((result,i) => (
                    <div key = {i}>{result}</div>
                ))
            }
        </div>
    )
}

export default OutPut