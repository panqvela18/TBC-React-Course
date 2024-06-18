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
      <label className="text-[#11545c] mb-2 text-lg font-semibold dark:text-slate-50">
        {labelName}
      </label>
      <input
        className="border outline-none p-3 text-[#11545c] rounded dark:bg-slate-900"
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
