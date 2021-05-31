import { useRef, useEffect, useState } from 'react';
import classNames from 'classnames';

export default function Tooltip({ children, position }) {
  const childRef = useRef();
  const [size, setSize] = useState({ width: '0px', height: '0px' });

  useEffect(() => {
    const style = getComputedStyle(childRef.current);
    const width = parseInt(style.width.replace('px', ''));
    const height = parseInt(style.height.replace('px', ''));
    setSize({
      width: `${!children.type?.name ? width + 15 : width}px`,
      height: `${!children.type?.name ? height + 15 : height}px`,
    });
  }, [children]);

  const pointer = {
    main: {
      width: 0,
      height: 0,
      margin: 'auto',
    },
    top: {
      borderTop: '8px solid #374151',
      borderLeft: '4px solid transparent',
      borderRight: '4px solid transparent',
    },
    bottom: {
      borderBottom: '8px solid #374151',
      borderLeft: '4px solid transparent',
      borderRight: '4px solid transparent',
    },
    right: {
      borderBottom: '4px solid transparent ',
      borderRight: '8px solid #374151',
      borderTop: '4px solid transparent',
    },
    left: {
      borderBottom: '4px solid transparent ',
      borderLeft: '8px solid #374151',
      borderTop: '4px solid transparent',
    },
  };

  const tooltip = {
    main: {
      position: 'absolute',
    },
    top: {
      flexDirection: 'column',
      top: '-100%',
    },
    bottom: {
      flexDirection: 'column-reverse',
      bottom: '-100%',
    },
    left: {
      flexDirection: 'row-reverse',
      right: '100%',
    },
    right: {
      flexDirection: 'row',
      left: '100%',
    },
  };

  const pointerStyle = { ...pointer.main, ...pointer[position || 'top'] };
  const tooltipStyle = { ...tooltip.main, ...tooltip[position || 'top'] };

  return (
    <div
      className={classNames({
        relative: true,
        flex: true,
        'items-center': true,
        'justify-center': true,
        group: true,
      })}
    >
      <div
        className="group-hover:opacity-100 opacity-0 transition-all"
        style={{
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: size.width,
          height: size.height,
        }}
      >
        <div style={tooltipStyle} className="absolute">
          <div className="text-white text-light text-sm text-center rounded-md px-3 py-2 bg-gray-700">
            سلام
          </div>
          <div style={pointerStyle} />
        </div>
      </div>
      {/* Main */}
      <div ref={childRef}>{children}</div>
    </div>
  );
}
