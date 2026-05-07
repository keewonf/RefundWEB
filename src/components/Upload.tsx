import uploadSvg from "../assets/upload.svg";

type Props = React.ComponentProps<"input"> & {
  filename?: string | null;
  error?: string;
};

export function Upload({ filename = null, onChange, error, ...rest }: Props) {
  return (
    <div>
      <legend className="uppercase  text-xxs mb-2 text-gray-200">
        Comprovante
      </legend>

      <div className="w-full h-12 flex items-center rounded-lg border border-gray-300 text-sm text-gray-100 bg-transparent outline-none">
        <input
          type="file"
          className="hidden"
          id="upload"
          {...rest}
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            onChange?.(file as any);
          }}
        />

        <span className="text-sm text-gray-200 flex-1 pl-4">
          {filename ?? "Nome do arquivo.pdf"}
        </span>

        <label
          className="h-12 py-[15.75] px-3 bg-green-100 flex w-12 items-center rounded-lg cursor-pointer disabled:opacity-50 hover:bg-green-200 transition ease-linear"
          htmlFor="upload"
        >
          <img src={uploadSvg} alt="Ícone de upload" className="w-6 h-6" />
        </label>
        {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
      </div>
    </div>
  );
}
