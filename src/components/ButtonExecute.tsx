import React from 'react'

interface ExecuteConfig
{ 
    executeString : string | null,
    handleChangeExecuteResult(change : string[]) : void
}

function ButtonExecute(prop: ExecuteConfig) {


    async function ExecuteStringToJavascript() : Promise<void>
    { 
        console.info(prop.executeString);
        const tempConsole = console.log; 
        const outputs: string[] = []; 
        console.log = (log) => { 
            outputs.push(log);
        }
        prop.handleChangeExecuteResult([...outputs]);
        eval(`${prop.executeString}`);
        console.info(outputs);
        console.log = tempConsole;
    }

  return (
    <button style={{margin : "20px"}} onClick = {ExecuteStringToJavascript}>Execute</button> 
  )
}

export default ButtonExecute