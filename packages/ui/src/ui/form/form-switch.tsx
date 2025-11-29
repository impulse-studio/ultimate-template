"use client";

import { type RemixiconComponentType, RiEyeLine } from "@remixicon/react";
import { useId } from "react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import * as Label from "@/ui/label";
import * as Switch from "@/ui/switch";
import { cn } from "@/utils/cn";

interface FormSwitchProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  icon?: RemixiconComponentType;
}

export function FormSwitch<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  description,
  disabled,
  className,
  labelClassName,
  icon,
  ...controllerProps
}: FormSwitchProps<TFieldValues, TName>) {
  const uniqueId = useId();

  const Icon = icon ?? RiEyeLine;

  return (
    <Controller
      control={control}
      name={name}
      {...controllerProps}
      render={({ field }) => {
        const {
          onChange,
          value,
          disabled: fieldDisabled,
          ...restFieldProps
        } = field;

        return (
          <div
            className={cn(
              "flex items-start justify-between rounded-lg p-3 outline-none",
              "ring-1 ring-stroke-soft-200 ring-inset",
              "transition duration-200 ease-out",
              "focus-within:ring-1 focus-within:ring-stroke-strong-950 focus-within:ring-inset",
              "focus-within:shadow-button-important-focus"
            )}
          >
            <div className="flex gap-2">
              <Icon />
              <Label.Root className="block cursor-pointer" htmlFor={uniqueId}>
                <div className="text-label-sm text-text-strong-950">
                  {label}
                </div>
                <div className="mt-1 text-paragraph-xs text-text-sub-600">
                  {description}
                </div>
              </Label.Root>
            </div>
            <Switch.Root
              checked={!!value}
              disabled={fieldDisabled}
              id={uniqueId}
              onCheckedChange={onChange}
              {...restFieldProps}
            />
          </div>
        );
      }}
    />
  );
}
