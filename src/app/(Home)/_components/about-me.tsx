"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export function AboutMe() {
  return (
    <div className="my-10 flex flex-row items-center justify-center">
      <motion.div
        initial={{ x: -600 }}
        whileInView={{ x: -50 }}
        transition={{ duration: 0.5 }}
        className="flex w-[50%] flex-col items-center justify-center rounded-full rounded-l bg-primary px-20  py-5 text-start"
      >
        <h1 className="scroll-m-20 border-b text-4xl font-extrabold tracking-tight lg:text-5xl">
          ABOUT ME
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Hello everyone, my name is{" "}
          <b className="text-lime-500">Jonathan Peterson</b>, and I am a
          20-year-old <b className="text-orange-500">chess coach</b> from the
          U.S. I started playing chess around the{" "}
          <b className="text-red-500">ages of 7 - 9</b>. Eventually, I started
          playing online and in in-person tournaments. This led to one of my
          proudest achievements, which was winning{" "}
          <b className="text-orange-400">2nd place</b> at the 2020 MS State
          Chess Championship (grades 9 - 12 section).
        </p>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          I think it was in Jan. 2021 when I decided to stop playing chess
          altogether. In April of 2024, I decided to help people get better at
          chess, and not too long from that time, I decided to start taking
          chess seriously again.
        </p>

        <Link
          href={"/about"}
          className="my-3 mr-auto p-0 drop-shadow-[0px_0px_1px_rgba(30,64,175,1)] hover:bg-transparent hover:text-blue-800"
        >
          Read More...
        </Link>
      </motion.div>
      <div className="flex w-[50%] flex-col items-center justify-center bg-primary text-center"></div>
    </div>
  );
}
