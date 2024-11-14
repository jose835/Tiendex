import { Down, Up } from "../icons/icons";
import Steps from "../components/Steps";
import { StepsProps } from "../types/types";

interface Props {
  title: string;
  steps: StepsProps[];
  activeStep: number;
  setActiveStep: (index: number) => void;
  isOpen: boolean;
  toggleOpen: () => void;
}

const StepsSection: React.FC<Props> = ({ title, steps, activeStep, setActiveStep, isOpen, toggleOpen }) => {
  const isLastOne = steps.length === 1;

  return (
    <section className={`w-full rounded-lg bg-white ${isOpen && 'my-2'}`}>
      <button
        onClick={toggleOpen}
        className={`hover:bg-whiting/20 ${!isOpen && isLastOne && 'rounded-b-lg'} w-full cursor-pointer flex items-center justify-between px-3 border-y-[0.2px] border-whiting/20 py-4 ${isOpen && 'mb-5'} bg-[#f1f1f1]`}
      >
        <h5 className="font-semibold text-sm text-primary">{title}</h5>
        {isOpen ? <Up /> : <Down />}
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
      >
        {steps.map(({ title, description, buttonName, buttonSecondary, imageUrl }, key) => (
          <Steps
            key={key}
            title={title}
            description={description}
            buttonName={buttonName}
            buttonSecondary={buttonSecondary}
            active={key === activeStep}
            imageUrl={imageUrl}
            onClick={() => setActiveStep(key)}
          />
        ))}
      </div>
    </section>
  );
};

export default StepsSection;
