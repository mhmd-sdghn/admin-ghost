import { useTransition, animated, useSpringRef } from 'react-spring';
import { cloneElement } from 'react';

export default function Step({ children, className }) {
  const items = Array.isArray(children)
    ? children.map((child, index) => ({
        x: 0,
        y: -100,
        delay: index * 100,
        key: Date.now() + index,
        className: child.props?.className,
        html: child?.props?.children || child,
      }))
    : {
        x: 0,
        y: -100,
        delay: 0,
        key: Date.now(),
        className: children.props?.className,
        html: children?.props?.children || children,
      };

  const transitions = useTransition(items, {
    from: { y: -100, opacity: 0 },
    enter: (item) => async (next) => {
      await next({ y: 0, opacity: 1, delay: item.delay });
    },
  });

  return (
    <div className={`w-full h-full ${className || ''}`} name="step">
      {transitions((style, item, t, index) => (
        <animated.div
          className={item.className}
          key={item.key}
          style={style}
          index={index || 0}
        >
          {item.html}
        </animated.div>
      ))}
    </div>
  );
}
