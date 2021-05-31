import classNames from 'classnames';
import { InfoSquare } from 'react-iconly';
import { animated, useTransition } from 'react-spring';
import { useState, useEffect } from 'react';
import Button from '../Button';
import Modal from '../Modal';

export default function Steps({
  children,
  title,
  description,
  lockStep,
  lockMessage,
}) {
  const [active, setActive] = useState(0);
  const [activeStep, setActiveStep] = useState();

  useEffect(() => {
    setActiveStep(children.find((child) => child.key == active));
  }, [active]);

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const hasNextStep = active < children.length - 1;
  const hasPrevStep = active != 0;

  const handleClick = (status) => {
    if (lockStep) {
      setIsAlertOpen(true);
    } else if (status === 'back') setActive(active - 1);
    else setActive(active + 1);
  };

  const transitions = useTransition(activeStep, {
    from: { opacity: 0, y: -200 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 200, position: 'absolute', width: '100%' },
  });

  const Alert = (
    <Modal
      isOpen={isAlertOpen}
      onSubmit={() => setIsAlertOpen(false)}
      icon={<InfoSquare set="curved" primaryColor="#374151" size={48} />}
    >
      <span>{lockMessage}</span>
    </Modal>
  );

  return (
    <div className="flex w-full h-screen items-center justify-center">
      {Alert}
      <div className="w-full flex items-stretch">
        <div className="w-2/6 pl-12 mr-2  flex flex-col justify-between">
          <div className="divide-y-2  divide-gray-200">
            <div className="w-full pb-5">
              <h4 className="font-extrabold text-lg">{title}</h4>
              <h6 className="text-sm text-gray-500  mt-2">{description}</h6>
            </div>
            <div className="w-full pt-5">
              {children.map(({ props, key }, index) => (
                <div
                  key={key}
                  className={classNames({
                    'p-4': true,
                    'border-r-2': index > active,
                    'border-r-4': index <= active,
                    'border-yellow-300': index === active,
                    'opacity-70': index < active,
                    'opacity-50': index > active,
                    'transition-all': true,
                  })}
                >
                  <button
                    className="focus:outline-none"
                    onClick={() => setActive(index)}
                    disabled={lockStep}
                  >
                    <h4
                      className={classNames({
                        'font-bold': index === active,
                      })}
                    >
                      {props.title}
                    </h4>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex">
            <Button
              type="default"
              disabled={!hasPrevStep}
              className="w-1/2 ml-1"
              onClick={() => handleClick('back')}
            >
              قبلی
            </Button>

            <Button
              disabled={!hasNextStep}
              className="w-1/2 mr-1"
              onClick={() => handleClick('forward')}
            >
              بعدی
            </Button>
          </div>
        </div>
        <div className="w-4/6 relative">
          <div>
            {transitions((style, item, t, index) => (
              <animated.div style={style}>{item}</animated.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
