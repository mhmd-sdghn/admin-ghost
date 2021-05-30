import classNames from 'classnames';
import { useState } from 'react';
import Button from '../Button';

export default function Steps({ children, title, description }) {
  const [active, setActive] = useState(0);

  const activeStep = children.find((child) => child.key == active);

  const hasNextStep = activeStep.key < children.length - 1;
  const hasPrevStep = activeStep.key != 0;

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="w-full flex items-stretch" style={{ minHeight: '500px' }}>
        <div className="w-2/6 pl-12 mr-2 divide-y-2 divide-gray-200">
          <div className="w-full pb-10">
            <h4 className="font-extrabold text-lg">{title}</h4>
            <h6 className="text-sm text-gray-500  mt-2">{description}</h6>
          </div>
          <div className="w-full pt-10">
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
        <div className="w-4/6 relative">
          <div>{activeStep}</div>
          <div className="w-full flex justify-between absolute bottom-0">
            <Button
              type="default"
              disabled={!hasPrevStep}
              className="w-28"
              onClick={() => setActive(active - 1)}
            >
              قبلی
            </Button>

            <Button
              disabled={!hasNextStep}
              className="w-28"
              onClick={() => setActive(active + 1)}
            >
              بعدی
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
