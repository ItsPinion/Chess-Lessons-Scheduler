"use client";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { toast } from "~/components/ui/use-toast";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { getOffset } from "./available-times";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { createLesson } from "~/server/lesson";
import { hourglass } from "ldrs";
import Link from "next/link";

hourglass.register();

const FormSchema = z.object({
  name: z.string({}).min(2, {
    message: "name must be at least 2 characters.",
  }),
  email: z
    .string({
      required_error: "Please enter an email address.",
    })
    .email({
      message: "Invalid email address",
    }),
  discord: z.string().min(2, {
    message: "Discord usename must be at least 2 characters",
  }),
  chess: z
    .string({
      required_error: "Please enter an URL.",
    })
    .url({
      message: "Invalid URL",
    }),
  notes: z.string().max(1000, {
    message: "Additional info. must be at most 1000 characters",
  }),
  transaction: z.string(),
  lesson_type: z.enum(
    ["Free", "First Casual", "First Serious", "Casual", "Serious"],
    {
      required_error: "Please select an lesson type first.",
    },
  ),
});

export default function FormPanel() {
  const { user } = useUser();

  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      discord: user?.externalAccounts.some(
        (account) => account.provider === "discord",
      )
        ? `${user?.username}`
        : "",
      email: user?.emailAddresses[0]?.emailAddress ?? "",
      notes: "",
      transaction: "",
    },
  });

  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationFn: createLesson,

    onSuccess: (data) => {
      toast({
        description: (
          <div
            className={`mt-2 w-[340px] rounded-md ${data.success ? "bg-green-600" : "bg-red-600"} p-4`}
          >
            <p className="text-center text-white">{data.message}</p>
          </div>
        ),
      });
      // form.reset();
      data.success && location.replace("/");
    },
  });

  if (typeof window === "undefined") {
    return null;
  }
  console.log(searchParams.get("slot")!);

  return !isLoading ? (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          async (data) =>
            await mutateAsync({
              user_id: user?.id ?? "0",
              ...data,
              time: new Date(searchParams.get("slot")!).getTime(), 
              date: searchParams.get("date")!,
              offset: getOffset() * 10,
            }),
        )}
        className="w-2/3 space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Your name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input className="bg-[#36393e]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email address <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input className="bg-[#36393e]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discord"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                What&#39;s your Discord username?
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input className="bg-[#36393e]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="chess"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                The site that you play on the most—put a link to your profile.
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-[#36393e]"
                  placeholder="Ex: https://www.chess.com/member/jpetersonchess"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lesson_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Lesson Type <span className="text-red-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a lesson type to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Free">Free Lesson -- 0$</SelectItem>
                  <SelectItem value="First Casual">
                    First Casual Lesson -- 0$
                  </SelectItem>
                  <SelectItem value="First Serious">
                    First Serious Lesson -- 0$
                  </SelectItem>
                  <SelectItem value="Casual">Casual Lesson -- 10$</SelectItem>
                  <SelectItem value="Serious">Serious Lesson -- 20$</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="transaction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                What is PayPal transcation ID of your payment?
                <span className="text-red-500">*</span>
                <div className="flex flex-col gap-2 p-3">
                  <Link
                    target="_blank"
                    href="https://www.paypal.com/paypalme/JonathanPeterson611"
                    className="flex flex-row items-center justify-start gap-1"
                  >
                    1. Click this link:{" "}
                    <span className="text-blue-500">JonathanPeterson611</span>
                    <FaExternalLinkAlt />
                  </Link>

                  <span>2. Send me the payment for the selected lesson</span>
                  <span>2. Go to your email</span>
                  <span>3. Open the email you just received from PayPal</span>
                  <span>4. Copy the transcation ID from the email</span>
                  <span>
                    5. Enter your PayPal transcation ID in the field below
                  </span>
                </div>
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-[#36393e]"
                  placeholder="Leave it empty if the lesson is free"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional notes</FormLabel>
              <FormControl>
                <Textarea className="bg-[#36393e]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-[100%] flex-row items-center justify-center gap-3">
          <Button
            variant="expandIcon"
            Icon={FaArrowLeftLong}
            iconPlacement="left"
            className="border-2 border-solid border-white bg-transparent text-xs  text-white hover:bg-[#2e2d2d71] "
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="expandIcon"
            Icon={FaArrowRightLong}
            iconPlacement="right"
          >
            Book
          </Button>
        </div>
      </form>
    </Form>
  ) : (
    <div className="flex min-h-[100%] w-[100%] flex-col items-center justify-center">
      <l-hourglass
        size="100"
        bg-opacity="0.1"
        speed="1.75"
        color="white"
      ></l-hourglass>
    </div>
  );
}
