import Svg, { Path } from "react-native-svg";

export const tablist = [
    {
      name: "index",
      title: "Maps",
    },
    {
      name: "Profile",
      title: "Profile",
    },
    {
      name: "activity",
      title: "Activity",
    },
  ];

export  const svgs = {
    index: (focused) => (
      <Svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={`${focused? "black":"grey"}`} className="size-6">
        <Path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
      </Svg>
    ),
    Profile: (focused) => (
      <Svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={`${focused? "black":"grey"}`} className="size-6">
        <Path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </Svg>
    ),
    activity: (focused) => (
      <Svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={`${focused? "black":"grey"}`} className="size-6">
        <Path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
      </Svg>
    ),
  };