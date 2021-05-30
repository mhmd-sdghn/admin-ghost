import classNames from 'classnames';
import { useState } from 'react';
import { animated, useTransition } from 'react-spring';
import Button from '../Button';

export default function Steps({ children, titles, title, description }) {
  const [active, setActive] = useState(0);

  const activeStep = children.find((child) => child.key == active);

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div
        className=" w-full flex items-start justify-start"
        style={{ minHeight: '500px' }}
      >
        <div className="w-2/6 pl-12 mr-2 divide-y-2 divide-gray-200">
          <div className="w-full pb-10">
            <h4 className="font-extrabold text-lg">{title}</h4>
            <h6 className="text-sm text-gray-500  mt-2">{description}</h6>
          </div>
          <div className="w-full pt-10">
            {titles.map((title, index) => (
              <div
                key={title}
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
                    {title}
                  </h4>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className=" w-4/6">
          <div>{activeStep}</div>
          <div className="mt-5 flex">
            <Button type="default" disabled>
              قبلی
            </Button>
            <Button>بعدی</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
