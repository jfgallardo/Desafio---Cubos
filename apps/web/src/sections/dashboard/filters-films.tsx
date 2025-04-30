import { MovieFilters } from "@/actions/types/movies";
import UIInput from "@/components/form/ui-input";
import UIRangeDateFilter from "@/components/form/ui-range-date-filter";
import UIRangeFilter from "@/components/form/ui-range-filter";

type Props = {
  filters: MovieFilters;
  setFilters: (filters: MovieFilters) => void;
};

export default function FiltersFilms({ filters, setFilters }: Props) {
  return (
    <div>
      <div className="flex gap-4">
        <UIInput
          label="Director"
          defaultValue={filters.director}
          onChange={(e) =>
            setFilters({
              ...filters,
              director: e as string,
            })
          }
        />

        <UIInput
          label="Pais de origem"
          defaultValue={filters.countryOfOrigin}
          onChange={(e) =>
            setFilters({
              ...filters,
              countryOfOrigin: e as string,
            })
          }
        />
      </div>

      <div className="flex gap-4 mt-4">
        <div className="w-full">
          <UIInput
            label="Actores Principales"
            defaultValue={filters.cast}
            onChange={(e) =>
              setFilters({
                ...filters,
                cast: (e as string).split(","),
              })
            }
          />
          <span className="text-xs text-gray-500 dark:text-gray-400 float-right mt-1 mr-2">
            (separados por vírgula)
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4 w-full items-end">
        <UIRangeFilter
          minValue={filters.runtimeMinutesRange?.min}
          maxValue={filters.runtimeMinutesRange?.max}
          onFilter={(min, max) =>
            setFilters({
              ...filters,
              runtimeMinutesRange: { min: min ?? 0, max: max ?? 1000 },
            })
          }
        />
        <span className="text-xs text-gray-500 dark:text-gray-400 float-right mt-1 mr-2">
          (mínimo e máximo em minutos)
        </span>
      </div>

      <div className="flex  gap-4 mt-4 w-full">
        <UIRangeDateFilter
          minValue={filters.releaseDateRange?.min}
          maxValue={filters.releaseDateRange?.max}
          onFilter={(min, max) =>
            setFilters({
              ...filters,
              releaseDateRange: {
                min: min ?? new Date(),
                max: max ?? new Date(),
              },
            })
          }
        />
      </div>
    </div>
  );
}
