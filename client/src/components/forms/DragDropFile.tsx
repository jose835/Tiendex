import { useState, useRef, DragEvent, ChangeEvent, useEffect } from 'react';
import Button from './Button';
import { GridDots, Plus } from '../../icons/icons';
import CheckBox from './CheckBox';
import { v4 as uuidv4 } from 'uuid';

type FileProps = {
  id: string;
  file: File;
};

function DragDropFile() {
  const MAX_FILES = 8; // Cambiado de MAX_IMAGES a MAX_FILES
  const [dragging, setDragging] = useState<boolean>(false);
  const [files, setFiles] = useState<FileProps[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileProps[]>([]); // Cambiado de selectedImages a selectedFiles
  const [showAllFiles, setShowAllFiles] = useState<boolean>(false); // Cambiado de showAllImages a showAllFiles
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (files.length > MAX_FILES) {
      setShowAllFiles(false);
    }
  }, [files]);

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      const filesWithIds = droppedFiles.map(file => ({ id: uuidv4(), file }));
      setFiles(prev => [...prev, ...filesWithIds]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    if (selectedFiles.length > 0) {
      const filesWithIds = selectedFiles.map(file => ({ id: uuidv4(), file }));
      setFiles(prev => [...prev, ...filesWithIds]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleShowAllClick = () => {
    setShowAllFiles(true);
  };

  const handleSelectedFileChange = (file: FileProps, value: boolean) => {
    if (value) {
      setSelectedFiles(prev => [...prev, file]);
    } else {
      setSelectedFiles(prev => prev.filter(f => f.id !== file.id));
    }
  };

  const handleSelectAllFiles = (value: boolean) => {
    setSelectedFiles(value ? files : []);
  };

  const handleDeleteSelectedFiles = () => {
    setFiles(prevFiles => prevFiles.filter(file => !selectedFiles.some(selectedFile => selectedFile.id === file.id)));
    setSelectedFiles([]);
  };

  const isVideoFile = (file: File) => {
    return file.type.startsWith('video/');
  };

  return (
    <div className='mb-5'>
      <div className='flex items-center justify-between h-10'>
        {selectedFiles.length === 0 ? (
          <span className="inline-block text-sm font-medium text-primary" onClick={() => console.log(files)}>
            Elementos multimedia
          </span>
        ) : (
          <>
            <CheckBox
              initialValue={selectedFiles.length === files.length}
              onChange={handleSelectAllFiles}
              name={`${selectedFiles.length} elementos seleccionado${selectedFiles.length > 1 ? 's' : ''}`}
            />
            <Button name='Eliminar' onClick={handleDeleteSelectedFiles} className='text-redprimary/75 hover:underline' fontSize='sm' />
          </>
        )}
      </div>

      <label
        htmlFor="dropzone-file"
        className={` `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        {files.length === 0 ? (
          <div className={`flex flex-col items-center justify-center w-full h-32 ${dragging ? 'border-solid border-primary border' : 'border-dashed border-gray-300 border-2'
            } rounded-lg cursor-pointer bg-gray-50 ${dragging ? 'bg-gray-100' : 'hover:bg-gray-100'}`}>
            <div>
              {dragging ? (
                <p className="font-medium text-center text-[13px] text-primary">Suelta el elemento multimedia que quieres cargar</p>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div className="flex items-center space-x-1">
                    <Button
                      style="primary"
                      name="Subir nuevo"
                      fontSize="xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUploadClick();
                      }}
                    />
                    <Button
                      name="Seleccionar existente"
                      className="hover:underline text-primary/80 font-semibold"
                      fontSize="[13px]"
                    />
                  </div>
                  <p className="font-semibold text-xs mt-3 text-primary/80">Acepta imágenes, vídeos o modelos 3D</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                multiple
                accept="image/*, video/*" // Acepta imágenes y videos
              />
            </div>

          </div>
        ) : (
          <>
            <div className="grid relative grid-cols-6 gap-2 w-full">
              {dragging && (
                <div className={`absolute top-0 z-50 bottom-0 w-full flex-grow flex items-center justify-center ${dragging ? 'border-solid border-primary border' : 'border-dashed border-gray-300 border-2'
                  } rounded-lg cursor-pointer bg-gray-50 ${dragging ? 'bg-gray-100' : 'hover:bg-gray-100'}`}>
                  <p className="font-medium text-center text-[13px] text-primary">
                    Suelta el elemento multimedia que quieres cargar
                  </p>
                </div>

              )}
              {files.slice(0, showAllFiles ? files.length : MAX_FILES).map((file, index) => (
                <div
                  key={index}
                  className={`overflow-hidden ${dragging ? 'invisible' : 'visible'} aspect-square rounded-lg border border-gray-300 ${index === 0 ? 'sm:col-span-2 col-span-4 sm:row-span-2 row-span-4' : 'sm:col-span-1 col-span-2 sm:row-span-1 row-span-2'
                    } relative`}
                >
                  <div className="relative group w-full h-full cursor-pointer">
                    {isVideoFile(file.file) ? (
                      <video
                        src={URL.createObjectURL(file.file)}
                        controls
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(file.file)}
                        alt={file.file.name}
                        className={`object-cover w-full h-full ${files.length > MAX_FILES && !showAllFiles && index === MAX_FILES - 1 ? 'blur-md' : ''
                          }`}
                      />
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div
                      className={`absolute top-2 inset-x-2 ${selectedFiles.length > 0 ? 'flex' : 'hidden group-hover:flex'
                        } items-center justify-between`}
                    >
                      <CheckBox
                        onChange={(value) => handleSelectedFileChange(file, value)}
                        initialValue={selectedFiles.some(f => f.id === file.id)}
                      />
                      <GridDots className='text-black cursor-grab' />
                    </div>
                  </div>

                  {files.length > MAX_FILES && !showAllFiles && index === MAX_FILES - 1 && (
                    <button onClick={handleShowAllClick} className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <span className="text-white text-lg font-semibold">+{files.length - MAX_FILES}</span>
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={handleUploadClick}
                className={`border-[1.5px] aspect-square sm:col-span-1 col-span-2 sm:row-span-1 row-span-2 size-full flex hover:bg-whiting2 items-center justify-center border-dashed border-gray-300 rounded-lg bg-gray-100 ${dragging ? 'invisible' : 'visible'}`}
              >
                <Plus className="size-5 text-primary/90" />
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              multiple
              accept="image/*, video/*" // Acepta imágenes y videos
            />
          </>
        )}
      </label>
    </div >
  );
}

export default DragDropFile;