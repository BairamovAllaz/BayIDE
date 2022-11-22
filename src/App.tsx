import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Folder from './components/Folder';
import React from 'react';
import Code from './components/Code';

interface AppContextInterFace {
  file: File | null,
  setFile: React.Dispatch<React.SetStateAction<File | null>>,
  fileContent: string | ArrayBuffer | null | undefined,
  setFileContent: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null | undefined>>
}

export const MainContext = React.createContext<AppContextInterFace | null>(null);

function App() {
  const [file, setFile] = React.useState<File | null>(null);
  const [fileContent, setFileContent] = React.useState < string | ArrayBuffer | null | undefined>(null);
  
  return (
    <MainContext.Provider value = {{file,setFile,fileContent,setFileContent} as AppContextInterFace | null}>
      <Box className="App">
        <Grid container spacing = {2}>
          <Grid item xs={3} sx = {{border : "solid 1px black"}}>
            <Folder/>
          </Grid>
          <Grid item xs={7} sx={{ border: "solid 1px black" }}>
            <Code/>
          </Grid>
          <Grid item xs={2} sx={{ border: "solid 1px black" }}>Code result area</Grid>  
          <Grid item xs={12} sx={{ border: "solid 1px black" }}>Terminal</Grid>
        </Grid> 
      </Box>
    </MainContext.Provider>
  );
}

export default App;
