import { atom } from "recoil";

export const pageState = atom({
  key: "pageState",
  default: "login", // Set your initial value for page
});

export const otpState = atom({
  key: "otpState",
  default: 0, // Set your initial value for otp
});

export const emailState = atom({
  key: "emailState",
  default: "", // Set your initial value for email
});