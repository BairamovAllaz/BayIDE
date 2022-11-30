import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Folder from './components/Folder';
import React from 'react';
import Code from './components/Code';
import OutPut from './components/OutPut';
import { AppContextInterFace } from './AppContextInterface';


export const MainContext = React.createContext<AppContextInterFace | null>(null);

function App() {
  const [file, setFile] = React.useState<FileSystemFileHandle | null>(null);
  const [fileContent, setFileContent] = React.useState < string | ArrayBuffer | null | undefined>(null);
  const [changedText, setChangedText] = React.useState < string | FileSystemWriteChunkType | null>(null);
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
        </Grid> 
      </Box>
    </MainContext.Provider>
  );
}

export default App;
