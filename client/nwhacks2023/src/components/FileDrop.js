import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export default function FileDrop() {
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-2xl font-semibold">Drop the files here ...</p>
      ) : (
        <div className="text-center flex align-center flex-col items-center">
          <ArrowUpTrayIcon className="h-16 w-16 mb-4" />
          <p className="text-2xl font-semibold">
            Drag 'n' drop some files here, or click to select files
          </p>
        </div>
      )}
      <aside>
        {/* <h4>Files</h4> */}
        <ul>{files}</ul>
      </aside>
    </div>
  );
}
