import classNames from 'classnames';

export default function Button({
  className,
  icon,
  dir,
  children,
  type,
  bold,
  block,
  shadowOff,
  onClick,
  loading,
  disabled,
}) {
  const btnClass = classNames(
    {
      'rounded-lg': true,
      'p-3': true,
      'transition-all': true,
      transform: true,
      'focus:outline-none': true,
      'focus:ring-white-1': true,
      'duration-300': true,
      'active:scale-75': true,
      'hover:bg-yellow-400': !disabled && type === 'primary',
      'hover:bg-gray-100': !disabled && type === 'default',
      'shadow-xl': !shadowOff && bold,
      'shadow-sm': !shadowOff,
      'w-full': block,
      'bg-white': type === 'default',
      'bg-yellow-300': !type || type === 'primary',
      'cursor-wait animate-pulse': loading,
      'opacity-50 cursor-not-allowed': disabled,
    },
    `${className || ''}`
  );

  return (
    <button
      type="button"
      disabled={disabled}
      className={btnClass}
      dir={dir || 'rtl'}
      onClick={onClick}
    >
      {icon}
      <span className="text-center">
        {!loading ? (
          children
        ) : (
          <img
            className="mx-auto"
            src="/images/loading.gif"
            width={25}
            height={25}
            alt="loading"
          />
        )}
      </span>
    </button>
  );
}
