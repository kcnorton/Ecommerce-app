import MultiStepForm from '../components/MultiStepForm';

export type StepProps = {
    next?: () => void;
    prev?: () => void;
};

const Step1 = ({ next }: StepProps) => (
    <div>
        <h2>Step 1</h2>
        <button onClick={next}>Next</button>
    </div>
);

const Step2 = ({ next, prev }: StepProps) => (
    <div>
        <h2>Step 2</h2>
        <button onClick={next}>Next</button>
        <button onClick={prev}>Previous</button>
    </div>
);

const Step3 = ({ prev }: StepProps) => (
    <div>
        <h2>Step 3</h2>
        <button onClick={prev}>Previous</button>
        <button type="submit">Submit</button>
    </div>
);

const CheckoutView = () => {
    const steps = [Step1, Step2, Step3];
    return (
        <>
            <MultiStepForm steps={steps} />
        </>
    );
};

export default CheckoutView;
