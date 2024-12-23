import car_marker from "@/assets/icons/car_marker.png";
import marker_icon from "@/assets/icons/marker_icon.png";
import my_location_icon from "@/assets/icons/my_location.png";
import email from "@/assets/icons/email.png";
import lock from "@/assets/icons/lock.png";
import person from "@/assets/icons/person.png";
import close from "@/assets/icons/close.png";

import check from "@/assets/images/check.png";
import getStarted from "@/assets/images/get_started.png";
import message from "@/assets/images/message.png";
import signUpCar from "@/assets/images/signup_car.png";
import parkingP from "@/assets/images/parkingP.png";
import parking_layout1 from "@/assets/images/parking_layout.jpg";
import parkingkaP from "@/assets/images/parking_p.png";
import map_parkease from "@/assets/images/map_parkease.png";
import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";
import car_top_view from "@/assets/images/car_top_view.png"
import parking_slot from "@/assets/images/parking_slot.jpeg"
import dotted_lines from "@/assets/images/dotted_lines.jpeg"

export const images = {
  getStarted,
  signUpCar,
  check,
  message,
  parkingP,
  parking_layout1,
  parkingkaP,
  map_parkease,
  onboarding1,
  onboarding2,
  onboarding3,
  car_top_view,
  parking_slot,
  dotted_lines
};

export const icons = {
  marker_icon,
  car_marker,
  my_location_icon,
  close,
  email,
  lock,
  person,
};

export const onboarding = [
  {
    id: 1,
    title: "Find Parking Effortlessly",
    description:
      "Say goodbye to the hassle of searching. Locate the nearest parking spots with ease.",
    image: images.onboarding1,
  },
  {
    id: 2,
    title: "Book Your Spot Instantly",
    description:
      "Reserve your parking space ahead of time and avoid last-minute stress.",
    image: images.onboarding2,
  },
  {
    id: 3,
    title: "Seamless Parking Experience",
    description:
      "Park with confidence, save time, and make every journey smooth with ParkEase.",
    image: images.onboarding3,
  },
];
