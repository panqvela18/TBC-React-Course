interface InputProps {
  labelName: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}
export default function Input({
  labelName,
  placeholder,
  value,
  onChange,
  name,
}: InputProps) {
  return (
    <>
      <label className="text-blue-300 mb-2 text-lg font-semibold dark:text-slate-50">
        {labelName}
      </label>
      <input
        className="border outline-none p-3 text-blue-300 rounded dark:text-slate-50"
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
      />
    </>
  );
}
