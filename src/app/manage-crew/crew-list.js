import { Fragment } from "react";
import entityCrew from "../lib/crew";
import entityCrewmate, { CLASS_IDS } from "../lib/crewmate";

const getSVGColor = (cremateClass) => {
  switch (cremateClass) {
    case "miner":
      return "fill-orange-400";
      break;
    case "scientist":
      return "fill-blue-400";

    case "engineer":
      return "fill-red-400";

    case "merchant":
      return "fill-yellow-400";
    case "pilot":
      return "fill-purple-400";

    default:
      return "fill-yellow-200";
      break;
  }
};

const classesImgs = {
  miner: {
    src: "https://images.influenceth.io/v1/crew/26910/image.svg?bustOnly=true",
    logo: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 128 128"
        className="w-5 h-5 sm:h-10 sm:w-10 fill-orange-400"
      >
        <title>Miner</title>
        <path d="M110.11,83.83l-5,.55,11.62,20.14a3.46,3.46,0,0,1-3,5.18H13.31a3.46,3.46,0,0,1-3-5.18l50.23-87a3.43,3.43,0,0,1,3-1.73h0a3.44,3.44,0,0,1,3,1.73L77.11,35.85l2.79-4.34L70.5,15.23a8,8,0,0,0-7-4h0a8,8,0,0,0-7,4l-50.23,87a8,8,0,0,0,7,12.07H113.76a8,8,0,0,0,7-12.07Z"></path>
        <path d="M81.07,76.81l-4.64,1A13,13,0,1,1,63.51,63.52a12,12,0,0,1,1.71.13,12.81,12.81,0,0,1,4.71,1.58l3-3.51L98.64,32.21l-3.46-3L68.65,59.7a17.57,17.57,0,1,0-5.14,34.37,17.6,17.6,0,0,0,16.8-12.41l40.21-8.44-.94-4.49Z"></path>
        <path d="M73.87,68.71A12.8,12.8,0,0,1,76,72.81l4-2.35,48-27.92-2.31-4L77.86,66.39Z"></path>
        <path
          className="MinerCrewClass-1"
          d="M116.75,104.52,105.13,84.38,87.75,86.32A26.1,26.1,0,1,1,63.53,50.48a25.81,25.81,0,0,1,4,.3l9.62-14.93L66.53,17.52a3.44,3.44,0,0,0-3-1.73h0a3.43,3.43,0,0,0-3,1.73l-50.23,87a3.46,3.46,0,0,0,3,5.18H113.76a3.46,3.46,0,0,0,3-5.18Z"
        ></path>
      </svg>
    ),
  },
  scientist: {
    src: "https://images.influenceth.io/v1/crew/26912/image.svg?bustOnly=true",
    logo: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 128 128"
        className="w-5 h-5 fill-blue-400 sm:h-10 sm:w-10"
      >
        <title>Scientist</title>
        <circle cx="64" cy="63.41" r="9.55"></circle>
        <path d="M74.54,97.37C71.66,106.93,67.72,112.6,64,112.6c-6.31,0-13.25-16.21-14.56-40.33l-4.69-4.68C45.33,92.2,52,117.1,64,117.1c6.12,0,10.85-6.52,14.1-16.16Z"></path>
        <path d="M64,11.14c-6.12,0-10.85,6.52-14.1,16.16l3.56,3.56C56.34,21.3,60.28,15.64,64,15.64c6.31,0,13.25,16.21,14.56,40.33l4.69,4.68C82.67,36,76,11.14,64,11.14Z"></path>
        <path d="M40.47,89.87C30.75,92.15,23.88,91.58,22,88.35c-3.15-5.46,7.42-19.58,27.65-32.78l1.71-6.39C30.35,62,12.13,80.24,18.12,90.6c2.07,3.6,6.42,5.15,12.12,5.15a46.59,46.59,0,0,0,8.93-1Z"></path>
        <path d="M109.88,37.62c-3.06-5.3-11.07-6.14-21-4.14l-1.31,4.9A46.49,46.49,0,0,1,97.77,37c4.21,0,7.1,1,8.22,2.91,3.15,5.47-7.42,19.58-27.65,32.78l-1.71,6.4C97.65,66.24,115.87,48,109.88,37.62Z"></path>
        <path d="M22,39.88c3.16-5.48,20.67-3.38,42.22,7.55l6.39-1.72C49,33.9,24.1,27.25,18.12,37.63c-3.06,5.29.23,12.65,7,20.29l4.86-1.3C23.1,49.34,20.16,43.1,22,39.88Z"></path>
        <path d="M109.88,90.61c3.06-5.3-.22-12.66-6.94-20.3l-4.87,1.31c6.83,7.27,9.77,13.52,7.92,16.74-3.16,5.47-20.67,3.37-42.22-7.55l-6.37,1.7C71.51,90.22,87,95.75,97.75,95.75,103.46,95.75,107.81,94.21,109.88,90.61Z"></path>
        <path
          className="ScientistCrewClass-1"
          d="M30.23,56.54a34.36,34.36,0,0,1,10.15-18.2C30.69,36.06,23.87,36.65,22,39.88s1.08,9.46,7.92,16.74Z"
        ></path>
        <path
          className="ScientistCrewClass-1"
          d="M64,29a34.36,34.36,0,0,1,10.45,1.62C71.58,21.17,67.69,15.64,64,15.64s-7.57,5.55-10.45,14.93A34.71,34.71,0,0,1,64,29Z"
        ></path>
        <path
          className="ScientistCrewClass-1"
          d="M97.83,56.87c7-7.39,10-13.74,8.15-17-1.11-1.93-4-2.91-8.21-2.91a46.34,46.34,0,0,0-10.13,1.39A34.36,34.36,0,0,1,97.83,56.87Z"
        ></path>
        <path
          className="ScientistCrewClass-1"
          d="M64,97.87A34.55,34.55,0,0,1,53.09,96.1c2.9,10.35,7,16.5,10.91,16.5,3.72,0,7.66-5.67,10.54-15.23l1.78,1.78h0l-2.66-2.66A34.23,34.23,0,0,1,64,97.87Z"
        ></path>
        <path
          className="ScientistCrewClass-1"
          d="M100.5,71h0l-3.06.83a34.48,34.48,0,0,1-11,17.81c10.33,2.61,17.66,2.11,19.59-1.24s-1.08-9.47-7.91-16.74Z"
        ></path>
        <path
          className="ScientistCrewClass-1"
          d="M30.41,71.1c-7.2,7.5-10.3,14-8.4,17.25s8.74,3.8,18.46,1.52l-.65,2.43h0l.93-3.46A34.42,34.42,0,0,1,30.41,71.1Z"
        ></path>
      </svg>
    ),
  },
  engineer: {
    src: "https://images.influenceth.io/v1/crew/24743/image.svg?bustOnly=true",
    logo: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        viewBox="0 0 128 128"
        className={`w-5 h-5 sm:h-10 sm:w-10 fill-red-400`}
      >
        <path d="M68.09 104.28H63.5a38.94 38.94 0 0 0-38.9-38.9v-4.59a43.54 43.54 0 0 1 43.49 43.49Zm30.44 0h-4.59c0-1.89-.15-3.77-.29-5.53l-.11-1.33 15.57-10.67-2-7.31L88.55 78 88 76.76a67.14 67.14 0 0 0-7.13-12.18l-.81-1.11 8.3-17.37L83 40.75 65.35 49.2l-1.09-.75a70.2 70.2 0 0 0-11-6.13l-1.24-.55-1.39-18.37-7.32-2L32.9 36.64l-1.35-.13a71.4 71.4 0 0 0-6.95-.35v-4.59c2 0 4 .08 6 .25l10.77-15.65L55 19.81l1.41 18.89a74.74 74.74 0 0 1 9.34 5.22L84 35.21l10 9.94L85.37 63a71.64 71.64 0 0 1 6.23 10.64l19.14 1.48 3.64 13.58-16 11c.06 1.47.15 3 .15 4.58Z" />
        <path d="M106.07 115h-84.4a8 8 0 0 1-8-8V22.65a8 8 0 0 1 8-8v4.59a3.37 3.37 0 0 0-3.38 3.37v84.41a3.38 3.38 0 0 0 3.38 3.38h84.4a3.38 3.38 0 0 0 3.38-3.38H114a8 8 0 0 1-7.93 7.98Z" />
        <path d="m93.65 98.75-.11-1.33 15.57-10.67-2-7.31L88.55 78 88 76.76a67.14 67.14 0 0 0-7.13-12.18l-.81-1.11 8.3-17.37L83 40.75 65.35 49.2l-1.09-.75a70.2 70.2 0 0 0-11-6.13l-1.24-.55-1.39-18.37-7.32-2L32.9 36.64l-1.35-.13a71.4 71.4 0 0 0-6.95-.35v24.63a43.54 43.54 0 0 1 43.49 43.49h25.85c0-1.9-.15-3.77-.29-5.53Z" />
      </svg>
    ),
  },
  merchant: {
    src: "https://images.influenceth.io/v1/crew/26911/image.svg?bustOnly=true",
    logo: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 128 128"
        className="w-5 h-5 fill-yellow-400 sm:h-10 sm:w-10"
      >
        <title>Merchant</title>
        <path d="M52.37,104.33l-23.49,11h71.54L76.76,104.31A31.06,31.06,0,0,0,52.37,104.33Z"></path>
        <rect x="61.42" y="38.96" width="6.3" height="56.39"></rect>
        <g className="MerchantCrewClass-1">
          <path d="M47.14,68.5H11.53L6.79,79.2a2.84,2.84,0,0,0,2.6,4H49.28a2.84,2.84,0,0,0,2.6-4Z"></path>
          <path d="M116.55,68.5H80.94L76.21,79.2a2.83,2.83,0,0,0,2.6,4h39.88a2.79,2.79,0,0,0,2.38-1.29,2.82,2.82,0,0,0,.22-2.7Z"></path>
        </g>
        <path d="M14.54,61.69l12.2-27.57h0a2.84,2.84,0,0,1,5.19,0l12.2,27.57h5L36.2,32.43H91.88L78.94,61.69h5l12.2-27.57h0a2.84,2.84,0,0,1,5.2,0l12.19,27.57h5l-13-29.42a7.33,7.33,0,0,0-6.66-4.42H67.72V12.34h-6.3v15.5H29.2a7.33,7.33,0,0,0-6.66,4.42l-13,29.42Z"></path>
        <path d="M52.16,68.5h-5l4.74,10.7a2.84,2.84,0,0,1-2.6,4H9.39a2.84,2.84,0,0,1-2.6-4l4.74-10.7h-5L2.6,77.34A7.44,7.44,0,0,0,9.39,87.78H49.28a7.44,7.44,0,0,0,6.79-10.44Z"></path>
        <path d="M121.57,68.5h-5l4.74,10.7a2.82,2.82,0,0,1-.22,2.7,2.79,2.79,0,0,1-2.38,1.29H78.81a2.83,2.83,0,0,1-2.6-4l4.73-10.7h-5L72,77.34a7.44,7.44,0,0,0,6.8,10.44h39.88a7.44,7.44,0,0,0,6.8-10.44Z"></path>
      </svg>
    ),
  },
  pilot: {
    src: "https://images.influenceth.io/v1/crew/26913/image.svg?bustOnly=true",
    logo: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 128 128"
        className="w-5 h-5 fill-purple-400 sm:h-10 sm:w-10"
      >
        <title>Pilot</title>
        <path d="M115.08,10.3C86.75,16.58,62.94,31.13,49.47,40.79l3.73-.27a12.24,12.24,0,0,1,4.1.41c12.92-8.66,32.44-19.62,55.19-25.3-5.68,22.72-16.61,42.21-25.27,55.13A12,12,0,0,1,87.68,75l-.27,3.5C97.07,65,111.56,41.28,117.81,13l.78-3.52Z"></path>
        <path d="M38.26,54.44l13.29-1.77a3,3,0,0,1,2.5.84L74.61,74.07a3,3,0,0,1,.84,2.49l-1.77,13.3,4.8,4.8L80.8,77.28a8.4,8.4,0,0,0-2.37-7L57.87,49.69a8.45,8.45,0,0,0-7-2.38L33.45,49.64Z"></path>
        <path d="M9.41,118.71,29.9,76.85A16.28,16.28,0,1,1,51.27,98.22ZM44.86,71.58A11.66,11.66,0,0,0,34.1,78.7l-.05.11L19.42,108.7,49.42,94a11.68,11.68,0,0,0-4.56-22.44Z"></path>
        <path
          className="PilotCrewClass-1"
          d="M56.54,83.26A11.68,11.68,0,0,0,34.1,78.7l-.05.11L19.42,108.7,49.42,94a11.7,11.7,0,0,0,7.12-10.76Z"
        ></path>
        <path
          className="PilotCrewClass-1"
          d="M57.29,40.93A12.17,12.17,0,0,1,62.65,44L84.16,65.55a12,12,0,0,1,3.06,5.22c8.66-12.92,19.59-32.42,25.27-55.14C89.73,21.31,70.21,32.27,57.29,40.93Z"
        ></path>
      </svg>
    ),
  },
};

const traitsSVGs = {
  refiner: (
    <svg
      className="w-3 h-3 fill-slate-300 sm:h-8 sm:w-8"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 36 36"
      x="0.22999999999999998em"
      y="0.22999999999999998em"
    >
      <path d="M30.48,20.76l2-1.49L32,17.89l-2.45-.06A8.8,8.8,0,0,0,28.18,16l.72-2.35-1.17-.85-2,1.4a8.37,8.37,0,0,0-2.2-.73l-.81-2.32H21.25l-.82,2.33-.15,0a8.75,8.75,0,0,0-1.17.32l.61,1a6.36,6.36,0,0,1,.78-.2A7.46,7.46,0,1,1,15.74,26H14.4a8.33,8.33,0,0,0,1.31,1.79L15,30.19l1.16.85,2-1.4a8.35,8.35,0,0,0,2.2.72l.81,2.33h1.44l.82-2.32.15,0a9.16,9.16,0,0,0,2.05-.69l2,1.41,1.17-.85-.71-2.36A8.69,8.69,0,0,0,29.53,26l2.45,0,.45-1.37-1.95-1.5A8.93,8.93,0,0,0,30.48,20.76Z"></path>
      <path d="M21.08,21.39l-1.19-2.06L18.3,16.57h0L13.85,8.86V6.06H10v2.8L5.09,17.31,2.73,21.39a1.93,1.93,0,0,0,1.67,2.9h15A1.93,1.93,0,0,0,21.08,21.39ZM8.28,19.3a1,1,0,1,1,1-1A1,1,0,0,1,8.28,19.3Zm1.66,1.58a1,1,0,1,1-1,1A1,1,0,0,1,9.94,20.88Zm2.53-1.05A1.5,1.5,0,1,1,14,21.34,1.5,1.5,0,0,1,12.47,19.83ZM10.61,9.24l.1-.17V6.81H13.1V9.07l.1.17,4.24,7.33H6.38Z"></path>
      <rect x="9.25" y="3.64" width="5.32" height="1.38"></rect>
    </svg>
  ),
  navigator: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 36 36"
      className="w-3 h-3 fill-slate-300 sm:h-8 sm:w-8"
      x="0.22999999999999998em"
      y="0.22999999999999998em"
    >
      <path d="M1.28,23.5c-.24-.68.16-1.59,1.1-2.63a2.1,2.1,0,0,1,1.4-1.72A2,2,0,0,1,4.46,19a38.55,38.55,0,0,1,7.69-4.25,5.71,5.71,0,0,1,.58-1c-7.16,3-13.12,7.12-12.13,10,.49,1.43,2.54,2,5.4,2a35.31,35.31,0,0,0,7.19-.9,2.7,2.7,0,0,1-.07-.69C6.48,25.65,1.87,25.22,1.28,23.5Z"></path>
      <path d="M35.4,11.74c-.95-2.76-7.72-2.47-14.9-.6l-.11,0-.46.12.33.13a.24.24,0,0,0,.1.14l.35.26.44.31h0a.24.24,0,0,0,.14,0,.24.24,0,0,0,.19-.1s0,0,0,0h0a.23.23,0,0,0-.06-.3l-.11-.08a37,37,0,0,1,8.61-1.26c2.72,0,4.44.57,4.79,1.57.77,2.23-5.13,6.93-15.13,10.38q-.56.2-1.11.36a3.11,3.11,0,0,1,.32.63v0l1-.34C28.38,20.08,36.54,15.05,35.4,11.74Z"></path>
      <path d="M5.28,23.13l-.11.05a2.26,2.26,0,0,1-.69.11,6.08,6.08,0,0,0,3.85.93,27.42,27.42,0,0,0,4.86-.53,2.57,2.57,0,0,1,.2-.61C9.53,23.85,6.62,23.8,5.28,23.13Z"></path>
      <path d="M11.72,16.06a6.44,6.44,0,0,1,.2-.72,26.24,26.24,0,0,0-6.39,4,2,2,0,0,1,.45.36A24,24,0,0,1,11.72,16.06Z"></path>
      <path d="M27.65,18.23a.24.24,0,0,0,.14-.05s0,0,0-.06c2.9-1.82,4.72-3.73,4.2-5.22-.42-1.21-2.26-1.77-5.29-1.63a31.3,31.3,0,0,0-5.23.78,4.64,4.64,0,0,1,.61.46,29.81,29.81,0,0,1,4.65-.66l.89,0c2.17,0,3.54.45,3.82,1.26.36,1-1.06,2.72-3.85,4.49l-.42-.5a.24.24,0,0,0-.33,0,.23.23,0,0,0,0,.34l.37.45a41.44,41.44,0,0,1-7.93,3.62c-.51.17-1,.34-1.51.49a2.56,2.56,0,0,1,.48.45l1.22-.4A41.84,41.84,0,0,0,27.65,18.23Z"></path>
      <path d="M24.6,12.85c-.49,0-1,.08-1.56.15L23,13a.24.24,0,0,0-.34,0h0s0,0,0,.08a.23.23,0,0,0,.06.26l.17.14.52.44.05.05a.28.28,0,0,0,.16,0,.23.23,0,0,0,.18-.08.25.25,0,0,0,0-.34l-.23-.19c.38,0,.77-.09,1.13-.11l.66,0a7.64,7.64,0,0,1,1.12.07,1.9,1.9,0,0,1,.35-.4A10.29,10.29,0,0,0,24.6,12.85Z"></path>
      <path d="M11.37,22.19c-2,.1-3.32-.24-3.56-.94-.3-.87,1.1-2.38,3.76-3.9a4.07,4.07,0,0,1,0-.5C8.83,18.39,7,20.1,7.4,21.39c.28.83,1.42,1.25,3.3,1.25h.7a22.84,22.84,0,0,0,2.51-.31,2.75,2.75,0,0,1,.73-.58A22.17,22.17,0,0,1,11.37,22.19Z"></path>
      <path d="M19,20.55c-1,.33-1.9.6-2.82.83a3,3,0,0,1,1,.21c.66-.19,1.33-.4,2-.63a29,29,0,0,0,7.1-3.44,11.27,11.27,0,0,0,1.27-1,2.06,2.06,0,0,1-.42-.21,12.45,12.45,0,0,1-1.1.87A29,29,0,0,1,19,20.55Z"></path>
      <path d="M5.26,22a1.18,1.18,0,0,0,.33-1.25h0a1,1,0,0,0-.21-.37l0,0,0,0a1.3,1.3,0,0,0-.23-.18l-.12-.06-.09,0v0L4.64,20l-.12,0a1.21,1.21,0,0,0-.42.05,1.22,1.22,0,0,0-.68.6,1.19,1.19,0,0,0,0,.89h0a1.34,1.34,0,0,0,.22.36.76.76,0,0,0,.09.09,1,1,0,0,0,.23.17h0l.12.06a1.47,1.47,0,0,0,.28.08l.12,0h.09a1.33,1.33,0,0,0,.34-.05A1,1,0,0,0,5.26,22Z"></path>
      <path d="M27.14,14a1.12,1.12,0,0,0-.08.9h0a1,1,0,0,0,.21.35l.08.09a1.12,1.12,0,0,0,.22.16.34.34,0,0,0,.12.06l.06,0h0l.23,0h.15l.13,0h0a1,1,0,0,0,.24,0,1.16,1.16,0,0,0,.52-.4,1.12,1.12,0,0,0,.18-1,1.17,1.17,0,0,0-.21-.36l-.09-.08a.92.92,0,0,0-.22-.17l-.12-.06-.27-.07-.11,0-.13,0h0a1.28,1.28,0,0,0-.27,0,.92.92,0,0,0-.27.16h0A1.24,1.24,0,0,0,27.14,14Z"></path>
      <path d="M13.23,14.75a6.15,6.15,0,0,0-.37.78,5.38,5.38,0,0,0-.21.76,4.71,4.71,0,0,0-.09.52,5.49,5.49,0,0,0,.26,2.4,5.57,5.57,0,0,0,.88,1.61,50.21,50.21,0,0,0,9.77-3.43,5.35,5.35,0,0,0-.29-1.75,5.83,5.83,0,0,0-.32-.72l-.08-.15a6.73,6.73,0,0,0-.4-.63l-.08-.09a4.83,4.83,0,0,0-.37-.42l-.08-.08-.09-.1c-.07-.07-.15-.12-.23-.19L21.2,13l-.13-.09-.19-.11-.41-.25,0,0-.31-.13-.37-.15-.16-.05a.35.35,0,0,1-.11,0L18.86,12h-.08a5.19,5.19,0,0,0-.68,0h-.16l-.38,0-.39,0-.15,0a6,6,0,0,0-.81.2,5.43,5.43,0,0,0-1.25.63,5.26,5.26,0,0,0-1.36,1.3A4.28,4.28,0,0,0,13.23,14.75Z"></path>
      <path d="M17.89,23.66a1.77,1.77,0,0,0-.26-.49.86.86,0,0,0-.07-.1.1.1,0,0,0,0,0,1.57,1.57,0,0,0-.32-.31h0l-.07-.05a2,2,0,0,0-.42-.2l-.09,0a1.35,1.35,0,0,0-.28,0,2,2,0,0,0-.24,0h-.32a1.45,1.45,0,0,0-.36.08,2,2,0,0,0-.57.32h0a1.75,1.75,0,0,0-.36.36,2,2,0,0,0-.21.35,2,2,0,0,0-.15.49,1.62,1.62,0,0,0,0,.2,1.83,1.83,0,0,0,0,.52,2.44,2.44,0,0,0,.06.26,2.09,2.09,0,0,0,.26.49.36.36,0,0,1,.07.1,2.16,2.16,0,0,0,.38.36l.07,0a1.65,1.65,0,0,0,.42.21l.09,0a1.82,1.82,0,0,0,.52.08,1.61,1.61,0,0,0,.22,0h.11a2.37,2.37,0,0,0,.36-.09A2.83,2.83,0,0,0,17,26a3.55,3.55,0,0,0,.31-.23,2,2,0,0,0,.54-2.1Z"></path>
      <path d="M7,14.74a.24.24,0,0,0-.1.32l.24.43a.25.25,0,0,0,.21.12.19.19,0,0,0,.12,0,.24.24,0,0,0,.09-.32c-.09-.14-.16-.28-.24-.42A.24.24,0,0,0,7,14.74Z"></path>
      <path d="M18.71,25.89a.23.23,0,0,0-.26,0s-.05,0-.07.06a.19.19,0,0,0,0,.08.21.21,0,0,0,.1.24c.29.17.57.33.86.48a.2.2,0,0,0,.11,0,.22.22,0,0,0,.21-.12.24.24,0,0,0-.09-.33Z"></path>
      <path d="M31,24.69a.24.24,0,0,0-.22.26,5.21,5.21,0,0,1,0,.55c0,.13,0,.26,0,.38a.24.24,0,0,0,.21.26h0a.23.23,0,0,0,.23-.22,3,3,0,0,0,0-.42c0-.19,0-.4,0-.6A.24.24,0,0,0,31,24.69Z"></path>
      <path d="M18.73,10.5a.28.28,0,0,0,.13,0,.22.22,0,0,0,.2-.12.23.23,0,0,0-.08-.33c-.28-.17-.56-.34-.85-.5a.24.24,0,1,0-.23.41Z"></path>
      <path d="M9.74,7.29a7.69,7.69,0,0,1,.95.06h0a.24.24,0,0,0,0-.48,8.78,8.78,0,0,0-1-.06h0A.23.23,0,0,0,9.51,7,.24.24,0,0,0,9.74,7.29Z"></path>
      <path d="M7,8A.23.23,0,0,0,7.1,8a3.19,3.19,0,0,1,.8-.42.24.24,0,1,0-.16-.45,3.49,3.49,0,0,0-.92.48.24.24,0,0,0-.06.33A.23.23,0,0,0,7,8Z"></path>
      <path d="M5.9,12a.24.24,0,0,0-.17.3,8.71,8.71,0,0,0,.31.95.23.23,0,0,0,.22.16l.09,0a.25.25,0,0,0,.14-.31c-.12-.32-.22-.62-.3-.91A.24.24,0,0,0,5.9,12Z"></path>
      <path d="M12.58,7.72c.3.08.61.17.92.28h.07a.23.23,0,0,0,.23-.16.24.24,0,0,0-.15-.31c-.32-.11-.64-.2-1-.29a.24.24,0,0,0-.12.47Z"></path>
      <path d="M16.18,9.1a.2.2,0,0,0,.11,0A.24.24,0,0,0,16.5,9a.24.24,0,0,0-.11-.32l-.9-.42a.24.24,0,0,0-.31.13.23.23,0,0,0,.12.31Z"></path>
      <path d="M30.46,22a.24.24,0,0,0-.44.2c.14.31.26.6.36.89a.23.23,0,0,0,.22.16h.09a.24.24,0,0,0,.14-.31C30.73,22.65,30.6,22.34,30.46,22Z"></path>
      <path d="M30.2,27.55a2.73,2.73,0,0,1-.67.59.24.24,0,0,0-.08.33.26.26,0,0,0,.21.11.19.19,0,0,0,.12,0,3.09,3.09,0,0,0,.79-.69.24.24,0,0,0,0-.34A.25.25,0,0,0,30.2,27.55Z"></path>
      <path d="M27.78,28.68a7.26,7.26,0,0,1-.94,0,.23.23,0,0,0-.25.23.24.24,0,0,0,.23.25h.28c.25,0,.49,0,.73,0a.24.24,0,0,0,.21-.27A.22.22,0,0,0,27.78,28.68Z"></path>
      <path d="M5.69,10.56h0a.24.24,0,0,0,.24-.24,3.6,3.6,0,0,1,.15-.9.25.25,0,0,0-.17-.3.23.23,0,0,0-.29.16,4.19,4.19,0,0,0-.17,1A.25.25,0,0,0,5.69,10.56Z"></path>
      <path d="M24.94,28.46c-.3-.07-.61-.14-.93-.23a.23.23,0,0,0-.3.16.25.25,0,0,0,.17.3l1,.24h.05a.24.24,0,0,0,.05-.47Z"></path>
      <path d="M22.18,27.6l-.89-.38a.23.23,0,0,0-.31.12.24.24,0,0,0,.12.32L22,28l.09,0a.25.25,0,0,0,.22-.15A.24.24,0,0,0,22.18,27.6Z"></path>
      <path d="M29.53,20.27c-.17-.28-.35-.55-.53-.83a.25.25,0,0,0-.34-.07.23.23,0,0,0-.06.33l.52.82a.23.23,0,0,0,.2.11.28.28,0,0,0,.13,0A.24.24,0,0,0,29.53,20.27Z"></path>
      <path d="M25.7,16a.23.23,0,0,0,.17-.07.24.24,0,0,0,0-.34l-.7-.69a.24.24,0,1,0-.33.34l.68.69A.23.23,0,0,0,25.7,16Z"></path>
    </svg>
  ),
  hauler: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 36 36"
      className="w-3 h-3 fill-slate-300 sm:h-8 sm:w-8"
      height="0.54em"
      width="0.54em"
      x="0.22999999999999998em"
      y="0.22999999999999998em"
    >
      <path d="M4.39,20.42l-.88.71v7.19l.88,1.18,6.35,1.7.88-.7V23.3l-.88-1.18ZM7.89,30,7,29.73V21.64l.88.25Z"></path>
      <polygon points="7.89 17.33 4.97 19.7 7.89 20.47 7.89 17.33"></polygon>
      <path d="M19.16,24.58l-5.37-1.44-.88.7V31l.88,1.18,3.59,1,2.76.74.88-.7V26l-.88-1.18ZM17.29,32.7l-.89-.25V24.36l.89.25V32.7Z"></path>
      <polygon points="31.13 19.42 29.71 20.6 23.82 25.54 22.93 25.42 21.86 26.31 21.81 32.88 22.8 32.06 23.14 30.99 29.71 25.57 30.49 24.93 31.29 25.03 32.15 24.31 32.2 17.74 31.46 18.36 31.13 19.42"></polygon>
      <polygon points="22.78 18.6 17.22 23.17 19.97 23.9 20.37 24.01 29.71 16.42 31.16 15.24 29.71 14.86 27.91 14.38 22.78 18.6"></polygon>
      <polygon points="32.49 16.54 31.85 15.76 29.71 17.52 21.01 24.66 21.65 25.43 29.71 18.81 32.49 16.54"></polygon>
      <path d="M14.21,22.15l.36.1,1.21.32.88-.71v-7.2h0c-.19-.27-.35-.47-.5-.68v0c-.11-.14-.22-.28-.35-.47l-2.37-.63-4-1.07-.88.71v7.2l.42.56.46.62,1.1.29.45.12,1.08.29.35.1.84.22Zm-1.29-.81-.43-.12-.08,0-.14,0L12,21.1V13l.87.24h0v8.09Z"></path>
      <polygon points="22.8 16.32 25.67 13.96 25.82 13.83 26.13 13.57 26.92 13.68 27.79 12.96 27.8 11.69 27.84 6.39 27.09 7.01 26.76 8.06 23.48 10.81 21.52 12.46 19.73 13.96 19.46 14.18 18.57 14.07 17.5 14.96 17.49 16 17.48 17.13 17.47 18.43 17.46 19.45 17.46 19.91 17.44 21.53 18.44 20.7 18.78 19.64 22.8 16.32"></polygon>
      <polygon points="14.1 10.66 15.14 10.92 13.73 12.05 14.23 12.18 16.01 12.65 16.64 12.14 17.55 11.41 26.8 3.89 24.51 3.29 23.39 4.18 22.34 3.92 23.48 3.01 20.8 2.3 11.93 9.5 10.01 11.06 12.69 11.77 14.1 10.66"></polygon>
      <polygon points="16.65 13.3 16.75 13.43 17.19 13.96 17.28 14.07 17.43 13.96 19.81 12.01 21.7 10.45 28.12 5.18 27.49 4.41 18.61 11.69 16.65 13.3"></polygon>
    </svg>
  ),
  dietitian: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 36 36"
      className="w-3 h-3 fill-slate-300 sm:h-8 sm:w-8"
      x="0.22999999999999998em"
      y="0.22999999999999998em"
    >
      <path d="M25.16,6.16A7.32,7.32,0,0,0,25.38,1a7.34,7.34,0,0,0-4.15,3.06,6.87,6.87,0,0,0-.38,4.56,87.94,87.94,0,0,0-5.69,26.45l.74,0a87.33,87.33,0,0,1,5.58-26A6.9,6.9,0,0,0,25.16,6.16Z"></path>
      <path d="M9.92,25.8,8,19.79l1.48,6.58a6.3,6.3,0,0,0,1.13,4,6.79,6.79,0,0,0,4.3,2.08,6.8,6.8,0,0,0-1.08-4.66A6.47,6.47,0,0,0,9.92,25.8Z"></path>
      <path d="M18.7,28.37a6.83,6.83,0,0,0-2.08,4.31,6.8,6.8,0,0,0,4.66-1.08,6,6,0,0,0,1.9-3.3h0l3.08-6.47-3.19,5.44A6.54,6.54,0,0,0,18.7,28.37Z"></path>
      <path d="M19.77,22.53a6.78,6.78,0,0,0-2.55,4A6.8,6.8,0,0,0,22,26,6.15,6.15,0,0,0,24.23,23h0L28,16.86l-3.78,5.05A6.53,6.53,0,0,0,19.77,22.53Z"></path>
      <path d="M10.84,19.51a6.23,6.23,0,0,0,.67,4.14,6.8,6.8,0,0,0,4,2.54A6.77,6.77,0,0,0,15,21.45,6.47,6.47,0,0,0,11.32,19l-1.23-6.18Z"></path>
      <path d="M21.24,16.28a6.82,6.82,0,0,0-2.73,3.92,6.8,6.8,0,0,0,4.77-.34,6,6,0,0,0,2.39-3h0l4-5.91-4,4.87A6.54,6.54,0,0,0,21.24,16.28Z"></path>
      <path d="M12.45,12.86A6.41,6.41,0,0,0,12.93,17a6.79,6.79,0,0,0,3.93,2.72A6.8,6.8,0,0,0,16.52,15,6.47,6.47,0,0,0,13,12.37L12,6.13Z"></path>
      <path d="M18.51,13.46a6.79,6.79,0,0,0,.17-4.77,6.78,6.78,0,0,0-3.62-3.13,6.82,6.82,0,0,0-.17,4.78A6.82,6.82,0,0,0,18.51,13.46Z"></path>
      <path d="M23.23,10.47a6.86,6.86,0,0,0-3.13,3.62,6.82,6.82,0,0,0,4.78.17A6.83,6.83,0,0,0,28,10.64,6.83,6.83,0,0,0,23.23,10.47Z"></path>
    </svg>
  ),
  prospector: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 36 36"
      className="w-3 h-3 fill-slate-300 sm:h-8 sm:w-8"
      x="0.22999999999999998em"
      y="0.22999999999999998em"
    >
      <polygon points="15.59 25.31 18.57 28.22 21.54 25.31 21.54 21.1 22.3 20.71 22.3 18.94 21.54 19.33 15.59 22.43 14.85 22.81 14.85 24.59 15.59 24.2 15.59 25.31"></polygon>
      <polygon points="15.59 17.5 21.54 14.41 21.54 12.55 22.3 12.16 22.3 10.38 21.54 10.77 15.59 13.87 14.85 14.26 14.85 16.03 15.59 15.64 15.59 17.5"></polygon>
      <polygon points="21.54 4.47 15.59 4.47 15.59 8.95 21.54 5.85 21.54 4.47"></polygon>
      <polygon points="15.59 13.06 21.54 9.97 21.54 8.43 22.3 8.04 22.3 6.26 21.54 6.66 15.59 9.76 14.85 10.14 14.85 11.91 15.59 11.53 15.59 13.06"></polygon>
      <polygon points="15.59 21.62 21.54 18.52 21.54 16.99 22.3 16.6 22.3 14.82 21.54 15.21 15.59 18.31 14.85 18.7 14.85 20.47 15.59 20.09 15.59 21.62"></polygon>
      <polygon points="25.8 14.59 26.26 13.19 25.06 12.32 23.87 13.19 24.33 14.59 25.8 14.59"></polygon>
      <polygon points="31.02 7.17 30.23 5.63 28.52 5.9 28.25 7.61 29.79 8.39 31.02 7.17"></polygon>
      <polygon points="28.03 13.51 28.8 12.74 28.31 11.77 27.23 11.94 27.08 12.89 27.06 13.02 27.08 13.03 28.03 13.51"></polygon>
      <polygon points="7.48 7.85 8.42 6.4 7.33 5.05 5.71 5.67 5.81 7.4 7.48 7.85"></polygon>
      <polygon points="7.58 10.8 7.91 11.82 8.98 11.82 9.31 10.8 8.44 10.18 7.58 10.8"></polygon>
      <polygon points="13.6 12.97 12.87 11.4 11.15 11.61 10.82 13.31 12.33 14.15 13.6 12.97"></polygon>
      <path d="M24.5,16.16v8.73a2.26,2.26,0,0,1-1.05,1.92L18.6,31.43l-5.26-4.59a2.28,2.28,0,0,1-1-1.87V16.15L1.72,13.32v1.5l9.2,2.45V25a3.69,3.69,0,0,0,1.52,3l6.2,5.42L24.3,28A3.7,3.7,0,0,0,26,24.89V17.26l8.79-2.5V13.25Z"></path>
    </svg>
  ),
};

const getCrewStats = (crew) => {
  const stats = Object.values(entityCrewmate.ABILITY_TYPES);
  const classIds = Object.entries(entityCrewmate.CLASS_IDS);
  const classById = (id) => {
    const className = classIds.find(([key, value]) => value === id);
    return className ? className[0] : "N/A";
  };

  return stats.map((stat) => ({
    name: stat.name,
    class: stat.class,
    departments: Object.entries(stat.departments ?? {}),
    traits: Object.entries(stat.traits ?? {}),
    class: classById(stat.class),
  }));
};

const Departments = ({ departments }) => {
  return (
    <div className="flex flex-col gap-2">
      {departments.map(([key, value]) => (
        <div
          key={entityCrewmate.DEPARTMENTS[key].name}
          className="flex flex-col items-start gap-2 pb-1"
        >
          <div>{entityCrewmate.DEPARTMENTS[key].name}</div>
          <div className="text-lg">{value}</div>
        </div>
      ))}
    </div>
  );
};

const Traists = ({ traits }) => {
  return (
    <div className="flex items-start">
      {traits.map(([key, value]) => (
        <div
          key={entityCrewmate.TRAITS[key].name}
          className="flex flex-col items-start gap-2 pb-1"
        >
          <div>{entityCrewmate.TRAITS[key].name}</div>
          <div className="text-lg">{value}</div>
        </div>
      ))}
    </div>
  );
};

export function Titles() {
  const titles = Object.values(entityCrewmate.TITLES)
    .filter((t) => t.name !== "None")
    .map((title) => {
      return {
        name: title.name,
        department: title.department
          ? entityCrewmate.DEPARTMENTS[title.department].name
          : "N/A",
        tier: title.tier ?? "N/A",
      };
    });

  return (
    <div className="px-4 mb-4 sm:mb-8 lg:mb-10 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-base font-semibold leading-6 text-gray-900">
            Titles
          </h2>
        </div>
      </div>
      <div className="flow-root mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Department
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Tier
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {titles
                    .sort((a, b) => a.department > b.department)
                    .map((title) => (
                      <tr key={title.email}>
                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6">
                          {title.name}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {title.department}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {title.tier}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CrewStats({ crew }) {
  const stats = getCrewStats([]).sort((a, b) => a.class.localeCompare(b.class));

  return (
    <div className="px-4 mb-4 sm:px-6 lg:px-8 sm:mb-8 lg:mb-10">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-base font-semibold leading-6 text-gray-900">
            Abilities
          </h2>
        </div>
      </div>
      <div className="flow-root mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Ability
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Class
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Traits
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Department
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Further Modified
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.map((stat) => (
                    <tr key={stat.name}>
                      <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6">
                        {stat?.name}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {stat.class || "N/A"}
                      </td>
                      <td className="flex items-start px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {/* {stat.traits || "N/A"} */}
                        <Traists traits={stat.traits} />
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {/* {stat?.departments || "N/A"} */}
                        <Departments departments={stat.departments} />
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {stat.notFurtherModified ? "yes" : "no"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Avatar({ crewmate }) {
  return (
    <div className="flex-grow bg-slate-800 rounded-2xl">
      <div className="px-8 py-10">
        <img
          className="w-48 h-48 mx-auto rounded-full md:h-56 md:w-56"
          src={classesImgs[crewmate.class.toLowerCase()].src}
          alt=""
        />
        <div className="flex flex-row justify-center gap-4">
          <div>
            <h2 className="mt-6 text-xl font-bold leading-7 tracking-tight text-slate-50">
              {crewmate.collection}
            </h2>
          </div>
        </div>
      </div>
      <div className="w-full p-2 px-8 py-10 bg-slate-600/20 rounded-b-2xl">
        <div className="flex flex-row items-center gap-2 mb-2 sm:mb-4">
          <div className="">
            <span className="sr-only">Crewmate class logo</span>
            <span>{classesImgs[crewmate.class.toLowerCase()].logo}</span>
          </div>
          <div className="text-lg font-semibold leading-7 tracking-tight text-slate-200">
            {crewmate.class}
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div>
            <span className="sr-only">LinkedIn</span>
            <span>{traitsSVGs[crewmate.traits.toLowerCase()]}</span>
          </div>
          <p className="text-sm leading-6 text-slate-300">{crewmate.traits}</p>
        </div>
      </div>
    </div>
  );
}

export function CrewList({ crew }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="p-4 bg-slate-200">
        {
          <div>
            <ul
              role="list"
              className="grid max-w-2xl grid-cols-1 gap-2 mx-auto mb-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-5 sm:gap-3 lg:gap-8"
            >
              {crew?.map((crewmate) => (
                <li key={crewmate.id} className="">
                  <Avatar crewmate={crewmate} />
                </li>
              ))}
            </ul>
            <Titles />
            <CrewStats crew={crew} />
          </div>
        }
      </div>
    </div>
  );
}
