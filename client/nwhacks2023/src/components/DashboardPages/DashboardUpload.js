import { Fragment, useState, useCallback, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDropzone } from "react-dropzone";
import "react-spinners";
import {
  Bars3Icon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  ArrowUpTrayIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { collection, addDoc } from "firebase/firestore";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { db } from "../../firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import storage from "../../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import LivepeerContainer from '../LivepeerContainer';

import "firebase/storage";
import { PropagateLoader } from "react-spinners";
import { Livepeer } from "../Video";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: false },
  { name: "Upload", href: "upload", icon: ArrowUpTrayIcon, current: true },
  { name: "Results", href: "results", icon: ChartBarIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardUpload() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [videoURL, setVideoURL] = useState(false);

  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleClick = () => {
    const lang = new Intl.DisplayNames(["en"], {
      type: "language",
    });

    console.log(lang.of(analyzedData.data.language));
  };

  const getLanguage = () => {
    try {
      const lang = new Intl.DisplayNames(["en"], {
        type: "language",
      });
      return lang.of(analyzedData.data.language);
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const getDetected = () => {
    try {
      const transcript = analyzedData.data.labels;
      return transcript.map((object) => object.name).join(", ");
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getTranscriptText = () => {
    try {
      const transcript = analyzedData.data.transcript;
      return transcript.map((object) => object.text).join(" ");
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const getVideoDuration = () => {
    try {
      return analyzedData.data.duration;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  function getSentiments() {
    try {
      const sentiments = analyzedData.data.sentiments;
      return sentiments.map((object, index) => (
        <li key={index}>
          {object.sentimentType + " - " + object.averageScore}
        </li>
      ));
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  const getEmotions = () => {
    try {
      const emotions = analyzedData.data.emotions;
      return emotions.map((object, index) => (
        <li key={index}>
          {object.type + " - " + object.instances[0].confidence}
        </li>
      ));
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getBannedWords = () => {
    try {
      const profainWords = analyzedData.data.textualContentModeration.bannedWordsCount;
      return (
        <li>
         {profainWords}
        </li>
      )
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // filedrop

  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [analyzedData, setAnalyzedData] = useState({});

  const [transcript, setTranscript] = useState("");

  const getVideoAnalysis = (url) => {
    console.log("request made");

    axios({
      method: "post",
      url: "http://localhost:3001/getAnalyzedData",
      data: { urlLink: url },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      // console.log(res);
      setAnalyzedData(res);
      setCompleted(true);
    });
  };

  useEffect(() => {
    console.log(analyzedData);
    if (!analyzedData) {
      processData();
    }

    setProcessing(false);
  }, [analyzedData]);

  const processData = () => {
    const textArray = analyzedData.data.transcript.map((object) => object.text);
    const joinedText = textArray.join(" ");
    setTranscript(joinedText);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFilesToUpload(acceptedFiles);
    },
  });

  const handleUpload = () => {
    setProcessing(true);
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
            setVideoURL(url);
            getVideoAnalysis(url);
          });
        }
      );
    });
  };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <img
                        className="h-8 w-auto"
                        src="https://d112y698adiu2z.cloudfront.net/photos/production/challenge_thumbnails/001/310/023/datas/original.png"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="mt-5 space-y-1 px-2">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-gray-300"
                                : "text-gray-400 group-hover:text-gray-300",
                              "mr-4 flex-shrink-0 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                  <div className="flex flex-shrink-0 bg-gray-700 p-4">
                    <a href="settings" className="group block flex-shrink-0">
                      <div className="flex items-center">
                        <div>
                          <img
                            className="inline-block h-10 w-10 rounded-full"
                            src="https://avatars.githubusercontent.com/u/52959626?v=4"
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-white">
                            Benny Chinvanich
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4">
                <img
                  className="h-8 w-auto"
                  src="https://d112y698adiu2z.cloudfront.net/photos/production/challenge_thumbnails/001/310/023/datas/original.png"
                  alt="Logo"
                />
              </div>
              <nav className="mt-5 flex-1 space-y-1 px-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-300"
                          : "text-gray-400 group-hover:text-gray-300",
                        "mr-3 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex flex-shrink-0 bg-gray-700 p-4">
              <a href="settings" className="group block w-full flex-shrink-0">
                <div className="flex items-center">
                  <div>
                    <img
                      className="inline-block h-9 w-9 rounded-full"
                      src="https://avatars.githubusercontent.com/u/52959626?v=4"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">
                      Benny Chinvanich
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Upload</h1>
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 mt-2">
                {/* Replace later*/}
                <div className="py-4">
                  {!processing && !completed && (
                    <div className="h-96 rounded-lg border-4 border-dashed border-gray-200 flex justify-center items-center">
                      <div>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          {isDragActive ? (
                            <p className="text-2xl font-semibold">
                              Drop the files here ...
                            </p>
                          ) : (
                            <div className="text-center flex align-center flex-col items-center">
                              <ArrowUpTrayIcon className="h-16 w-16 mb-4" />
                              <p className="text-2xl font-semibold">
                                Drag 'n' drop some files here, or click to
                                select files
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
                                  <a href={file.downloadURL}>
                                    {file.file.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </aside>
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
                    </div>
                  )}
                  {processing && !completed && (
                    <div className="h-96 rounded-lg border-4 border-dashed border-gray-200 flex justify-center items-center">
                      <div className="flex align-center flex-col items-center mt-8">
                        <PropagateLoader color="#36d7b7" />
                        <h1 className="mt-14 text-xl text-gray-700 font-semibold">
                          We're analyzing your video now. This process might
                          take a few minutes, hang tight!
                        </h1>
                      </div>
                    </div>
                  )}
                  {!processing && completed && (
                    <div className="flex flex-row" id="div3">
                      <div className="overflow-hidden bg-white shadow sm:rounded-lg w-2/5 mr-6">
                        <div className="px-4 py-5 sm:px-6">
                          <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Video Container
                          </h3>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:p-0 content-center">
                          <LivepeerContainer></LivepeerContainer>
                        </div>
                      </div>
                      <div className="overflow-hidden bg-white shadow sm:rounded-lg w-1/2	">
                        <div className="px-4 py-5 sm:px-6">
                          <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Analysis Results
                          </h3>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                          <dl className="sm:divide-y sm:divide-gray-200">
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Language
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {getLanguage() ? getLanguage() : null}
                              </dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Video Duration
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {getVideoDuration() ? getVideoDuration() : null}
                              </dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Sentimental Analysis
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {getSentiments() ? getSentiments() : null}
                              </dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Emotional insights
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {getEmotions() ? getEmotions() : null}
                              </dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Banned Words
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {getBannedWords() ? getBannedWords() : null}
                              </dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Transcript
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {getTranscriptText()
                                  ? getTranscriptText()
                                  : null}
                              </dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Detected in video
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {getDetected() ? getDetected() : null}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <button onClick={handleClick}>CLICK HERE</button>
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
