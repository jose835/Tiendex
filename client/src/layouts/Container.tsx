import { Toaster } from 'react-hot-toast';
import Aside from '../sections/Aside'
import Header from '../sections/Header'

export default function Container({
  text,
  save = false,
  children,
  onSaveClick,
  onClickSecondary
}: {
  text?: string;
  save?: boolean;
  children?: JSX.Element;
  onSaveClick?: () => void;
  onClickSecondary?: () => void;
}) {
  return (
    <div id='app' className='flex flex-col h-screen overflow-hidden'>
      <Toaster />
      <Header text={text} save={save} onClickSecondary={onClickSecondary} onClick={onSaveClick} />
      <Aside />
      <main className='bg-[#f1f1f1] overflow-auto'>
        <div className='pb-10'>
          {children}
        </div>
      </main>
    </div>
  )
}
