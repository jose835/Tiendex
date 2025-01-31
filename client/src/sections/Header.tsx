import Button from "../components/forms/Button";
import { COLORS } from "../constants/constants";
import { MessageAlert, Search } from "../icons/icons";

interface HeaderProps {
  text?: string;
  save?: boolean;
  onClick?: () => void;
  onClickSecondary?: () => void;
}


export default function Header({ onClick, onClickSecondary, text, save }: HeaderProps) {
  const name = 'Mi Tienda';
  const imageURL = `https://ui-avatars.com/api/?name=${name}&background=${COLORS.redprimary.substring(1)}&color=fff&bold=true&&length=2`;

  return (
    <header className='[grid-area:header] flex justify-between items-center bg-primary py-2.5 px-6'>
      <h1 className="text-xl text-white font-bold">Tiendex</h1>

      <div
        role="button"
        className="h-full bg-secondary text-[#ebebeb90] lg:w-[40%] w-[70%] rounded-xl flex items-center justify-between md:px-4 px-1 border-[0.5px] border-whiting cursor-pointer relative" // Añade "relative"
      >
        {!save ? (
          <div className="flex items-center space-x-2">
            <div className="flex items-center w-full">
              <Search />
            </div>
            <span className="text-sm font-semibold text-graying">Buscar...</span>
          </div>
        ) : (
          <>
            <div className="items-center md:flex hidden">
              <MessageAlert className="size-4 text-whiting2" />
              <h2 className="text-sm text-whiting2/80 font-medium ml-2">{text}</h2>
            </div>

            <div className="flex items-center md:w-auto w-full">
              <Button
                type="button"
                onClick={onClickSecondary}
                name="Descartar"
                style="none"
                className="bg-[#404040] w-full text-white border-0"
              />
              <Button
                type="button"
                style="none"
                name="Guardar"
                className="bg-white text-primary w-full ml-2"
                onClick={onClick}
              />
            </div>
          </>
        )}
      </div>

      <div className="flex items-center">
        <button className="flex rounded-full ml-4 justify-between items-center lg:px-2 lg:py-1 bg-secondary">
          <img src={imageURL} alt="Profile" className="w-8 h-8 rounded-full" />
          <h3 className="font-bold lg:block hidden text-sm text-white ml-3">{name}</h3>
        </button>
      </div>
    </header>
  );
}
