import { ChangeEvent, useEffect, useState } from "react";
import { FieldPath, FieldValues, UseFormRegister } from "react-hook-form";

type TextAreaProps<T extends FieldValues> = {
  label?: string;
  register: UseFormRegister<T>;
  required?: boolean;
  value: FieldPath<T>;
  rows?: number;
};

export default function UITagInput<T extends FieldValues>({
  label,
  register,
  required,
  value,
  rows = 2,
}: TextAreaProps<T>) {
  const [tags, setTags] = useState<string[]>([]);

  const handlerOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const tags = e.target.value.split(",");
    setTags(tags);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {label && (
        <label className="font-bold text-ui-mauve-dark-100 dark:text-ui-mauve-dark-1200 leading-[100%] tracking-[0px]">
          {label} {required && "*"}
        </label>
      )}

      <div className="relative w-full">
        <textarea
          rows={rows}
          className="block w-full min-w-0 grow py-2 pr-10 pl-2 text-base font-normal dark:text-ui-mauve-dark-1200 rounded-md sm:text-sm/6 border border-ui-mauve-dark-600 focus:outline-none focus:border-ui-purple-dark-900 dark:bg-ui-mauve-dark-200"
          {...register(value, { required })}
          onBlur={handlerOnChange}
        />
        <div className="flex flex-row gap-2 items-center">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="bg-ui-mauve-dark-600 text-white px-2 py-1 rounded-md"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
