"use client";

import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import React, { useState } from "react";
import { cn } from "~/lib/utils";

type PricingSwitchProps = {
  onSwitch: (value: string) => void;
};

type PricingCardProps = {
  isYearly?: boolean;
  title: string;
  monthlyPrice?: number;
  yearlyPrice?: number;
  description: string;
  features: string[];
  popular?: boolean;
  exclusive?: boolean;
};

const PricingHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <section className="text-center">
    <h2 className="text-3xl font-bold text-primary hover:drop-shadow-[0px_0px_10px_rgba(50,100,255,1)]">{title}</h2>
    <p className="pt-1 text-xl">{subtitle}</p>
    <br />
  </section>
);

const PricingSwitch = ({ onSwitch }: PricingSwitchProps) => (
  <Tabs defaultValue="0" className="mx-auto w-40" onValueChange={onSwitch}>
    <TabsList className="px-2 py-6">
      <TabsTrigger value="0" className="text-base">
        Monthly
      </TabsTrigger>
      <TabsTrigger value="1" className="text-base">
        Yearly
      </TabsTrigger>
    </TabsList>
  </Tabs>
);

const PricingCard = ({
  title,
  monthlyPrice,
  description,
  features,
  popular,
  exclusive,
}: PricingCardProps) => (
  <Card
    className={cn(
      `flex w-72 flex-col bg-[#151719] justify-between py-1 ${popular ? "border-primary border-2 bg-[#0c0d0e]" : "border-zinc-700"} mx-auto sm:mx-0`,
      {
        "animate-background-shine bg-[length:200%_100%] transition-colors bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)]":
          exclusive,
      },
    )}
  >
    <div>
      <CardHeader className="pb-8 pt-4">
        <CardTitle className="text-lg text-zinc-700 dark:text-zinc-300">
          {title}
        </CardTitle>
        <div className="flex gap-0.5">
          <h3 className="text-3xl font-bold">{"$" + monthlyPrice}</h3>
          <span className="mb-1 flex flex-col justify-end text-sm">
            /Lesson
          </span>
        </div>
        <CardDescription className="h-24 pt-1.5">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {features.map((feature: string) => (
          <CheckItem key={feature} text={feature} />
        ))}
      </CardContent>
    </div>
   
  </Card>
);

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex gap-2">
    <CheckCircle2 size={18} className="my-auto text-green-400" />
    <p className="pt-0.5 text-sm text-zinc-700 dark:text-zinc-300">{text}</p>
  </div>
);

export default function Page() {
  const plans = [
    {
      title: "Free",
      monthlyPrice: 0,
      description: "Only choose this option if you literally have no money. Students that are regularly paying me, that is, at least once every 30 days, do not choose this option.",
      features: [
        "Free Lesson",
        "Lesson every 30 days",
        "One hour of Lesson",
      ],
    },
    {
      title: "Casual",
      monthlyPrice: 10,
      description: "For Students who doesn't really care about improving their chess, but care enough to pay money. Don't expect me to go all in and help you out with your dream rating. ",
      features: [
        "1 Lesson every day",
        "One hour of lesson",
        "Moderate level of care",
      ],
      popular: true,
    },
    {
      title: "Serious",
      monthlyPrice: 20,
      description: "For students who really care about improving their chess. We will go all in and focus on improving every area of your chess that needs improvement, one step at a time.",
      features: [
        "1 lesson every hour",
        "One hour of lesson",
        "Example Feature Number 3",
        "Going all in to reach your dream",
      ],
      exclusive: true,
    },
  ];
  return (
    <div className="py-8">
      <PricingHeader
        title="Pricing Plans"
        subtitle="Choose the plan that's right for you"
      />
      <section className="mt-8 flex flex-col justify-center gap-8 sm:flex-row sm:flex-wrap">
        {plans.map((plan) => {
          return <PricingCard key={plan.title} {...plan} />;
        })}
      </section>
    </div>
  );
}
