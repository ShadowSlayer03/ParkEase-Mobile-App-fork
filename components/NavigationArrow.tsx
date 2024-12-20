import React from "react";
import Svg, { G, Path } from "react-native-svg";

const NavigationArrow = () => (
  <Svg width={20} height={20} viewBox="0 0 512 512">
    <G transform="rotate(270, 256, 256) scale(0.2)" fill="white" stroke="white">
      <Path d="M1815 2048 c-203 -94 -692 -318 -1085 -499 -522 -240 -717 -334 -724 -349 -20 -44 -1 -49 509 -135 267 -45 487 -84 489 -86 2 -2 29 -211 60 -464 39 -318 61 -464 70 -474 9 -8 24 -11 38 -8 19 5 47 55 149 264 70 142 308 624 530 1071 425 856 419 844 358 849 -13 1 -187 -73 -394 -169z" />
    </G>
  </Svg>
);

export default NavigationArrow;
