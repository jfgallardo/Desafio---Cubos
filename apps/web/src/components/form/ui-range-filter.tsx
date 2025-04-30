import UIInput from "./ui-input";

type UIRangeFilterProps = {
  minValue?: number;
  maxValue?: number;
  onFilter?: (min?: number, max?: number) => void;
};

export default function UIRangeFilter({
  minValue,
  maxValue,
  onFilter,
}: UIRangeFilterProps) {
  return (
    <div className="flex gap-4 items-end w-full">
      <UIInput
        label="Duración mínima"
        type="number"
        placeholder="Ej: 60"
        defaultValue={minValue}
        onChange={(value) => {
          onFilter?.(Number(value), maxValue);
        }}
      />
      <UIInput
        label="Duración máxima"
        type="number"
        placeholder="Ej: 180"
        defaultValue={maxValue}
        onChange={(value) => {
          onFilter?.(minValue, Number(value));
        }}
      />
    </div>
  );
}
