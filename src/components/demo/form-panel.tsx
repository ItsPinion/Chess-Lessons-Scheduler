import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import { Textarea } from "~/components/ui/textarea";

import { UserPlus, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type Guest = {
  email: string;
};

export function FormPanel() {
  const router = useRouter();

  const [guests, setGuests] = React.useState<Guest[]>([]);

  const addGuest = () => {
    setGuests([...guests, { email: "" }]);
  };

  const removeGuest = (index: number) => {
    setGuests(guests.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, email: string) => {
    setGuests(guests.map((guest, i) => (i === index ? { email } : guest)));
  };

  const hasGuests = guests.length > 0;

  return (
    <form className="flex w-[360px] flex-col gap-5">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">Your name *</Label>
        <Input
          className="bg-[#36393e]"
          id="name"
          defaultValue="Damián Ricobelli"
        />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="email">Email address *</Label>
        <Input
          className="bg-[#36393e]"
          id="email"
          type="email"
          defaultValue="dricobelli@gmail.com"
        />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="email">Additional notes</Label>
        <Textarea
          className="bg-[#36393e]"
          id="notes"
          placeholder="Please share anything that will help prepare for our meeting"
        />
      </div>
      {hasGuests && (
        <>
          <Label htmlFor="email">Add guests</Label>
          <div className="flex flex-col gap-1">
            {guests.map((guest, index) => (
              <div key={index} className="relative flex items-center space-x-2">
                <Input
                  id="guest"
                  type="email"
                  placeholder="Email"
                  value={guest.email}
                  onChange={(e) => handleChange(index, e.target.value)}
                />{" "}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <X
                        className="absolute right-2 top-1/2 size-4 -translate-y-1/2 transform cursor-pointer"
                        onClick={() => removeGuest(index)}
                      />
                    </TooltipTrigger>
                    <TooltipContent>Remove email</TooltipContent>
                  </Tooltip>{" "}
                </TooltipProvider>
              </div>
            ))}
          </div>
        </>
      )}
      <Button
        type="button"
        variant="ghost"
        onClick={() => addGuest()}
        className="w-fit"
      >
        <UserPlus className="mr-2 size-4" />
        Add guests
      </Button>
      <p className="text-gray-11 my-4 text-xs">
        By proceeding, you agree to our{" "}
        <span className="text-gray-12">Terms</span> and{" "}
        <span className="text-gray-12">Privacy Policy</span>.
      </p>
      <div className="flex justify-end gap-2">
        <Button
          variant="ghost"
          onClick={() => {
            router.back();
          }}
        >
          Back
        </Button>
        <Button asChild type="button">
          <Link href="/">Continue</Link>
        </Button>
      </div>
    </form>
  );
}
