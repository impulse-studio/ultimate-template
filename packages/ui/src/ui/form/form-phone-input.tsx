"use client";

import { useId } from "react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { PhoneNumberInput } from "../phone-number-input";
import { FormField } from "./form-field";

interface FormPhoneInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  label?: string;
  required?: boolean;
  description?: string;
  tooltip?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: "medium" | "small" | "xsmall";
  onFieldBlur?: (value: string) => void;
  autoFocus?: boolean;
}

export function FormPhoneInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  required,
  description,
  tooltip,
  placeholder,
  disabled,
  size,
  onFieldBlur,
  autoFocus,
  ...controllerProps
}: FormPhoneInputProps<TFieldValues, TName>) {
  const uniqueId = useId();

  return (
    <Controller
      control={control}
      name={name}
      {...controllerProps}
      render={({ field, fieldState }) => (
        <FormField
          description={description}
          error={fieldState.error}
          label={label}
          name={uniqueId}
          required={required}
          tooltip={tooltip}
        >
          <PhoneNumberInput
            autoFocus={autoFocus}
            disabled={disabled}
            hasError={!!fieldState.error}
            inputId={uniqueId}
            onBlur={() => {
              field.onBlur();
              if (onFieldBlur) {
                onFieldBlur(field.value || "");
              }
            }}
            onChange={(value) => field.onChange(value || "")}
            placeholder={placeholder}
            ref={field.ref}
            size={size}
            value={field.value}
          />
        </FormField>
      )}
    />
  );
}
