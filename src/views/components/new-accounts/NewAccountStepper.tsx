import { useEffect, useState } from 'react';
import UserThemeOptions from 'src/layouts/UserThemeOptions';


interface StepperProps {
  changeStep?: number;
  onStepChange?: (step: number) => void;
}



// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NewAccountStepper = ({ changeStep = 1, onStepChange }: StepperProps) => {

  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const inter = userThemeConfig.typography?.fontFamilyInter
  const [activeStep, setActiveStep] = useState(1)

  const handleStepClick = (step: number) => {
    setActiveStep(step);

    if (onStepChange) {
      onStepChange(step);
    }
  };

  useEffect(() => {
    setActiveStep(changeStep)
  }, [changeStep]);

  return (
    <>
      <div className='new-account-stepper' style={{ fontFamily: inter }} >
        <div className='steps'>
          <div
            className={activeStep == 1 ? "step active" : "step"}
            onClick={() => handleStepClick(1)}
          >
            <div className="step-number">1</div>
            <div className="step-name">Information</div>
          </div>
          <div
            className={activeStep == 2 ? "step active" : "step"}
            onClick={() => handleStepClick(2)}
          >
            <div className="step-number">2</div>
            <div className="step-name">Security</div>
          </div>
          <div
            className={activeStep == 3 ? "step active" : "step"}
            onClick={() => handleStepClick(3)}
          >
            <div className="step-number">3</div>
            <div className="step-name">Payment warranty</div>
          </div>
          <div
            className={activeStep == 4 ? "step active" : "step"}
            onClick={() => handleStepClick(4)}
          >
            <div className="step-number">4</div>
            <div className="step-name">Sublimits</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewAccountStepper

