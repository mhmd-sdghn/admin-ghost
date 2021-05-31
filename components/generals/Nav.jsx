import { useState, useRef, useEffect } from 'react';
import { Paper, Home, Message, Logout } from 'react-iconly';
import { useRouter } from 'next/router';
import Tooltip from 'react-tooltip';
import classNames from 'classnames';

const LogoPlaceholder =
  'https://purepng.com/public/uploads/thumbnail//google-stadia-logo-hd4.png';
const ProfileImage =
  'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5f4ebe0c87612dab4f12a597%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D292%26cropX2%3D3684%26cropY1%3D592%26cropY2%3D3987';

const items = [
  {
    name: 'پروژه ها',
    icon: (
      <Paper set="curved" primaryColor="#fff" size="large" stroke="light" />
    ),
    href: '/projects',
  },
  {
    name: 'پنل',
    icon: (
      <Message set="curved" primaryColor="#fff" size="large" stroke="light" />
    ),
    href: '/panel',
  },
  {
    name: 'تگ ها',
    icon: <Home set="curved" primaryColor="#fff" size="large" stroke="light" />,
    href: '/projects3',
  },
];

export default function Nav() {
  const router = useRouter();

  const [iconHover, setIconHover] = useState(false);
  const [titleHover, setTitleHover] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const nav = useRef();

  // useEffect(() => {
  //   let timer;
  //   if (iconHover || titleHover) {
  //     timer = setTimeout(() => {
  //       setIsOpen(true);
  //     }, 200);
  //     nav.current.style.width = '18rem';
  //   } else {
  //     setIsOpen(false);
  //     timer = setTimeout(() => {
  //       nav.current.style.width = 'auto';
  //     }, 200);
  //   }
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [titleHover, iconHover]);

  return (
    <div
      className={classNames({
        flex: true,
        'overflow-hidden': true,
        'transition-all': true,
        'duration-500': true,
        'py-5': true,
        relative: true,
        'z-10': true,
        'w-screen': true,
        'lg:w-2/12': true,
        'top-2': true,
      })}
    >
      <div
        className={classNames({
          'lg:w-1/4': true,
          'bg-gray-800': true,
          'items-center': true,
          'lg:flex-col': true,
          flex: true,
          'z-20': true,
          'rounded-tl-3xl': true,
          'rounded-bl-3xl': true,
          relative: true,
          'shadow-xl': true,
          'w-screen': true,
          'lg:h-full': true,
        })}
        onMouseEnter={() => setIconHover(true)}
        onMouseLeave={() => setIconHover(false)}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden my-8">
          <div className="w-full h-full">
            <img src={ProfileImage} className="w-full h-full" />
          </div>
        </div>

        <div className="w-full mx-auto">
          {items.map((item, index) => (
            <div
              key={item.href}
              className={classNames({
                flex: true,
                'w-full': true,
                'py-2': true,
                'px-4 ': true,
                'items-center': true,
                'justify-center': true,
                'transition-all': true,
                'duration-300': true,
                'hover:bg-gray-900': true,
                'border-l-4': true,
                'cursor-pointer': true,
                'border-yellow-300': router.pathname === item.href,
                'border-gray-800': router.pathname !== item.href,
              })}
            >
              {item.icon}
            </div>
          ))}
        </div>

        <div
          onClick={() => router.push('/login')}
          data-tip="خروج از پنل ؟"
          className="w-10 h-10 cursor-pointer rounded-full  absolute bottom-5 hover:w-screen "
        >
          <div className="w-full h-full flex items-center justify-center">
            {/* <img src={LogoPlaceholder} className="w-full h-full" /> */}
            <Logout set="bold" primaryColor="#fff" stroke="light" />
          </div>
        </div>
      </div>
      <div
        className={classNames({
          'bg-white': true,
          'py-7': true,
          'transition-all': true,
          'overflow-hidden': true,
          'duration-500': true,
          'shadow-xl': true,
          'rounded-tl-3xl': true,
          'rounded-bl-3xl': true,
          absolute: true,
          '-right-10': true,
          z0: true,
          'w-full': true,
          'h-full': true,
          // 'opacity-0': !isOpen,
          // 'opacity-1': isOpen,
        })}
        // onMouseEnter={() => setTitleHover(true)}
        // onMouseLeave={() => setTitleHover(false)}
        // ref={nav}
      >
        <div className="flex min-w-full flex-col mb-9 pr-16">
          <h3 className="text-md min-w-full my-0">محمد صادقیان</h3>
          <span className="text-xs text-gray-500">آنلاین</span>
        </div>
        <div>
          {items.map((item, index) => {
            const calss = `px-2 py-3 rounded-full pr-16 trasform duration-300 hover:bg-gray-100 cursor-pointer ${
              router.pathname === item.href ? 'bg-gray-50' : ''
            } `;
            return (
              <div key={item.href} className={calss}>
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// w-16
