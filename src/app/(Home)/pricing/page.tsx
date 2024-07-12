"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { cn } from "~/lib/utils";


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
    <h2 className="text-3xl font-bold text-primary hover:drop-shadow-[0px_0px_10px_rgba(50,100,255,1)]">
      {title}
    </h2>
    <p className="pt-1 text-xl">{subtitle}</p>
    <br />
  </section>
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
      `flex w-80 flex-col justify-between bg-[#151719] py-1 ${popular ? "border-2 border-primary bg-[#0c0d0e]" : "border-zinc-700"} mx-auto sm:mx-0`,
      {
        "animate-background-shine bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] transition-colors":
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
        <CardDescription className="h-28 pt-1.5">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {features.map((feature: string) => (
          <CheckItem key={feature} text={feature}/>
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
      description:
        "Please select this option only if you are in a financial emergency. Regular students who make payments at least once every 30 days are not eligible for this option.",
      features: [
        "Free Lesson",
        "One lesson every 30 days",
        "One hour of lesson",
      ],
    },
    {
      title: "Casual",
      monthlyPrice: 10,
      description:
        "For students who are more focused on maintaining their chess skills than on improvement, please note that my assistance will not be geared toward achieving your highest potential rating. ",
      features: [
        "Weekly lessons",
        "One hour of lesson",
        "Limited commitment to improvement",
        "First Casual Lesson is complimentary",
      ],
      popular: true,
    },
    {
      title: "Serious",
      monthlyPrice: 20,
      description:
        "For students committed to improving their chess, we will focus on enhancing specific areas of your game. Our approach will be thorough, addressing one aspect at a time to help you reach your goals.",
      features: [
        "One lesson every week",
        "One hour of lesson",
        "Serious focus on skill improvement",
        "Going all in to achieve your goals",
        "First Serious Lesson is complimentary",
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
