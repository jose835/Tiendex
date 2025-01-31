import { useEffect, useRef, useState } from "react";
import { Close } from '../icons/icons';
import Button from '../components/forms/Button';

interface Props {
  onClose: () => void;
  onClickSave?: () => void;
  name: string;
  children: React.ReactNode;
  classNameModal?: string;
}

export default function Modal({ onClose, name, onClickSave, children, classNameModal }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(true);

  const mainRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (mainRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = mainRef.current;
      setIsScrolled(scrollTop > 0);
      setIsScrolledToEnd(scrollTop + clientHeight >= scrollHeight);
    }
  };

  useEffect(() => {
    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (mainElement) {
        mainElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  return (
    <div
      tabIndex={-1}
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative h-full bg-white rounded-2xl shadow">
          <header
            className={`flex ${isScrolled && 'shadow-md'} bg-whiting2 items-center justify-between px-4 py-2 border-b border-gray-300 rounded-t-2xl`}
          >
            <h3 className="text-[15px] font-semibold text-gray-900">{name}</h3>
            <button
              onClick={onClose}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide="default-modal"
            >
              <Close className="size-5" />
            </button>
          </header>
          <main
            ref={mainRef}
            className={`overflow-y-auto ${classNameModal}`}
            style={{ scrollbarWidth: 'thin' }}
          >
            {children}
          </main>
          <footer
            style={{
              boxShadow: !isScrolledToEnd
                ? '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)'
                : 'none'
            }}
            className={`flex space-x-3 items-center justify-end px-4 py-3 border-t border-gray-300 rounded-b-2xl`}
          >
            <Button name="Cancelar" onClick={onClose} className="border border-gray-300 text-primary" />
            <Button
              onClick={onClickSave}
              name="Listo"

              className="bg-primary px-5 text-white"
            />
          </footer>
        </div>
      </div>
    </div>
  )
}
