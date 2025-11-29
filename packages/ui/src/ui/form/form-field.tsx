"use client";

import type { ReactNode } from "react";

import type { FieldError, FieldPath, FieldValues } from "react-hook-form";
import { cn } from "@/utils/cn";
import { InfoCircleFilled } from "../icons";
import * as Label from "../label";
import * as Tooltip from "../tooltip";
import { FormMessage } from "./form-message";

interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  label?: string;
  required?: boolean;
  description?: string;
  tooltip?: string;
  children: ReactNode;
  error?: FieldError;
  containerClassName?: string;
}

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  required,
  description,
  tooltip,
  children,
  error,
  containerClassName,
}: FormFieldProps<TFieldValues, TName>) {
  return (
    <div className={cn("flex flex-col gap-1", containerClassName)}>
      {label && (
        <div className="flex items-center gap-1.5">
          <Label.Root htmlFor={name}>
            {label} {required && <Label.Asterisk />}
            {description && <Label.Sub>{description}</Label.Sub>}
          </Label.Root>
          {tooltip && (
            <Tooltip.Root>
              <Tooltip.Trigger
                aria-label={`More information about ${label}`}
                type="button"
              >
                <InfoCircleFilled className="size-5 text-text-disabled-300" />
              </Tooltip.Trigger>
              <Tooltip.Content side="top" size="xsmall">
                {tooltip}
              </Tooltip.Content>
            </Tooltip.Root>
          )}
        </div>
      )}
      {children}
      {error && <FormMessage>{error?.message?.toString()}</FormMessage>}
    </div>
  );
}
