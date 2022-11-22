import React from 'react';
import { MainContext } from '../App';

const selectOptions = {
  types: [
    {
      description: 'Text Files',
      accept: {
        'text/plain': ['.txt'],
      },
    },
  ],
};

function Folder() {
  const appContext = React.useContext(MainContext);


  async function handleFileButton() {
    const [file] = await window.showOpenFilePicker(selectOptions);
    appContext?.setFile(file);
    const fileBlob = await file.getFile();
    readFileData(fileBlob);
  }

  function readFileData(file: File | null) {
    const fileBlob = file as Blob;
    if (!fileBlob) {
      return;
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const textContent = e.target?.result;
      appContext?.setFileContent(textContent);
    }

    reader.onerror = (e: ProgressEvent<FileReader>) => {
      const error = e.target?.error;
      console.log(error);
    }
    reader.readAsText(fileBlob);
  }

  return (
    <div>
      <button onClick={handleFileButton}>Pick</button>
    </div>
  )
}

export default Folder