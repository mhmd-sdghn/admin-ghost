import { useRef, useEffect, useState } from 'react';
import classNames from 'classnames';

export default function Tooltip({
  children,
  position,
  text,
  className,
  bgColor,
  cursorPointer,
  color,
}) {
  const childRef = useRef();
  const tooltipRef = useRef();
  const [visible, setVisible] = useState(false);
  const [placing, setPlacing] = useState({
    top: 'unset',
    right: 'unset',
  });

  // const pointer = {
  //   main: {
  //     width: 0,
  //     height: 0,
  //     margin: 'auto',
  //   },
  //   top: {
  //     borderTop: `8px solid ${bgColor || '#374151'}`,
  //     borderLeft: '4px solid transparent',
  //     borderRight: '4px solid transparent',
  //   },
  //   bottom: {
  //     borderBottom: `8px solid ${bgColor || '#374151'}`,
  //     borderLeft: '4px solid transparent',
  //     borderRight: '4px solid transparent',
  //   },
  //   right: {
  //     borderBottom: '4px solid transparent ',
  //     borderRight: `8px solid ${bgColor || '#374151'}`,
  //     borderTop: '4px solid transparent',
  //   },
  //   left: {
  //     borderBottom: '4px solid transparent ',
  //     borderLeft: `8px solid ${bgColor || '#374151'}`,
  //     borderTop: '4px solid transparent',
  //   },
  // };
  //
  // const tooltip = {
  //   main: {
  //     display: 'flex',
  //     position: 'fixed',
  //     width: 'max-content',
  //   },
  //   top: {
  //     flexDirection: 'column',
  //     top: '-100%',
  //   },
  //   bottom: {
  //     flexDirection: 'column-reverse',
  //     bottom: '-100%',
  //   },
  //   left: {
  //     flexDirection: 'row-reverse',
  //     right: '100%',
  //   },
  //   right: {
  //     flexDirection: 'row',
  //     left: '100%',
  //   },
  // };

  const onMouseHover = () => {};

  const onMouseUnHover = () => {
    // setPlacing({
    //  top: 'unset',
    //   ''
    // });
  };

  useEffect(() => {
    const rect = childRef.current.getBoundingClientRect();
    const { top, right, bottom, left, x, y, width, height } = rect;

    const tooltipWidth = tooltipRef.current.offsetWidth;
    const tooltipHeight = tooltipRef.current.offsetHeight;

    const X = right - width / 2 - tooltipWidth / 2;
    const Y = top - tooltipHeight;

    setPlacing({
      right: X,
      top: Y,
    });
  }, [childRef.current, tooltipRef.current]);

  return (
    <>
      <div
        name="tooltip"
        className="fixed flex flex-col transition-all  flex items-center justify-center"
        ref={tooltipRef}
        style={{
          top: placing.top,
          right: placing.right,
          bottom: placing.bottom,
          left: placing.left,
        }}
      >
        <div className="p-2 p-3 bg-gray-700 rounded-lg shadow-sm text-white">
          <span />
        </div>
        <div
          style={{
            width: 0,
            height: 0,
            margin: 'auto',
            borderTop: `8px solid ${bgColor || '#374151'}`,
            borderLeft: '4px solid transparent',

            borderRight: '4px solid transparent',
          }}
        />
      </div>
      <div
        name="tooltip_child"
        ref={childRef}
        onMouseOver={onMouseHover}
        onMouseLeave={onMouseUnHover}
        className="flex items-center justify-center p-1"
      >
        {children}
      </div>
    </>
  );
}
