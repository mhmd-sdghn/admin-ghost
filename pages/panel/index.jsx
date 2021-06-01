import { useState } from 'react';
import { MoreSquare } from 'react-iconly';
import Nav from '../../components/generals/Nav';
import Steps, { Step } from '../../components/elements/Steps';
import Input from '../../components/elements/Input';
import DropUpload from '../../components/elements/Drop';
import Head from '../../components/generals/Head';

const selectOptions = [
  { value: 'video', label: 'ویدئو' },
  { value: 'audio', label: 'صوتی' },
  { value: 'seminar', label: 'سمینار' },
];

export default function Panel() {
  const [lockStep, setLockStep] = useState();
  const [lockMessage, setLockMessage] = useState('');

  const handleLockStep = (status) => {
    setLockStep(status);
    if (status) {
      setLockMessage(
        'زمانی که فایلی درحال آپلود شدن باشه نمیتونی به مرحله های دیگه بری ، همینطور یادت باشه که اگه به صفحه دیگه ای بری فایل آپلود شده از دسترس خارج میشه !'
      );
    } else {
      setLockMessage('');
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row">
      <Head title="پنل مدیریت" />
      <Nav />
      {/* <div className="container mx-auto max-w-6xl h-screen flex  flex-col  items-center justify-center p-5"> */}
      {/*  <Steps */}
      {/*    title="مراحل ثبت دوره" */}
      {/*    description="فقط چند مرحله تا ساختن دوره فاصله داری" */}
      {/*    lockStep={lockStep} */}
      {/*    lockMessage={lockMessage} */}
      {/*  > */}
      {/*    <Step key="0" className="flex flex-wrap" title="اطلاعات دوره"> */}
      {/*      <div className="w-1/2 p-2"> */}
      {/*        <Input */}
      {/*          name="title" */}
      {/*          validate={['isEmpty']} */}
      {/*          placeholder="عنوان" */}
      {/*          icon={<MoreSquare set="curved" primaryColor="#000" />} */}
      {/*        /> */}
      {/*      </div> */}
      {/*      <div className="w-1/2 p-2"> */}
      {/*        <Input */}
      {/*          name="slug" */}
      {/*          align="left" */}
      {/*          dir="ltr" */}
      {/*          placeholder="slug" */}
      {/*          icon={<MoreSquare set="curved" primaryColor="#000" />} */}
      {/*        /> */}
      {/*      </div> */}
      {/*      <div className="w-full p-2"> */}
      {/*        <Input textarea name="description" placeholder="توضیحات" /> */}
      {/*      </div> */}
      {/*      <div className="w-1/2 p-2"> */}
      {/*        <Input */}
      {/*          select */}
      {/*          selectOptions={selectOptions} */}
      {/*          name="type" */}
      {/*          selectIsSearchable */}
      {/*          placeholder="نوع دوره" */}
      {/*        /> */}
      {/*      </div> */}
      {/*    </Step> */}
      {/*    <Step key="1" title="آپلود ویدئو و آدیو"> */}
      {/*      <DropUpload */}
      {/*        isUploading={handleLockStep} */}
      {/*        accept={['mp4', 'avi', 'mkv', 'pdf']} */}
      {/*        maxSize={1024 * 10} */}
      {/*      /> */}
      {/*    </Step> */}
      {/*    <Step key="2" title="آپلود فایل متنی(PDF)"> */}
      {/*      <DropUpload /> */}
      {/*    </Step> */}
      {/*  </Steps> */}
      {/* </div> */}
    </div>
  );
}
