import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Folder from './components/Folder';
import React from 'react';
import Code from './components/Code';
import OutPut from './components/OutPut';

interface AppContextInterFace {
  file: FileSystemFileHandle | null,
  setFile: React.Dispatch<React.SetStateAction<FileSystemFileHandle | null>>,
  fileContent: string | ArrayBuffer | null | undefined,
  setFileContent: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null | undefined>>
  changedText: string | null,
  setChagedText : React.Dispatch<React.SetStateAction<string | null>>
  executeResult : string[] | null,
  setExecuteResult: React.Dispatch<React.SetStateAction<string[] | null>>,
}

export const MainContext = React.createContext<AppContextInterFace | null>(null);

function App() {
  const [file, setFile] = React.useState<FileSystemFileHandle | null>(null);
  const [fileContent, setFileContent] = React.useState < string | ArrayBuffer | null | undefined>(null);
  const [changedText, setChangedText] = React.useState<string | null>(null);
  const [executeResult, setExecuteResult] = React.useState<string[] | null>(null);

  const AppContextObject : AppContextInterFace = {
    file : file,
    setFile : setFile,
    fileContent : fileContent,
    setFileContent : setFileContent, 
    changedText : changedText,
    setChagedText : setChangedText,
    executeResult: executeResult,
    setExecuteResult : setExecuteResult
  }

  React.useEffect(() => { 
    window.addEventListener("keydown",async (event : KeyboardEvent) => { 
      if (event.key == "m" && event.ctrlKey)
      {
          if(!file) return;
          const writeable = await file.createWritable(); 
          console.log(changedText);
          await writeable.write(changedText as FileSystemWriteChunkType);
          await writeable.close();
      }
    })
  })

  return (
    <MainContext.Provider value={AppContextObject}>
      <Box className="App">
        <Grid container spacing = {2}>
          <Grid item xs={3} sx = {{border : "solid 1px black"}}>
            <Folder/>
          </Grid>
          <Grid item xs={7} sx={{ border: "solid 1px black" }}>
            <Code/>
          </Grid>
          <Grid item xs={2} sx={{ border: "solid 1px black" }}>
            <OutPut/>  
          </Grid>  
          <Grid item xs={12} sx={{ border: "solid 1px black" }}>Terminal</Grid>
        </Grid> 
      </Box>
    </MainContext.Provider>
  );
}

export default App;
