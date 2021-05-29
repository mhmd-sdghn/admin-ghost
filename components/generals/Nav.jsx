import { useState, useRef, useEffect } from 'react';
import { Paper, Home, Message, Logout } from 'react-iconly';
import { useRouter } from 'next/router';
import Tooltip from 'react-tooltip';

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
  const [isOpen, setIsOpen] = useState(false);
  const nav = useRef();

  useEffect(() => {
    let timer;
    if (iconHover || titleHover) {
      timer = setTimeout(() => {
        setIsOpen(true);
      }, 200);
      nav.current.style.width = '18rem';
    } else {
      setIsOpen(false);
      timer = setTimeout(() => {
        nav.current.style.width = 0;
      }, 200);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [titleHover, iconHover]);

  return (
    <div className="overflow-hidden  transition-all duration-500 flex items-center justify-start h-screen mr-2">
      <div
        className="bg-gray-800 relative w-1/4 shadow-xl rounded-full flex flex-col items-center z-10"
        style={{ height: '95vh', width: `5rem` }}
        onMouseEnter={() => setIconHover(true)}
        onMouseLeave={() => setIconHover(false)}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden my-8">
          <div className="w-full h-full">
            <img src={ProfileImage} className="w-full h-full" />
          </div>
        </div>

        <div className="w-full mx-auto">
          {items.map((item, index) => {
            const calss = `flex w-full p-2 items-center justify-center
             trasform duration-300 hover:bg-gray-900 border-l-4 cursor-pointer ${
               router.pathname === item.href
                 ? 'border-yellow-300'
                 : 'border-none'
             } `;
            return (
              <div key={item.href} className={calss}>
                {item.icon}
              </div>
            );
          })}
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
        className="bg-white py-7 transition-all overflow-hidden duration-500 w-3/4  shadow-xl rounded-tl-3xl rounded-bl-3xl relative -right-10"
        onMouseEnter={() => setTitleHover(true)}
        // onMouseMove={() => setIsOpen(true)}
        onMouseLeave={() => setTitleHover(false)}
        ref={nav}
        style={{
          height: '95vh',
          opacity: `${isOpen ? 1 : 0}`,
          width: '0',
        }}
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
