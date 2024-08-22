import Image from "next/image";
import Link from "next/link";
import { Age } from "../_components/age";

export default function AboutPage() {
  return (
    <main className="flex flex-col items-start justify-center gap-3 px-28 py-10">
      <h1 className="m-2 mx-auto text-6xl font-bold text-primary hover:drop-shadow-[0px_0px_10px_rgba(50,100,255,1)]">
        About Me
      </h1>
      <span className="text-transparent/10">
        Actuallt I am not a chess couch, but lets pretend I am lol. All of these
        are fake info, dont contect me for chess coaching :) . I made this
        website for a client but at the end.. like literally at the end.. when I
        was totally done with the website.... he turn turned out be a scammer.
        But I thought it would be a waste if I didn&#39;t share it with you all.
        I spend a lot of time working on this website. The booking systen made
        me go nuts. Oh and it was my very first website that I made or wanted to
        make for a client. But sadly this happned. Well nothing will come crying
        over it... so.. yea... just wanted to share this with you all. Maybe
        some day I will come back to this website and cringe over it.... or
        maybe I am gonna die lol, who knows. bye.
      </span>{" "}
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div className="flex flex-col gap-3">
          <p className="text-lg">
            Hello everyone, my name is{" "}
            <span className="text-primary">Pinion</span>. I&#39;m a <Age /> who
            lives in{" "}
            <span className="text-primary">Dhaka in the Bangladesh</span>. I
            started playing chess around the{" "}
            <span className="text-primary">ages of 7 - 9</span>. During this
            time I would just play my dad. Later on my dad got a program called{" "}
            <span className="text-primary">Fritz 14</span>. I played that
            computer for hours (btw it has different levels you can play it at).
            Of course I would usually lose. When I was in the{" "}
            <span className="text-primary">8th grade</span> (I think I was 14 at
            that time), I thought, &quot;You know I bet there are chess sites on
            the Internet.&quot; So I typed in{" "}
            <Link
              target="_blank"
              href={"https://www.chess.com/member/itspinion"}
              className="text-green-500"
            >
              chess.com
            </Link>
            , thinking that it was a site, and what do you know? It was! Then I
            played with people on there, and when I did...
          </p>
          <p className="text-lg">
            <b>BOY</b>, were they different! They confused the crap out of me,
            playing moves so unlike the computer.
          </p>
          <p className="text-lg">
            I struggled for a long time trying to increase my rating. I had to
            be below 1000 in the 8th grade. At some point in the{" "}
            <span className="text-primary">9th grade</span>, I think I hit{" "}
            <span className="text-primary">1200 elo</span>. As time went by I
            would increase my rating, but it certainly wasn&#39;t easy. I think
            I increased my rating from{" "}
            <span className="text-primary">1400 - 1500</span> just from doing a
            tactics book that I was given. As time went by I tried to sharpen my
            tactics and my chess mind (in general). If I&#39;m not mistaken, it
            was in the <span className="text-primary">10th grade</span> when I
            hit <span className="text-primary">1800 elo</span>.
          </p>
        </div>
        <Image
          src="https://cdn.discordapp.com/avatars/774223452680486962/662bdd4cedc162a3387730efd0fdbdc8.webp?size=4096"
          alt="ItsPinion"
          width={450}
          height={450}
          className="m-10 rounded-full border-4 border-solid border-primary p-0 transition-all duration-1000 ease-in-out hover:shadow-[0px_0px_100px_rgba(50,100,255,1)]"
        />
      </div>
      <p className="text-lg">
        But then something happened in{" "}
        <span className="text-primary">Jan. 2021</span> (I think it was at this
        time) that everything would change... I got SICK of chess... I thought
        that because my time was limited, I needed to become a grandmaster fast.
        I listened to the thought that so many people believe in, where you have
        to start playing young to significantly increase your chances of
        becoming a grandmaster. While that&#39;s true,{" "}
        <b className="text-primary">
          I think people go wrong with thinking that you can&#39;t become a
          grandmaster if you start playing chess as an adult.
        </b>{" "}
        I&#39;m sure many people think that if you don&#39;t start as a kid, you
        can&#39;t become a GM.{" "}
        <b className="text-primary">
          But did you know that 5 people became grandmasters in their 80s?
        </b>
      </p>
      <p className="text-lg">
        The pressure of trying to be a GM was incredibly annoying, because I
        hadn&#39;t played chess seriously most of my life, and I was already in
        the 10th out of the 12th grade. I thought that I didn&#39;t have the
        skills to become a GM or get any master&#39;s title before 12th grade
        ended. And because of this, chess became a 9 - 5 job that no one likes.
        Essentially, what I&#39;m saying is is that I forced myself to get
        better. And because of this, in January of 2020, I quit chess
        altogether...
      </p>
      <p className="text-lg">Then...</p>
      <p className="text-lg">
        Around April 10 of this year, I suddenly remembered one of the reasons
        why I loved chess so much: that dang computer (meaning any engine)
        giving me those decimal numbers. I LOVED THAT. That feeling just came
        out of nowhere around that time.
      </p>
      <p className="text-lg">
        Then I thought, &#34;Let me try to join some discord servers and help
        out some people.&#34; It was soon when I found @duta, who if I&#39;m not
        mistaken is my very first student. Around this time I was hopping on
        voice channels and such, and I&#39;ve met people like @Six Dots of
        Snowflakes, which was cool!
      </p>
      <p className="text-lg">
        Forget decimals (I&#39;m kidding a little)! Now that I think about it
        more, I really like playing chess when I know the person I&#39;m
        playing. It&#39;s even more fun over the board!
      </p>
      <p className="text-lg">
        Now in the present, I now have{" "}
        <span className="text-primary">3000B+ students ;) </span>, so this shall
        be an interesting time!
      </p>
      <b className="mx-auto my-10 text-4xl text-primary">
        LET&#39;S WIN SOME CHESS GAMES BOYS & GIRLS!
      </b>
    </main>
  );
}
