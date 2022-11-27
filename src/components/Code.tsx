import React from 'react'
import { MainContext } from '../App';
import "./Code.css"
import ButtonExecute from './ButtonExecute';

function Code() {
    const appContext = React.useContext(MainContext);

    const handleDivChange = (event : React.FormEvent<HTMLDivElement>) => { 
        appContext?.setChagedText(event.currentTarget.innerText);
    }

    const handleChangeExecuteResult = (change : string[]) => { 
        appContext?.setExecuteResult(change);
    }

    return (
        <div>
            <ButtonExecute executeString = {appContext?.fileContent as string} handleChangeExecuteResult = {handleChangeExecuteResult}/>
            <div className="CodeWrapper">
                <div className="editor" contentEditable = "true" onInput={handleDivChange}>
                    <div>
                        {/* TODO FIX LINE BREAK BETWEEN LINES!!! */}
                        {(appContext?.fileContent as string)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Code