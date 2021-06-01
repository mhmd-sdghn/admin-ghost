import { useRef, useEffect, useState } from 'react';
import useWindowSize from '../../../hooks/useWindowResize';
import useElementChange from '../../../hooks/useElementChange';

export default function Tooltip({
  children,
  position,
  text,
  className,
  bgColor,
  color,
}) {
  const childRef = useRef();
  const tooltipRef = useRef();
  const childChange = useElementChange(childRef.current);
  const tooltipChange = useElementChange(tooltipRef.current);
  const windowSize = useWindowSize();
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
    'top-left': {
      borderTop: `8px solid ${bgColor || '#374151'}`,
      borderLeft: '8px solid transparent',
      alignSelf: 'flex-start',
    },
    'top-right': {
      borderTop: `8px solid ${bgColor || '#374151'}`,
      borderRight: '8px solid transparent',
      alignSelf: 'flex-end',
    },
    'bottom-left': {
      borderBottom: `8px solid ${bgColor || '#374151'}`,
      borderLeft: '8px solid transparent',
      alignSelf: 'flex-start',
    },
    'bottom-right': {
      borderBottom: `8px solid ${bgColor || '#374151'}`,
      borderRight: '8px solid transparent',
      alignSelf: 'flex-end',
    },
  };
  const tooltip = {
    main: {
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
      flexDirection: 'row-reverse',
    },
    right: {
      flexDirection: 'row',
    },
    'bottom-left': {
      flexDirection: 'column-reverse',
    },
    'bottom-right': {
      flexDirection: 'column-reverse',
    },
    'top-left': {
      flexDirection: 'column',
    },
    'top-right': {
      flexDirection: 'column',
    },
  };

  const tooltipBox = {
    main: {
      backgroundColor: bgColor || '#374151',
      color: color || '#fff',
    },
    top: {
      borderRadius: '0.5rem',
    },
    bottom: {
      borderRadius: '0.5rem',
    },
    left: {
      borderRadius: '0.5rem',
    },
    right: {
      borderRadius: '0.5rem',
    },
    'top-left': {
      borderRadius: '0.5rem 0.5rem 0 0.5rem',
    },
    'top-right': {
      borderRadius: '0.5rem 0.5rem 0.5rem 0',
    },
    'bottom-left': {
      borderRadius: '0.5rem 0 0.5rem 0.5rem',
    },
    'bottom-right': {
      borderRadius: '0 0.5rem 0.5rem 0.5rem',
    },
  };

  const pointerStyle = { ...pointer.main, ...pointer[position] };
  const tooltipStyle = { ...tooltip.main, ...tooltip[position] };
  const tooltipBoxStyle = { ...tooltipBox.main, ...tooltipBox[position] };

  const getXY = () => {
    const rect = childRef.current.getBoundingClientRect();
    const { top, right, bottom, left, width, height, x, y } = rect;

    const tooltipWidth = tooltipRef.current?.offsetWidth;
    const tooltipHeight = tooltipRef.current?.offsetHeight;

    switch (position) {
      case 'left':
        return {
          left: x - tooltipWidth - 5,
          top: y - height / 2,
        };
      case 'right':
        return {
          left: x + width + 5,
          top: y - height / 2,
        };
      case 'bottom':
        return {
          left: x + width / 2 - tooltipWidth / 2,
          top: y + height / 2 + tooltipHeight / 2,
        };
      case 'top-left':
        return {
          left: x + width / 2 - tooltipWidth + 5,
          top: y - tooltipHeight - 10,
        };
      case 'top-right':
        return {
          left: x + width / 2,
          top: y - tooltipHeight - 10,
        };
      case 'bottom-left':
        return {
          left: x + width / 2 - tooltipWidth + 5,
          top: y + height / 2 + tooltipHeight / 2,
        };
      case 'bottom-right':
        return {
          left: x + width / 2,
          top: y + height / 2 + tooltipHeight / 2,
        };
      default:
        return {
          left: x + width / 2 - tooltipWidth / 2,
          top: y - tooltipHeight - 10,
        };
    }
  };

  const onMouseHover = () => {
    setVisible(true);
    setTimeout(() => {
      const placement = getXY();
      setPlacing({ ...placing, ...placement });
      if (tooltipRef.current) {
        tooltipRef.current.style.opacity = '1';
      }
    }, 30);
  };

  const onMouseUnHover = () => {
    setVisible(false);
  };

  return (
    <>
      {visible ? (
        <div
          name="tooltip"
          className="absolute flex flex items-center justify-center opacity-0 transition-all"
          ref={tooltipRef}
          style={tooltipStyle}
        >
          {/* <div className="w-1 h-1 rounded-full bg-gray-800" /> */}
          <div className="p-2 p-3 shadow-sm text-white" style={tooltipBoxStyle}>
            <span>{text || 'سلام'}</span>
          </div>
          <div style={pointerStyle} />
        </div>
      ) : null}
      <div
        name="tooltip_child"
        ref={childRef}
        onMouseOver={onMouseHover}
        onMouseLeave={onMouseUnHover}
        className={`flex items-center justify-center ${className || ''}`}
      >
        {children}
      </div>
    </>
  );
}
