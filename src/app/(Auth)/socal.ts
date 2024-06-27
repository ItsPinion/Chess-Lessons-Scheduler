import { RxDiscordLogo } from "react-icons/rx";
import { AiOutlineFacebook } from "react-icons/ai";
import { PiGoogleLogoDuotone } from "react-icons/pi";
import type { IconType } from "react-icons/lib";

export const socal:

{
  name: "discord" | "google" | "facebook";
  title: string;
  icon: IconType;
}[]

= [
  {
    name: "discord",
    title: "Discord",
    icon: RxDiscordLogo,
  },
  {
    name: "google",
    title: "Google",
    icon: PiGoogleLogoDuotone,
  },
  {
    name: "facebook",
    title: "Facebook",
    icon: AiOutlineFacebook,
  },
];
