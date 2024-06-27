import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useLocale } from "@react-aria/i18n";
import { CalendarIcon, Clock4 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { timeZones } from "./time-zones";
import Image from "next/image";
import { FcVideoCall } from "react-icons/fc";
export function LeftPanel({
  showForm,
  timeZone,
  setTimeZone,
}: {
  showForm: boolean | null;
  timeZone: string;
  setTimeZone: (timeZone: string) => void;
}) {
  const { locale } = useLocale();

  const searchParams = useSearchParams();
  const slotParam = searchParams.get("slot");

  return (
    <div className="flexflex-col gap-4 border-r pr-6">
      
      <div className="grid gap-3">
        <p className="text-gray-12 text-lg font-bold">Jonathan Peterson</p>
        {showForm && (
          <div className="text-gray-12 flex">
            <CalendarIcon className="mr-2 size-4" />
            <div className="flex flex-col text-sm font-semibold">
              <p>
                {new Date(slotParam!).toLocaleString(locale, {
                  dateStyle: "full",
                })}
              </p>
              <p>
                {new Date(slotParam!).toLocaleString(locale, {
                  timeStyle: "short",
                })}
              </p>
            </div>
          </div>
        )}
        <div className="text-gray-12 flex items-center">
          <Clock4 className="mr-2 size-4" />
          <p className="text-sm font-semibold">60 mins</p>
        </div>
        <div className="text-gray-12 flex items-center">
          <FcVideoCall
            className="mr-2"
          />{" "}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-sm font-semibold">Online lesson</p>
              </TooltipTrigger>
              <TooltipContent>Cal video</TooltipContent>
            </Tooltip>{" "}
          </TooltipProvider>
        </div>
        <Select value={timeZone} onValueChange={setTimeZone} >
          <SelectTrigger className="w-fit" >
            <SelectValue placeholder="Select time zone" >
              {timeZone.replace(/_/g, " ").split("(")[0]?.trim()}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-5 w-fit">
            {timeZones.map((timeZone) => (
              <SelectItem
                key={timeZone.label}
                value={timeZone.tzCode}
                className="dark:focus:bg-gray-2"
              >
                {timeZone.label.replace(/_/g, " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
