interface Props {
  name: string;
  placeholder?: string;
  id: string;
  className?: string;
  readonly?: boolean;
  height?: string;
}

export default function FieldInputNumber({ name, placeholder = '', id, className, readonly = false, height = '10' }: Props) {
  return (
    <div className={`${className}`}>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-primary">{name}</label>
      <input
        type="number"
        min={0}
        defaultValue={0}
        id={id}
        className={`bg-gray-50 outline-none border placeholder-primary border-gray-600 text-primary text-sm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1 h-${height}`}
        placeholder={placeholder}
        required
        readOnly={readonly}
      />
    </div>
  );
}