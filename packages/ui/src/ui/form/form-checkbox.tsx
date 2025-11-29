"use client";

import { useId } from "react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { cn } from "@/utils/cn";
import * as Checkbox from "../checkbox";
import * as Label from "../label";
import { FormMessage } from "./form-message";

interface FormCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  onFieldChange?: (value: boolean) => void;
}

export function FormCheckbox<
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
  onFieldChange,
  ...controllerProps
}: FormCheckboxProps<TFieldValues, TName>) {
  const uniqueId = useId();

  return (
    <Controller
      control={control}
      name={name}
      {...controllerProps}
      render={({ field, fieldState }) => {
        const {
          onChange,
          value,
          disabled: fieldDisabled,
          onBlur,
          ...restFieldProps
        } = field;

        const handleChange = (checked: boolean) => {
          onChange(checked);
          if (onFieldChange) {
            onFieldChange(checked);
          }
        };

        return (
          <div className="flex flex-col gap-1">
            <div className={cn("flex items-start gap-2", className)}>
              <Checkbox.Root
                checked={!!value}
                disabled={disabled || fieldDisabled}
                id={uniqueId}
                onBlur={() => {
                  if (typeof onBlur === "function") {
                    onBlur();
                  }
                }}
                onCheckedChange={handleChange}
                {...restFieldProps}
              />
              {label && (
                <Label.Root
                  className={cn("cursor-pointer", labelClassName)}
                  disabled={disabled || fieldDisabled}
                  htmlFor={uniqueId}
                >
                  {label}
                  {description && (
                    <Label.Sub className="ml-1">{description}</Label.Sub>
                  )}
                </Label.Root>
              )}
            </div>
            <FormMessage>{fieldState.error?.message}</FormMessage>
          </div>
        );
      }}
    />
  );
}
