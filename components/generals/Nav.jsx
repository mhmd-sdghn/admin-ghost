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
    name: 'پنل',
    icon: <Message set="curved" primaryColor="#fff" size={28} />,
    href: '/panel',
  },
  {
    name: 'پنل',
    icon: <Message set="curved" primaryColor="#fff" size={28} />,
    href: '/panel',
  },
  {
    name: 'پنل',
    icon: <Message set="curved" primaryColor="#fff" size={28} />,
    href: '/panel',
  },
  {
    name: 'پنل',
    icon: <Message set="curved" primaryColor="#fff" size={28} />,
    href: '/panel',
  },
  {
    name: 'پنل',
    icon: <Message set="curved" primaryColor="#fff" size={28} />,
    href: '/panel',
  },
  {
    name: 'پنل',
    icon: <Message set="curved" primaryColor="#fff" size={28} />,
    href: '/panel',
  },
  {
    name: 'پنل',
    icon: <Message set="curved" primaryColor="#fff" size={28} />,
    href: '/panel',
  },
  {
    name: 'پنل',
    icon: <Message set="curved" primaryColor="#fff" size={28} />,
    href: '/panel',
  },
  {
    name: 'پنل',
    icon: <Message set="curved" primaryColor="#fff" size={28} />,
    href: '/panel',
  },
  {
    name: 'پنل',
    icon: <Message set="curved" primaryColor="#fff" size={28} />,
    href: '/panel',
  },
  {
    name: 'پنل',
    icon: <Message set="curved" primaryColor="#fff" size={28} />,
    href: '/panel',
  },
  {
    name: 'پنل',
    icon: <Message set="curved" primaryColor="#fff" size={28} />,
    href: '/panel',
  },
  {
    name: 'پنل',
    icon: <Message set="curved" primaryColor="#fff" size={28} />,
    href: '/panel',
  },
  {
    name: 'پنل',
    icon: <Message set="curved" primaryColor="#fff" size={28} />,
    href: '/panel',
  },
  {
    name: 'پنل',
    icon: <Message set="curved" primaryColor="#fff" size={28} />,
    href: '/panel',
  },
  {
    name: 'پنل',
    icon: <Message set="curved" primaryColor="#fff" size={28} />,
    href: '/panel',
  },
  {
    name: 'پنل',
    icon: <Message set="curved" primaryColor="#fff" size={28} />,
    href: '/panel',
  },
];

export default function Nav() {
  const router = useRouter();

  return (
    <div
      className="bg-gray-700
     w-screen h-16
      rounded-bl-3xl
      rounded-br-3xl
      flex items-center
       justify-between
        px-3
         relative"
    >
      <RemoveScrollBar />
      <div className="h-full flex items-center 1/12">
        <Image src={LogoPlaceholder} width={40} height={40} />
      </div>

      <div className="flex h-full w-10/12">
        <div className="flex  w-full items-center justify-start overflow-auto hide-scrollbar">
          {items.map((item) => (
            <Tooltip
              key={Date.now() + Math.floor(Math.random() * 1000)}
              position="bottom"
              className="p-3"
              text={item.name}
              bgColor="#fff"
              color="#000"
              cursorPointer
            >
              <button>{item.icon}</button>
            </Tooltip>
          ))}
        </div>
      </div>

      <div className="h-full flex items-center w-1/12">
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
