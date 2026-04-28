type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean;
};

export function Button({
  children,
  isLoading,
  type = "button",
  ...rest
}: Props) {
  return (
    <button
      type={type}
      disabled={isLoading}
      className="flex justify-center items-center bg-green-100 px-5 py-3.75 h-12 rounded-lg text-white text-sm font-bold cursor-pointer hover:bg-green-200 transition ease-linear disabled:opacity-50 disabled:cursor-progress"
      {...rest}
    >
      {isLoading ? "Carregando..." : children}
    </button>
  );
}
