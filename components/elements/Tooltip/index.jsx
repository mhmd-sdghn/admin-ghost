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
    bottom: 'unset',
    left: 'unset',
  });

  const pointer = {
    main: {
      width: 0,
      height: 0,
      margin: 'auto',
    },
    top: {
      borderTop: `8px solid ${bgColor || '#374151'}`,
      borderLeft: '4px solid transparent',
      borderRight: '4px solid transparent',
    },
    bottom: {
      borderBottom: `8px solid ${bgColor || '#374151'}`,
      borderLeft: '4px solid transparent',
      borderRight: '4px solid transparent',
    },
    right: {
      borderBottom: '4px solid transparent ',
      borderRight: `8px solid ${bgColor || '#374151'}`,
      borderTop: '4px solid transparent',
    },
    left: {
      borderBottom: '4px solid transparent ',
      borderLeft: `8px solid ${bgColor || '#374151'}`,
      borderTop: '4px solid transparent',
    },
  };
  const tooltip = {
    main: {
      display: 'flex',
      position: 'fixed',
      width: 'max-content',
      top: placing.top,
      right: placing.right,
      bottom: placing.bottom,
      left: placing.left,
    },
    top: {
      flexDirection: 'column',
    },
    bottom: {
      flexDirection: 'column-reverse',
    },
    left: {
      flexDirection: 'row',
    },
    right: {
      flexDirection: 'row-reverse',
    },
  };

  const pointerStyle = { ...pointer.main, ...pointer[position] };
  const tooltipStyle = { ...tooltip.main, ...tooltip[position] };

  const onMouseHover = () => {};

  const onMouseUnHover = () => {
    // setPlacing({
    //  top: 'unset',
    //   ''
    // });
  };

  const getXY = () => {
    const rect = childRef.current.getBoundingClientRect();
    const { top, right, bottom, left, width } = rect;

    const tooltipWidth = tooltipRef.current.offsetWidth;
    const tooltipHeight = tooltipRef.current.offsetHeight;

    const childHeight = childRef.current.offsetHeight;

    switch (position) {
      case 'left':
        return {
          left: left - tooltipWidth,
          bottom: bottom - childHeight / 2 - tooltipHeight / 2,
        };
      case 'right':
        return {
          right: left - tooltipWidth,
          bottom: bottom - childHeight / 2 - tooltipHeight / 2,
        };
      case 'bottom':
        return {
          right: right - width / 2 - tooltipWidth / 2,
          bottom: top - tooltipHeight,
        };
      default:
        return {
          right: right - width / 2 - tooltipWidth / 2,
          top: top - tooltipHeight,
        };
    }
  };

  useEffect(() => {
    const placement = getXY();
    setPlacing({ ...placing, ...placement });
  }, [childRef.current, tooltipRef.current, visible]);

  return (
    <>
      <div
        name="tooltip"
        className="fixed flex flex-col transition-all  flex items-center justify-center"
        ref={tooltipRef}
        style={tooltipStyle}
      >
        {/* <div className="bg-gray-700 w-1 h-1 shadow-sm text-white rounded-full" /> */}
        <div className="p-2 p-3 bg-gray-700 rounded-lg shadow-sm text-white">
          <span>سلام</span>
        </div>
        <div style={pointerStyle} />
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
