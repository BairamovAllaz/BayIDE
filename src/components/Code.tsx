import React from 'react'
import { MainContext } from '../App';
import "./Code.css"
import ButtonExecute from './ButtonExecute';

function Code() {
    const appContext = React.useContext(MainContext);

    const handleDivChange = (event: React.FormEvent<HTMLDivElement>) => {
        appContext?.setChagedText(event.currentTarget.innerText);
    }

    const handleChangeExecuteResult = (change: string[]) => {
        appContext?.setExecuteResult(change);
    }

    React.useEffect(() => { 
        if(!appContext?.changedText) return;
        var length = (appContext?.changedText as string).split(/\r\n|\r|\n/).length;
        console.log(length);
    },[appContext?.changedText])

    return (
        <div>
            <ButtonExecute executeString={appContext?.changedText as string} handleChangeExecuteResult={handleChangeExecuteResult} />
            <div className="CodeWrapper">
                <div className="editor" contentEditable="true" onInput={handleDivChange} suppressContentEditableWarning={true}>
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
