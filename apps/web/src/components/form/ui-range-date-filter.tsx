import UIInput from "./ui-input";

type UIRangeFilterProps = {
  minValue?: Date;
  maxValue?: Date;
  onFilter?: (min?: Date, max?: Date) => void;
};

export default function UIRangeDateFilter({
  minValue,
  maxValue,
  onFilter,
}: UIRangeFilterProps) {
  return (
    <div className="flex gap-4 items-end w-full">
      <UIInput
        label="Data de lançamento mínima"
        type="date"
        defaultValue={minValue}
        onChange={(event) => {
          const newMinDate = event ? new Date(event) : undefined;
          onFilter?.(newMinDate, maxValue);
        }}
      />
      <UIInput
        label="Data de lançamento máxima"
        type="date"
        defaultValue={maxValue}
        onChange={(event) => {
          const newMaxDate = event ? new Date(event) : undefined;
          onFilter?.(minValue, newMaxDate);
        }}
      />
    </div>
  );
}
