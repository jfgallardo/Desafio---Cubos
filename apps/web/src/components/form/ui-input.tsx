import { FieldPath, FieldValues, UseFormRegister } from "react-hook-form";
import { ReactNode } from "react";

type InputProps<T extends FieldValues> = {
  label?: string;
  register?: UseFormRegister<T>;
  onChange?: (value: string | number) => void;
  required?: boolean;
  value?: FieldPath<T>;
  placeholder?: string;
  type?: string;
  icon?: ReactNode;
  onKey?: () => void;
  defaultValue?: string | number | string[] | any;
};

export default function UIInput<T extends FieldValues>({
  label,
  register,
  required,
  value,
  placeholder,
  type = "text",
  icon,
  onKey,
  defaultValue,
  onChange,
}: InputProps<T>) {
  const isNumber = type === "number";
  const registerProps =
    value && register
      ? register(value, {
          required,
          setValueAs: isNumber
            ? (v) => (v === "" ? undefined : Number(v))
            : undefined,
        })
      : {};

  return (
    <div className="flex flex-col gap-3 w-full">
      {label && (
        <label className="font-bold text-ui-mauve-dark-100 dark:text-ui-mauve-dark-1200 leading-[100%] tracking-[0px]">
          {label} {required && "*"}
        </label>
      )}

      <div className="relative w-full">
        <input
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={(e) => {
            let value: string | number = e.target.value;
            if (isNumber) {
              value = value === "" ? "" : Number(value);
            }
            if (onChange) onChange(value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (onKey) onKey();
            }
          }}
          className="block w-full min-w-0 grow py-2 pr-10 pl-2 text-base font-normal text-ui-mauve-1000 dark:text-ui-mauve-dark-1200 rounded-md sm:text-sm/6 border border-ui-mauve-dark-600 focus:outline-none focus:border-ui-purple-dark-900 dark:bg-ui-mauve-dark-200 caret-purple-500"
          {...registerProps}
        />
        {icon && (
          <div className="absolute inset-y-0 right-4 flex items-center text-ui-mauve-100 dark:text-ui-mauve-dark-1100">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
