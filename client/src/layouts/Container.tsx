import { Toaster } from 'react-hot-toast';
import Aside from '../sections/Aside'
import Header from '../sections/Header'
import { useState } from 'react';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <div id='app' className='flex flex-col h-screen overflow-hidden'>
      <Toaster />
      <Header text={text} save={save} onClickSecondary={onClickSecondary} onClick={onSaveClick} />
      <Aside isSidebarOpen={isSidebarOpen} />
      <main className='bg-[#f1f1f1] md:px-5 overflow-auto' style={{ scrollbarWidth: 'thin' }}>
        <div className='pb-10 pt-5'>
          {children}
        </div>
      </main>
    </div>
  )
}
