type Props = React.ComponentProps<"select"> & {
  legend?: string;
  error?: string;
};

export function Select({ legend, children, error, ...rest }: Props) {
  return (
    <fieldset className="flex flex-1  text-gray-200 focus-within:text-green-100 flex-col">
      {legend && (
        <legend className="uppercase  text-xxs mb-2 text-inherit">
          {legend}
        </legend>
      )}

      <select
        className={`w-full h-12 rounded-lg border border-gray-300 px-4 text-sm  bg-transparent outline-none focus:border-2 focus:border-green-100 placeholder-gray-300 ${rest.value === "" ? "text-gray-200" : "text-gray-100"}`}
        {...rest}
      >
        <option value="" disabled hidden>
          Selecione
        </option>
        {children}
      </select>
      <span className="text-red-500 text-xs min-h-4.5 block ">{error}</span>
    </fieldset>
  );
}
