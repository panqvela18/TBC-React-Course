interface InputProps {
  labelName: string;
  placeholder: string;
}
export default function Input({ labelName, placeholder }: InputProps) {
  return (
    <>
      <label className="text-blue-300 mb-2 text-lg font-semibold dark:text-slate-50">
        {labelName}
      </label>
      <input
        className="border outline-none p-3 text-blue-300 rounded dark:text-slate-50"
        type="text"
        required
        placeholder={placeholder}
      />
    </>
  );
}
