import Image from 'next/image'
import { useRouter } from 'next/router'
import Button from '../components/elements/Button'

export default function Custom404() {
    const router = useRouter()
    return (
        <div className="w-screen h-screen flex flex-col lg:flex-row items-center justify-center">
             <div className="mx-5">
                <Image src="/images/astronaut.svg" width={500} height={500}/>
            </div>
            <div className="mx-5 flex flex-col justify-around">
                <h2 className="text-9xl font-bold mb-6">404</h2>
                <h3 className="text-3xl font-bold  mb-3 ">به نظر میاد گُم شدی !</h3>
                <p className="leading-7 font-light">صفحه‌ای که دنبالشی وجود نداره ، نمی‌دونم چجوری اومدی اینجا <br/>
                     ولی میتونی با کلیک روی دکمه پایین از اول شروع کنی 😃</p>
                     <Button bold className="mt-5 w-1/3 relative left-0" onClick={() => router.back()}>بزن بریم!</Button>
            </div>
           
        </div>
    )
  }