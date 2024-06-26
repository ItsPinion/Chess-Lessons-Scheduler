"use client";

import {  motion } from "framer-motion";
import Link from "next/link";
import { AiTwotoneMail } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FooterForm } from "./footer-form";

const footerLinks = [
  {
    name: "Email",
    href: "mailto:jonapeter91@gmail.com",
    display: "jonapeter91@gmail.com",
    icon: AiTwotoneMail,
    color: "red",
  },
  {
    name: "Discord",
    href: "https://discord.com/users/1023317171876671509",
    display: "jonapeter",
    icon: FaDiscord,
    color: "white",
  },
  {
    name: "Youtube",
    href: "https://www.youtube.com/@JonaPeter",
    display: "@JonaPeter",
    icon: FaYoutube,
    color: "red",
  },
];

export function Footer() {
  return (
    <div>
      <motion.footer
        className="z-50 flex flex-row items-center justify-between bg-primary px-4 py-4"
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex w-[50%] flex-col items-center justify-start gap-3 mb-auto">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Contact
          </h2>
          <div className="flex flex-col items-start gap-7">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex flex-row items-center justify-center gap-1 text-lg font-medium leading-none"
              >
                <link.icon className={`text-${link.color}-800`} />
                <b> {link.name} : </b> {link.display}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex w-[50%] flex-col items-center justify-center">
          <FooterForm />
        </div>
      </motion.footer>
    </div>
  );
}

