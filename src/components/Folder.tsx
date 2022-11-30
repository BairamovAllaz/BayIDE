import React from 'react';
import './Folder.css'
import { MainContext } from '../App';

function Folder() {

  const appContext = React.useContext(MainContext);
  const [fileList, setFileList] = React.useState<FileSystemFileHandle[]>([]);
  const [openFileCreateInput, setOpenFileCreateInput] = React.useState<Boolean>(false);
  const [fileNameToCreate,setFileNameToCreate] = React.useState<string | null>(null);
  const [directoryHandle, setDirectoryHandle] = React.useState <FileSystemDirectoryHandle>();
  
  const ClickOpenFolder = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    
    const dirHandle = await window.showDirectoryPicker();
    setDirectoryHandle(dirHandle);

    const promises: any[] = [];

    for await (const entry of dirHandle.values()) {
      if (entry.kind != "file") {
        continue;
      }
      promises.push(entry); 
    }
    
    setFileList(promises);
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

  function RenderFiles(): React.ReactNode {
    return fileList.map((file,key) => {
      return (
        <div key={key} className= "FileDiv" onClick = {(event) => handleFileClickChange(event,file)}>
          <p>{file.name}</p>
          <button className = "DeleteButton" onClick={(e) => DeleteFile(e,file.name)}>X</button> 
        </div>
      );
    });
  }

  async function handleFileClickChange(e: React.MouseEvent<HTMLElement>, file: FileSystemFileHandle)
  { 
      e.preventDefault();
      appContext?.setFileContent(null);
      appContext?.setFile(file);
      const fileBlob = await file.getFile();
      readFileData(fileBlob);
  }

  function HandleSetOpenFileCreateInput(e: React.MouseEvent<HTMLElement>) : void 
  { 
    e.preventDefault();
    setOpenFileCreateInput(!openFileCreateInput);
  }

  function RenderCreateFileInput() : React.ReactNode 
  { 
   return openFileCreateInput && ( 
    <div> 
      <input placeholder="file Name" style = {{marginTop : "20px"}} onChange = {handleFileNameChange}/>
       <button style={{ marginLeft: "10px" }} onClick={CreateFile}>+</button> 
    </div>
    )
  }

  function handleFileNameChange(e: React.ChangeEvent<HTMLInputElement>) 
  {   
    setFileNameToCreate(e.target.value);
  }

  async function CreateFile() : Promise<void>
  { 
      if(!fileNameToCreate) 
      {
        setOpenFileCreateInput(false); 
        return;
      }

      const newFileHandle = await directoryHandle?.getFileHandle(
        fileNameToCreate,
        {create : true}
      ); 
      
      if(newFileHandle) {
        setFileList([...fileList,newFileHandle]);
      }
  
  }

  async function DeleteFile(e: React.MouseEvent<HTMLElement>,fileName : string) : Promise<void>
  {   
      await directoryHandle?.removeEntry(fileName);
      setFileList(fileList.filter(file => file.name != fileName));
  }

  return (
    <div>
      <button onClick={ClickOpenFolder} style={{ marginLeft: "20px" }}>Open Folder</button>
      <button onClick={HandleSetOpenFileCreateInput} style = {{marginLeft : "20px",marginTop : "20px"}}>Create file</button> 
      {RenderFiles()}
      {RenderCreateFileInput()}
    </div>
  )
}

export default Folder