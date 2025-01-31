interface Props {
  name: string;
  placeholder?: string;
  id: string;
  rows: number;
  value?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({ name, placeholder, id, rows, onChange, required = false, value }: Props) {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-primary">{name}</label>
      <textarea
        className="bg-gray-50 resize-none outline-none border placeholder-primary border-gray-400 text-primary text-sm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1"
        onChange={onChange}
        rows={rows} id={id}
        placeholder={placeholder}
        required={required}
        value={value}
      />
    </div>
  )
}
