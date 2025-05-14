import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloudIcon, FileIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/Button';
interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  acceptedFileTypes: string[];
  maxSize?: number;
  file?: File | null;
  onClear?: () => void;
  isUploading?: boolean;
  progress?: number;
}
export function FileUploader({
  onFileSelect,
  acceptedFileTypes,
  maxSize = 5242880,
  // 5MB
  file,
  onClear,
  isUploading,
  progress = 0
}: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);
  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => ({
      ...acc,
      [type]: []
    }), {}),
    maxSize,
    multiple: false
  });
  return <div className="space-y-4">
      <div {...getRootProps()} className={`
          relative border-2 border-dashed rounded-lg p-8
          ${isDragActive ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' : 'border-gray-300 dark:border-gray-600'}
          ${file ? 'bg-gray-50 dark:bg-gray-800' : ''}
          transition-colors duration-200
        `}>
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-center">
          <UploadCloudIcon size={36} className={`mb-4 ${isDragActive ? 'text-teal-500' : 'text-gray-400'}`} />
          {!file && <>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Drag and drop your file here, or{' '}
                <span className="text-teal-500">browse</span>
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Supported formats: {acceptedFileTypes.join(', ')}
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Maximum file size: {Math.round(maxSize / 1024 / 1024)}MB
              </p>
            </>}
          {file && <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <FileIcon size={20} className="text-teal-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {file.name}
                  </span>
                </div>
                {!isUploading && <Button variant="outline" size="sm" className="!p-1" onClick={e => {
              e.stopPropagation();
              onClear?.();
            }}>
                    <XIcon size={14} />
                  </Button>}
              </div>
              {isUploading && <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-teal-500 h-2 rounded-full transition-all duration-300" style={{
              width: `${progress}%`
            }} />
                </div>}
            </div>}
        </div>
      </div>
    </div>;
}