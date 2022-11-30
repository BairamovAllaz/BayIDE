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

    return (
        <div>
            <ButtonExecute executeString={appContext?.changedText as string} handleChangeExecuteResult={handleChangeExecuteResult} />
            <div className="CodeWrapper">
                <div className="editor" contentEditable="true" onInput={handleDivChange} suppressContentEditableWarning={true}>
                    <div>
                        {/* Fix the line change exception!!! */}
                        {
                            (appContext?.fileContent as string) && (
                                appContext?.fileContent as string).split(/\r\n|\r|\n/).map(line => (
                                    <p>{line}</p>
                                )
                            ) 
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Code
