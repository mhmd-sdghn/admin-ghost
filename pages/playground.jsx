import {
  useSpring,
  useSpringRef,
  useChain,
  animated,
  useTransition,
  config,
} from 'react-spring';
import { useState } from 'react';
import Head from '../components/generals/Head';

export default function PlayGround() {
  const [itemsCount, setItemsCount] = useState([]);

  const items = [
    <div
      key="0"
      className="flex items-center justify-center w-16 h-16 bg-green-400 text-white rounded-md mx-2"
    >
      1
    </div>,
    <div
      key="1"
      className="flex items-center justify-center w-16 h-16 bg-green-400 text-white rounded-md mx-2"
    >
      2
    </div>,
  ];

  const onClick = () => {
    setItemsCount((itemsCount) =>
      itemsCount.length
        ? []
        : [
            {
              y: 0,
              delay: 0,
            },
            {
              y: 0,
              delay: 10,
            },
            {
              y: 0,
              delay: 20,
              reverse: true,
            },
          ]
    );
  };

  const transitions = useTransition(itemsCount, {
    from: { y: -100, opacity: 0, scale: 1 },
    enter: (item) => async (next) => {
      await next({ y: item.y, opacity: 1, delay: item.delay });
      await next({ y: item.y, scale: 1.3, delay: item.delay });
    },
    leave: (item) => async (next) => {
      await next({
        y: item.y,
        scale: 1,
        delay: item.delay,
        reverse: item.reverse,
      });
      await next({
        y: 100,
        opacity: 0,
        delay: item.delay,
        reverse: item.reverse,
      });
    },
    // onRest: () => setStep(step => step ? 0 : 1)
  });

  return (
    <div>
      <Head title="زمین بازی" />
      <button
        className="mt-5 p-4 text-5xl bg-blue-400 rounded-md absolute"
        onClick={onClick}
      >
        Change
      </button>
      <div className="h-screen w-screen flex justify-center items-center ">
        {transitions((style, item, t, index) =>
          itemsCount ? (
            <animated.div
              style={style}
              className="flex items-center justify-center w-16 h-16 bg-green-400 text-white rounded-md mx-2"
            >
              {index + 1}
            </animated.div>
          ) : (
            ''
          )
        )}
      </div>
    </div>
  );
}
