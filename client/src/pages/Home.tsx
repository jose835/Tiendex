import { useState } from 'react';
import Container from "../layouts/Container";
import StepsSection from "../components/StepsSection";
import { sections } from '../data/steps';
import '../Home.css';

export default function Home() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [openSection, setOpenSection] = useState<number | null>(0);

  return (
    <Container>
      <section className="flex flex-col items-center p-6 h-full">
        <div className="max-w-screen-md w-full mx-auto">
          <h2 className="font-bold text-xl text-primary">Empecemos con tus primeros pasos para vender</h2>
          <p className="text-sm text-graying font-medium mt-2">
            Aquí tienes una guía para comenzar. A medida que tu negocio crezca, encontrarás nuevos consejos aquí.
          </p>

          <div className="mt-5 bg-white rounded-lg shadow-md border-[0.2px] border-whiting/30">
            <div className="m-3">
              <h3 className="text-base text-secondary font-semibold">Comencemos</h3>
              <p className="text-sm text-secondary font-medium mt-1">Utilice esta guía personalizada para poner en funcionamiento su tienda.</p>
            </div>

            <div className="px-2 m-3 mb-5 py-1 mt-1 rounded-lg border-[0.2px] border-whiting/30 inline-block">
              <h4 className="text-sm font-medium text-secondary">
                <span>0</span> / 7 completados
              </h4>
            </div>

            {sections.map((section, index) => (
              <StepsSection
                key={index}
                title={section.title}
                steps={section.steps}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                isOpen={openSection === index}
                toggleOpen={() => setOpenSection(openSection === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}
