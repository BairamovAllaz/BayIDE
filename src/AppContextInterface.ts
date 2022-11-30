export interface AppContextInterFace {
    file: FileSystemFileHandle | null,
    setFile: React.Dispatch<React.SetStateAction<FileSystemFileHandle | null>>,
    fileContent: string | ArrayBuffer | null | undefined,
    setFileContent: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null | undefined>>
    changedText: string | FileSystemWriteChunkType | null,
    setChagedText: React.Dispatch<React.SetStateAction<string | FileSystemWriteChunkType | null>>
    executeResult: string[] | null,
    setExecuteResult: React.Dispatch<React.SetStateAction<string[] | null>>,
}