import { Fragment, useState } from "react";
import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import TextTransition, { presets } from "react-text-transition";
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
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: true },
  { name: "Upload", href: "upload", icon: ArrowUpTrayIcon, current: false },
];

const profileStats = [
  { label: "Days until your next presentation", value: 12 },
  { label: "Total videos analyzed", value: 43 },
  { label: "Days of improving presentation skills!", value: 8 },
];

const stats = [
  {
    name: "Eye Contact Retention",
    stat: "67.31%",
    previousStat: "89.43%",
    change: "22.12%",
    changeType: "increase",
  },
  {
    name: "Positive Sentimentality Rate",
    stat: "78.16%",
    previousStat: "59.14%",
    change: "19.02%",
    changeType: "increase",
  },
  {
    name: "Formality of Language",
    stat: "89.62%",
    previousStat: "97.57%",
    change: "7.95%",
    changeType: "decrease",
  },
];
const TEXTS = [
  "Because 'presenting' is no longer a 'tense' situation.",
  "Because your presentations need a little more 'expression'.",
  "Presently - Present like a pro, not a 'facial expressionless' robot.",
  "Because your presentations should be 'eye-catching' not 'eye-rolling'.",
  "The app that will make your presentations 'speak' for themselves.",
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardHome() {
  const [index, setIndex] = React.useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      2500 // every 2.5 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
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
                            {"Benny Chinvanich"}
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
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-2">
                <span>
                  <h1 className="text-4xl font-semibold text-gray-900">
                    Presently
                  </h1>
                  <h1 className="text-2xl font-extralight text-gray-900 mt-1">
                    <TextTransition springConfig={presets.wobbly}>
                      {TEXTS[index % TEXTS.length]}
                    </TextTransition>
                  </h1>
                </span>
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {/* Replace later*/}
                <div className="py-4">
                  <section aria-labelledby="profile-overview-title">
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                      <h2 className="sr-only" id="profile-overview-title">
                        Profile Overview
                      </h2>
                      <div className="bg-white p-6">
                        <div className="sm:flex sm:items-center sm:justify-between">
                          <div className="sm:flex sm:space-x-5">
                            <div className="flex-shrink-0">
                              <img
                                className="mx-auto h-20 w-20 rounded-full"
                                src="https://avatars.githubusercontent.com/u/52959626?v=4"
                                alt=""
                              />
                            </div>
                            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                              <p className="text-sm font-medium text-gray-600">
                                Welcome back,
                              </p>
                              <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                                "Benny Chinvanich"
                              </p>
                            </div>
                          </div>
                          <div className="mt-5 flex justify-center sm:mt-0">
                            <a
                              href="#"
                              className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                            >
                              View profile
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                        {profileStats.map((stat) => (
                          <div
                            key={stat.label}
                            className="px-6 py-5 text-center text-sm font-medium"
                          >
                            <span className="text-gray-900">{stat.value}</span>{" "}
                            <span className="text-gray-600">{stat.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>

                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900 mt-4">
                    Last 14 days
                  </h3>
                  <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-y-0 md:divide-x">
                    {stats.map((item) => (
                      <div key={item.name} className="px-4 py-5 sm:p-6">
                        <dt className="text-base font-normal text-gray-900">
                          {item.name}
                        </dt>
                        <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                          <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                            {item.stat}
                            <span className="ml-2 text-sm font-medium text-gray-500">
                              from {item.previousStat}
                            </span>
                          </div>

                          <div
                            className={classNames(
                              item.changeType === "increase"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800",
                              "inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0"
                            )}
                          >
                            {item.changeType === "increase" ? (
                              <ArrowUpIcon
                                className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                                aria-hidden="true"
                              />
                            ) : (
                              <ArrowDownIcon
                                className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                                aria-hidden="true"
                              />
                            )}

                            <span className="sr-only">
                              {" "}
                              {item.changeType === "increase"
                                ? "Increased"
                                : "Decreased"}{" "}
                              by{" "}
                            </span>
                            {item.change}
                          </div>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="bg-white lg:py-8">
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-xl bg-indigo-500 py-16 px-8 shadow-2xl lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-16">
                      <div className="absolute inset-0 opacity-50 mix-blend-multiply saturate-0 filter">
                        <img
                          src="https://taubmancollege.umich.edu/sites/default/files/styles/four_column_feature/public/news/image/santa-ono.jpg?itok=7XLFM1bz"
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="relative lg:col-span-1">
                        <h1 className="text-white text-2xl font-bold">
                          Tip of the day!
                        </h1>
                        <blockquote className="mt-6 text-white">
                          <p className="text-xl font-medium sm:text-2xl">
                            Eye contact shows confidence and engagement, making
                            your audience more likely to trust and listen to
                            your message.
                          </p>
                          <footer className="mt-6">
                            <p className="flex flex-col font-medium">
                              <span>Santa Ono</span>
                              <span>President, University of Michigan</span>
                            </p>
                          </footer>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
