export default function Point({ name }: { name: string }) {
  return (
    <div className="flex items-center">
      <div className='size-2 rounded-sm border-[1.5px] border-whiting' />
      <span className="text-sm font-medium text-secondary ml-2">{name}</span>
    </div>
  )
}
