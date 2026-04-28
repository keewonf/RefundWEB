type Props = React.ComponentProps<"input"> & {
  legend?: string;
};

export function Input({ legend, type = "text", ...rest }: Props) {
  return (
    <fieldset className="flex flex-1 max-h-20 text-gray-200 focus-within:text-green-100">
      {legend && (
        <legend className="uppercase  text-xxs mb-2 text-inherit">
          {legend}
        </legend>
      )}

      <input
        type={type}
        className="border border-gray-300 rounded-lg px-4 py-3.75 w-full h-12 text-sm text-gray-100 bg-transparent outline-none focus:border-2 focus:border-green-100 placeholder-gray-300"
        {...rest}
      />
    </fieldset>
  );
}
