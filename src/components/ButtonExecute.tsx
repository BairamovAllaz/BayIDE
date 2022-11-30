interface ExecuteConfig {
    executeString: string | null;
    handleChangeExecuteResult(change: string[]): void;
}

function ButtonExecute(prop: ExecuteConfig) {

    async function ExecuteStringToJavascript(): Promise<void> {
        const tempConsole = console.log;
        const outputs: string[] = [];
        console.log = (log) => {
            outputs.push(log);
        };
        runJavacript();
        console.log = tempConsole;
        prop.handleChangeExecuteResult(outputs);
    }

    function runJavacript() : void
    { 
        try {
            eval(`${prop.executeString}`);
        } catch (err: any) {
            if (err instanceof SyntaxError) {
                console.log("Error: " + err.message);
            }
        }
    }

    return (
        <button style={{ margin: "20px" }} onClick={ExecuteStringToJavascript}>
            Run
        </button>
    );
}

export default ButtonExecute;
