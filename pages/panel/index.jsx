import Head from "next/head";
import { Animated } from "react-animated-css";
import { MoreSquare } from "react-iconly";
import Nav from "../../components/generals/Nav";
import Steps, { Step } from "../../components/elements/Steps";
import Index from "../../components/elements/Input";

const selectOptions = [
  { value: "video", label: "ویدئو" },
  { value: "audio", label: "صوتی" },
  { value: "seminar", label: "سمینار" },
];

const steps = ["اطلاعات دوره", "آپلود صوتی تصویری", "آپلود PDF", "مرحله نهایی"];

export default function Panel() {
  return (
    <div className="w-screen h-screen flex">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"
        />
      </Head>
      <Nav />
      <div className="container mx-auto max-w-6xl h-screen flex  flex-col  items-center justify-center p-5">
        <Steps titles={steps}>
          <Step key="0">
            <div className="flex flex-wrap">
              <div className="w-1/2 p-2">
                <Animated animationIn="fadeInDown" animationOut="fadeOutDown">
                  <Index
                    name="title"
                    validate={["isEmpty"]}
                    placeholder="عنوان"
                    icon={<MoreSquare set="curved" primaryColor="#000" />}
                  />
                </Animated>
              </div>
              <div className="w-1/2 p-2">
                <Index
                  name="slug"
                  align="left"
                  dir="ltr"
                  placeholder="slug"
                  icon={<MoreSquare set="curved" primaryColor="#000" />}
                />
              </div>
              <div className="w-full p-2">
                <Index textarea name="description" placeholder="توضیحات" />
              </div>
              <div className="w-1/2 p-3">
                <Index
                  select
                  selectOptions={selectOptions}
                  name="type"
                  selectIsSearchable
                  placeholder="نوع دوره"
                />
              </div>
            </div>
          </Step>
          <Step key="1">مرحله یک</Step>
          <Step key="2">مرحله دو</Step>
        </Steps>
      </div>
    </div>
  );
}
