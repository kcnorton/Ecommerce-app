import React from 'react';
import { StepProps } from '../views/CheckoutView';

const MultiStepForm = ({ steps }: MultiStepFormProps) => {
    const [step, setStep] = React.useState(1);
    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const StepElement = steps[step - 1];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('form submitted');
    };

    return (
        <form onSubmit={handleSubmit}>
            <StepElement next={nextStep} prev={prevStep} />
        </form>
    );
};

type MultiStepFormProps = {
    steps: (({ next, prev }: StepProps) => JSX.Element)[];
};

export default MultiStepForm;
