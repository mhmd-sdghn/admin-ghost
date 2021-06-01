import classNames from 'classnames';
import Button from '../Button';

export default function Index({
  children,
  isOpen,
  icon,
  timer,
  onSubmit,
  submitText,
  onCancle,
  cancleText,
}) {
  if (timer) {
    const timeOut = setTimeout(() => {
      onClose();
      clearTimeout(timeOut);
    }, timer);
  }

  return isOpen ? (
    <div className="fixed top-0 z-50 -right-0.5 w-screen h-screen backdrop-filter backdrop-blur backdrop-brightness-90">
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-full md:w-1/2 lg:w-2/5 bg-white shadow-sm p-5 rounded-lg flex flex-col text-sm lg:flex-row lg:text-md items-center mx-5 justify-between animate-fade-down">
          <div
            className={classNames({
              'w-1/8': true,
              'p-2': true,
              flex: true,
              'justify-center': true,
              'items-center': true,
            })}
          >
            {icon}
          </div>
          <div className="w-5/8 p-2 flex ">{children}</div>
          <Button
            className={classNames('p-2 mx-1', {
              'w-1/8': onCancle,
              'w-2/8': !onCancle,
            })}
            onClick={onSubmit}
          >
            {submitText || 'باشه'}
          </Button>
          {onCancle ? (
            <Button
              type="default"
              className="w-1/8 p-2 mx-1"
              onClick={onCancle}
            >
              {cancleText || 'بستن'}
            </Button>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  ) : (
    ''
  );
}
