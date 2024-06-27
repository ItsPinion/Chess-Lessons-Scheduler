import { cn } from "~/lib/utils";
import { type AriaButtonProps, useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import type { CalendarState } from "@react-stately/calendar";
import { useRef } from "react";

export function Button(
  props: AriaButtonProps<"button"> & {
    state?: CalendarState;
    side?: "left" | "right";
  },
) {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      className={cn(
        "text-white rounded-lg p-2 outline-none",
        props.isDisabled ? "text-gray-7" : "hover:bg-gray-4 active:bg-gray-5",
        isFocusVisible && "ring-gray-9 ring-2 ring-offset-2",
      )}
    >
      {props.children}
    </button>
  );
}
