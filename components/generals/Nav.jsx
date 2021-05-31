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

  return (
    <div
      className={classNames({
        'w-screen': true,
        'top-0': true,
        fixed: true,
      })}
    >
      <div
        className={classNames({
          flex: true,
          'justify-between': true,
          'items-center': true,
        })}
      />
    </div>
  );
}

// w-16
