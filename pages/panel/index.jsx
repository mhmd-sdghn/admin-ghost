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

const steps = ['اطلاعات دوره', 'آپلود صوتی تصویری', 'آپلود PDF', 'مرحله نهایی'];

export default function Panel() {
  return (
    <div className="w-screen h-screen flex">
      <Head title="پنل مدیریت">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"
        />
      </Head>
      <Nav />
      <div className="container mx-auto max-w-6xl h-screen flex  flex-col  items-center justify-center p-5">
        <Steps titles={steps} title="مراحل ثبت دوره" description="فقط چند مرحله تا ساختن دوره فاصله داری">
          <Step key="0" className="flex flex-wrap">
            <div className="w-1/2 p-2">
              <Input
                name="title"
                validate={['isEmpty']}
                placeholder="عنوان"
                icon={<MoreSquare set="curved" primaryColor="#000" />}
              />
            </div>
            <div className="w-1/2 p-2">
              <Input
                name="slug"
                align="left"
                dir="ltr"
                placeholder="slug"
                icon={<MoreSquare set="curved" primaryColor="#000" />}
              />
            </div>
            <div className="w-full p-2">
              <Input textarea name="description" placeholder="توضیحات" />
            </div>
            <div className="w-1/2 p-2">
              <Input
                select
                selectOptions={selectOptions}
                name="type"
                selectIsSearchable
                placeholder="نوع دوره"
              />
            </div>
          </Step>
          <Step key="1">
            <DropUpload />
          </Step>
          <Step key="2">مرحله دو</Step>
        </Steps>
      </div>
    </div>
  );
}
