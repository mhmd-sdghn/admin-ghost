import { Call, Lock, Heart } from 'react-iconly';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BubbleParticles from '../components/others/BubbleParticles.jsx';
import Input from '../components/elements/Input';
import Button from '../components/elements/Button';
import Head from '../components/generals/Head';

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setTimeout(() => {
        setLoading(false);
        router.push('/panel');
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [loading]);

  return (
    <div className="flex">
      <Head title="ورود" />
      <div className="w-screen lg:w-2/5  h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h5 className="my-2">
            به پنل مدیریت <strong className="font-black">کدطوری</strong>{' '}
            خوش‌اومدی
          </h5>
          <Input
            dir="ltr"
            align="left"
            name="phone_number"
            type="number"
            className="mx-3 my-1"
            placeholder="09035436306"
            icon={<Call set="curved" primaryColor="#1F2937" />}
          />
          <Input
            dir="ltr"
            align="left"
            className="mx-3 my-1"
            name="phone_number"
            type="password"
            placeholder="********"
            icon={<Lock set="curved" primaryColor="#1F2937" />}
          />
          <a
            href="#"
            className="text-xs text-gray-400 mt-2 mr-1 mb-3 self-start"
          >
            نمیتونی وارد بشی ؟
          </a>
          <Button
            block
            loading={loading}
            onClick={() => setLoading(true)}
            className="mt-5"
            bold
          >
            ورود
          </Button>
        </div>
      </div>
      <div className="hidden lg:flex lg:w-3/5 bg-gray-800 h-screen items-center justify-center flex-col">
        <BubbleParticles className="absolute w-3/5 h-screen" />

        <h2 className="text-white m-2 text-5xl align-middle bold">
          【Ｃｏｄｅ Ｔｏｒｉ】
        </h2>

        <strong className="font-black text-white absolute bottom-5 flex">
          ساخته شده با{' '}
          <Heart
            className="mx-2 animate-ping"
            set="curved"
            primaryColor="#e57373"
          />{' '}
          توسط محمد صادقیان | بهار ۱۴۰۰
        </strong>
      </div>
    </div>
  );
}
