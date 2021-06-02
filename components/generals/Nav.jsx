import { Paper, Home, Message, Logout } from 'react-iconly';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Tooltip from '../elements/Tooltip';

const LogoPlaceholder =
  'https://purepng.com/public/uploads/thumbnail//google-stadia-logo-hd4.png';
const ProfileImage =
  'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5f4ebe0c87612dab4f12a597%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D292%26cropX2%3D3684%26cropY1%3D592%26cropY2%3D3987';

const items = [
  {
    name: 'پروژه ها',
    icon: <Paper set="curved" primaryColor="#fff" size={28} />,
    href: '/projects',
  },
  {
    name: 'صفحه اصلی',
    icon: <Home set="curved" primaryColor="#fff" size={28} />,
    href: '/projects',
  },
  {
    name: 'پیام ها',
    icon: <Message set="curved" primaryColor="#fff" size={28} />,
    href: '/projects',
  },
  {
    name: 'خروج',
    icon: <Logout set="curved" primaryColor="#fff" size={28} />,
    href: '/projects',
  },
  {
    name: 'پروژه ها',
    icon: <Paper set="curved" primaryColor="#fff" size={28} />,
    href: '/projects',
  },
  {
    name: 'صفحه اصلی',
    icon: <Home set="curved" primaryColor="#fff" size={28} />,
    href: '/projects',
  },
  {
    name: 'پیام ها',
    icon: <Message set="curved" primaryColor="#fff" size={28} />,
    href: '/projects',
  },
  {
    name: 'خروج',
    icon: <Logout set="curved" primaryColor="#fff" size={28} />,
    href: '/projects',
  },
  {
    name: 'پروژه ها',
    icon: <Paper set="curved" primaryColor="#fff" size={28} />,
    href: '/projects',
  },
  {
    name: 'صفحه اصلی',
    icon: <Home set="curved" primaryColor="#fff" size={28} />,
    href: '/projects',
  },
  {
    name: 'پیام ها',
    icon: <Message set="curved" primaryColor="#fff" size={28} />,
    href: '/projects',
  },
  {
    name: 'خروج',
    icon: <Logout set="curved" primaryColor="#fff" size={28} />,
    href: '/projects',
  },
  {
    name: 'پروژه ها',
    icon: <Paper set="curved" primaryColor="#fff" size={28} />,
    href: '/projects',
  },
  {
    name: 'صفحه اصلی',
    icon: <Home set="curved" primaryColor="#fff" size={28} />,
    href: '/projects',
  },
  {
    name: 'پیام ها',
    icon: <Message set="curved" primaryColor="#fff" size={28} />,
    href: '/projects',
  },
  {
    name: 'خروج',
    icon: <Logout set="curved" primaryColor="#fff" size={28} />,
    href: '/projects',
  },
];

export default function Nav() {
  const router = useRouter();

  return (
    <div
      className="
      bg-gray-700
      w-screen
      h-16
      rounded-bl-3xl
      rounded-br-3xl
      flex
      flex-row
      items-center
      justify-between
      px-3
      relative
      lg:w-20
      lg:h-full
      lg:rounded-tl-3xl
      lg:rounded-bl-3xl
      lg:rounded-br-none
      lg:flex-col
      "
    >
      <RemoveScrollBar />
      <div className="w-1/12 h-full lg:w-full lg:h-52 flex items-center justify-center ">
        <Image src={LogoPlaceholder} width={40} height={40} />
      </div>

      <div className="flex h-full w-10/12 lg:w-full flex-grow relative ">
        <div className="flex w-full flex-row lg:flex-col items-center justify-start overflow-auto hide-scrollbar mx-2">
          <div className="absolute top-0 right-0.5 lg:right-auto lg:w-full lg:h-3 bg-gradient-to-l from-gray-700 to-transparent w-6 h-full" />
          <div className="flex flex-row  lg:flex-col">
            {items.map((item) => (
              <Tooltip
                key={Date.now() + Math.floor(Math.random() * 1000)}
                position="left"
                text={item.name}
                bgColor="#fff"
                color="#000"
                cursorPointer
                className="p-3"
              >
                <button>{item.icon}</button>
              </Tooltip>
            ))}
          </div>
          <div className="absolute top-0 left-0.5  lg:right-auto lg:top-auto lg:bottom-auto lg:h-3 lg:w-full  bg-gradient-to-r from-gray-700 to-transparent w-6 h-full" />
        </div>
      </div>

      <div className="h-full flex items-center justify-center w-1/12 lg:w-full lg:h-52">
        <Image
          src={ProfileImage}
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
    </div>
  );
}

// w-16
