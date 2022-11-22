import React from 'react';
import { MainContext } from '../App';
function Folder() {
  const appContext = React.useContext(MainContext);

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => { 
      const eventFile = event.target.files;
      if(eventFile != null){ 
        appContext?.setFile(eventFile[0]);
        readFileData(eventFile[0]);
      }
  }

  function readFileData(file : File | null)
  { 
      const fileBlob = file as Blob;
      if(!fileBlob)
      { 
        return;
      }

      const reader : FileReader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => { 
          const textContent = e.target?.result;
          appContext?.setFileContent(textContent);
      }

      reader.onerror = (e : ProgressEvent<FileReader>) => { 
        const error = e.target?.error;
        console.log(error);
      }
      reader.readAsText(fileBlob);
  }

  return (
    <div>
        <input type = "file" onChange={handleFile}/>
    </div>
  )
}

export default Folder