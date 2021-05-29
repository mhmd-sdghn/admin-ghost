export default function Input({
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
}) {
  const btnClass = `rounded-lg p-3 transition-all transform  focus:outline-none focus:ring-wihte-1 duration-300 active:scale-75  hover:bg-yellow-400
   ${!shadowOff && bold ? 'shadow-xl' : !shadowOff ? 'shadow-sm' : ''} 
   ${block ? 'w-full' : ''}
   ${className || ''}
    ${type === 'default' ? 'bg-white' : 'bg-yellow-300'}
    ${loading ? 'cursor-wait animate-pulse' : ''}`;

  return (
    <button className={btnClass} dir={dir || 'rtl'} onClick={onClick}>
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
          />
        )}
      </span>
    </button>
  );
}
