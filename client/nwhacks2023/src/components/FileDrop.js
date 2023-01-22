import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import storage from "../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from 'axios';

import "firebase/storage";

import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export default function FileDrop() {
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [analyzedData, setAnalyzedData] = useState({});

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFilesToUpload(acceptedFiles);
    },
  });

  const getVideoAnalysis = (url) => {
    console.log('request made');
    axios({
      method: 'post',
      url: "http://localhost:3001/getAnalyzedData",
      data: { urlLink: url },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      // console.log(res);
      setAnalyzedData(res);
    })
  }

  useEffect(() => {
    console.log(analyzedData);
  }, [analyzedData])

  const handleUpload = () => {
    filesToUpload.forEach((file) => {
      const storageRef = ref(storage, `/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // update progress
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            getVideoAnalysis(url);
          });
        }
      );
    });
  };

  return (
    <div>
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
      {filesToUpload.length !== 0 && (
        <div className="flex  align-center flex-col items-center">
          <form>
            <button
              type="button"
              onClick={handleUpload}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Upload Files
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
