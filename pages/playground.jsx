import { useState, useRef } from 'react';
import Button from '../components/elements/Button';
import Head from '../components/generals/Head';
import Tooltip from '../components/elements/Tooltip';

export default function PlayGround() {
  return (
    <>
      <Head title="زمین بازی">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </Head>
      <div className="flex items-center justify-center w-screen h-screen">
        <Tooltip position="right" text="سلام من به تو یار قدیمی">
          <Button>کلیک </Button>
        </Tooltip>
      </div>
    </>
  );
}
