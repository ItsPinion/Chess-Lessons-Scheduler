"use client";
import { FaChessPawn } from "react-icons/fa";
import { SiDiscord } from "react-icons/si";
import { ImYoutube } from "react-icons/im";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { cn } from "~/lib/utils";

import { forwardRef } from "react";
import type {
  ComponentPropsWithoutRef,
  Dispatch,
  ElementRef,
  SetStateAction,
} from "react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Coming Soon",
    href: "#",
    description: "Just wait for it to be released",
  },
];

export function MainNavigationMenu({
  setIsHovered,
}: {
  setIsHovered: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Getting started
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/book"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Book a Lesson
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                    Schedule a lesson with Me
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <span className="flex flex-row items-center justify-start gap-3 rounded-md bg-[#8d131371] px-4">
                <ImYoutube className="mr-2 h-16 w-16 text-[#8d1313]" />

                <ListItem
                  href="https://discord.com/users/1023317171876671509"
                  title="Youtube"
                  className="px-auto flex flex-col"
                >
                  Watch interesting videos about chess by me.
                </ListItem>
              </span>
              <span className="flex flex-row items-center justify-start gap-3 rounded-md bg-[#4f75ff8b] px-4">
                <SiDiscord className="mr-2 h-16 w-16 text-[#4f75ff]"/>

                <ListItem href="https://discord.gg/ReeHfWQSMn" title="Discord Server">
                  Meet the community and ask questions about chess
                </ListItem>
              </span>

              <span className="flex flex-row items-center justify-start gap-3 rounded-md bg-[#16a2378b] px-4"> 
              <FaChessPawn className="mr-2 h-16 w-16 text-[#16a237]"/>

              <ListItem href="https://www.chess.com/member/jpetersonchess" title="Chess.com">
                Visit my chess.com profile and see what I play
              </ListItem>

              </span>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Lessons
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About Me
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors  hover:text-accent-foreground  focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";
