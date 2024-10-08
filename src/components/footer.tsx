"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AiTwotoneMail } from "react-icons/ai";
import { FaDiscord, FaChess, FaYoutube } from "react-icons/fa";
import { SiLichess } from "react-icons/si";
import { FooterForm } from "./footer-form";
import { usePathname } from "next/navigation";

const footerLinks = [
  {
    name: "Email",
    href: "mailto:pinionsnest@gmail.com",
    display: "pinionsnest@gmail.com",
    icon: AiTwotoneMail,
  },
  {
    name: "Discord",
    href: "https://discord.com/users/774223452680486962",
    display: "ItsPinion",
    icon: FaDiscord,
  },
  {
    name: "Youtube",
    href: "https://www.youtube.com/@ItsPinion",
    display: "ItsPinion",
    icon: FaYoutube,
  },
  {
    name: "Chess.com",
    href: "https://www.chess.com/member/ItsPinion",
    display: "ItsPinion",
    icon: FaChess,
  },
  {
    name: "Lichess",
    href: "https://lichess.org/@/ItsPinion",
    display: "ItsPinion",
    icon: SiLichess,
  },
];

export function Footer() {
  const pathname = usePathname();

  if (
    !pathname.split("/")[1]?.startsWith("book") &&
    !pathname.split("/")[1]?.startsWith("sign-up") &&
    !pathname.split("/")[1]?.startsWith("sign-in")
  ) {
    return (
      <div>
        <motion.footer
          className="z-50 flex flex-row items-center justify-between bg-primary px-4 py-4"
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-auto flex w-[50%] flex-col items-center justify-start gap-3">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Info
            </h2>
            <div className="flex flex-col items-start gap-7">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex flex-row items-center justify-center gap-1 text-lg font-medium leading-none"
                >
                  <link.icon />
                  <b> {link.name}: </b> {link.display}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex w-[50%] flex-col items-center justify-center">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Contact
            </h2>
            <FooterForm />
          </div>
        </motion.footer>
      </div>
    );
  } else null;
}
