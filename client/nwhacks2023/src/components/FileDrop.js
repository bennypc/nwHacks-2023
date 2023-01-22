import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import storage from "../firebase.js";

import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export default function FileDrop() {
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filesToUpload, setFilesToUpload] = useState([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFilesToUpload(acceptedFiles);
    },
  });

  const handleUpload = () => {
    filesToUpload.forEach((file) => {
      const uploadTask = storage.ref().child(`${file.name}`).put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // handle progress updates
        },
        (error) => {
          console.error(error);
        },
        () => {
          // handle successful upload
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setUploadedFiles([...uploadedFiles, { file, downloadURL }]);
            setFilesToUpload([]);
          });
        }
      );
    });
  };

  // const files = acceptedFiles.map((file) => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

  // function handleChange(event) {
  //   setFile(event.target.files[0]);
  // }

  // function handleUpload() {
  //   if (!file) {
  //     alert("Please choose a file first!");
  //   }
  //   const storageRef = ref(storage, `/files/${file.name}`);
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const percent = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       ); // update progress
  //       setPercent(percent);
  //     },
  //     (err) => console.log(err),
  //     () => {
  //       // download url
  //       getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //         console.log(url);
  //       });
  //     }
  //   );
  // }

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
        <ul>
          {filesToUpload.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
        <form>
          <button
            type="button"
            onClick={handleUpload}
            disabled={filesToUpload.length === 0}
          >
            Upload Files
          </button>
        </form>
        <ul>
          {uploadedFiles.map((file, index) => (
            <li key={index}>
              <a href={file.downloadURL}>{file.file.name}</a>
            </li>
          ))}
        </ul>
      </aside>

      {/* <div>
        <input type="file" onChange={handleChange} accept="" />
        <button onClick={handleUpload}>Upload to Firebase</button>
        <p>{percent} "% done"</p>
      </div> */}
    </div>
  );
}
