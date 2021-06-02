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
  className,
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
      <span className="text-justify">{lockMessage}</span>
    </Modal>
  );

  return (
    <div
      className={`w-full h-full relative flex  justify-center lg:items-center ${
        className || ''
      }`}
    >
      {Alert}
      <div
        className="w-full flex flex-col lg:flex-row items-start"
        style={{ minHeight: '400px' }}
      >
        <div className="w-full  lg:h-full lg:w-2/6  flex flex-col px-5 pt-5 lg:pt-0">
          <div className="pb-2">
            <h3 className="font-bold text-xl">{title}</h3>
            <h5 className="text-xs text-gray-500 mt-4">{description}</h5>
          </div>
          <div className="relative w-full pt-3">
            <div className=" w-full  flex lg:flex-col overflow-x-auto pb-3 lg:pb-0">
              <div className="absolute top-0 -right-1 bg-gradient-to-l from-gray-50 to-transparent h-full w-5 " />
              {children.map(({ props, key }, index) => (
                <div
                  key={key}
                  className={classNames({
                    'py-5': true,
                    'pl-3': key == 0,
                    'pr-3': key == children.length - 1,
                    'px-4': key != 0 && key != children.length - 1,
                    'lg:px-4': true,
                    'border-t-2': true,
                    'lg:border-r-2': true,
                    'lg:border-t-0': true,
                    'border-yellow-300': parseInt(key) <= active,
                    'animate-pulse': key == active,
                    'opacity-60': key != active,
                  })}
                >
                  <button
                    className="focus:outline-none "
                    onClick={() => setActive(index)}
                    disabled={lockStep}
                  >
                    <h4
                      className={classNames({
                        'font-bold': index === active,
                        'w-max': true,
                      })}
                    >
                      {props.title}
                    </h4>
                  </button>
                </div>
              ))}
              <div className="absolute top-0 -left-1 bg-gradient-to-r from-gray-50 to-transparent h-full w-5 " />
            </div>
            <div className="flex  py-3  mt-5 justify-center items-center bg-gradient-to-t  from-green-50">
              <Button
                type="default"
                className="w-1/2 mx-1"
                onClick={() => handleClick('back')}
                disabled={!hasPrevStep}
              >
                قبلی
              </Button>
              <Button
                className="w-1/2 mx-1"
                onClick={() => handleClick('forward')}
                disabled={!hasNextStep}
              >
                بعدی
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full lg:h-full  lg:w-4/6 relative px-5 pb-5 lg:pb-0">
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
