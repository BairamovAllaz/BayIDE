import React from 'react'
import { MainContext } from '../App';
import "./Code.css"

function Code() {
    const appContext = React.useContext(MainContext);

    return (
        <div className="CodeWrapper">
            <div className="editor" contentEditable = "true">
                <div>
                    {appContext?.fileContent as string}
                </div>
            </div>
        </div>
    )
}

export default Code