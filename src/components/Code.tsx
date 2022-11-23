import React from 'react'
import { MainContext } from '../App';
import "./Code.css"

function Code() {
    const appContext = React.useContext(MainContext);

    const handleDivChange = (event : React.FormEvent<HTMLDivElement>) => { 
        appContext?.setChagedText(event.currentTarget.innerText);
    }

    return (
        <div className="CodeWrapper">
            <div className="editor" contentEditable = "true" onInput={handleDivChange}>
                <div>
                    {appContext?.fileContent as string}
                </div>
            </div>
        </div>
    )
}

export default Code