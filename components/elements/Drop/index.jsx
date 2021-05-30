import {useState, useEffect} from 'react';
import {PaperUpload, TickSquare, Delete, InfoCircle} from 'react-iconly';
import persianJs from 'persianjs';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import classNames from 'classnames';
import Upload from 'rc-upload'

// TODO lock change step when upload is in progress

export default function DropUpload({maxFileCount, isUploading}) {
    let length = 0;

    const [queue, setQueue] = useState({data: []});

    const [uploads, setUploads] = useState([])

    const updateData = (id, data) => {
        const temp = queue.data;
        const index = temp.findIndex(element => element.id === id)
        temp[index] = {
            ...temp[index],
            ...data
        }
        setQueue({data: temp})
    }

    const updateProgressHandler = (data) => {
        const {percent, id} = data;
        updateData(id, {progress: percent})
        if (isUploading && typeof isUploading === 'function') isUploading(true)
    }

    const startNewUpload = (data) => {
        const {name, type, uid} = data
        const temp = queue.data;
        temp.push({
            id: uid,
            name: name.length > 30 ? name.substr(0,30) + '...' : name,
            type,
            progress: 0,
            failed: false
        })

        setQueue({data: temp})
    }


    const customUpload = ({file, onProgress, headers,}) => {
        if (false) return false;
        else {
            let data = new FormData();
            data.append('file', file)

            axios.post('https://api.codetori.ir/file',
                data,
                {
                    headers,
                    onUploadProgress: ({total, loaded}) => {
                        onProgress({percent: Math.floor(loaded / total * 100), id: file.uid}, file)
                    }
                })
                .then((res) => {
                    console.log('Upload Completed', res.data)
                    if (isUploading && typeof isUploading === 'function') isUploading(false)
                })
                .catch(err => {
                    updateData(file.uid, {failed: true, progress: 99})
                    if (isUploading && typeof isUploading === 'function') isUploading(false)
                    console.log(err)
                });
        }
    }


    return (
        <>
            <div className="w-full flex flex-col justify-center items-center">
                <h3 className="text-2xl text-bold mb-3">آپلود فایل</h3>
                <h6 className="mb-3 text-gray-400 text-light text-xs">
                    AVI, MP4, MKV
                </h6>
            </div>
            <Upload
                name="file"
                action="https://api.codetori.ir/file"
                multiple
                customRequest={customUpload}
                onProgress={updateProgressHandler}
                onStart={startNewUpload}
                style={{height: '300px'}}
                className="w-full h-full flex items-center justify-center rounded-lg  border-4  border-dashed cursor-pointer "
            >
                <div className="flex flex-col items-center justify-center">
                    <PaperUpload
                        set="curved"
                        primaryColor="#000"
                        size={128}
                        style={{opacity: 0.6}}
                        stroke="light"
                    />
                    <p className="text-gray-600 mt-3">
                        فایل رو اینجا رها کن یا کلیک کن
                    </p>
                </div>
            </Upload>
            <div dir="ltr" className="mt-5  rounded-lg bg-gray-100 shadow-sm  overflow-hidden">
                {queue.data.map((item, index) => (
                    <div key={item.id} className={classNames('p-1', {'animate-pulse': !item.progress})}>
                        <div className="relative w-full p-3 ">
                            <div className="flex w-full justify-between">
                                <div className="flex items-center justify-start w-4/5">
                                    <PaperUpload set="curved" primaryColor="#374151"/>
                                    <h6 className={classNames({
                                        'mx-2': true,
                                        'text-bold': item.progress == 100
                                    })}>{item.name}</h6>
                                </div>
                                <div className="flex items-center">
                                    {
                                        item.failed ?
                                            <InfoCircle set="curved"/>
                                            : !item.progress ?
                                            <img src='/images/loading.gif' alt="loading" width={20} height={20}/>
                                            : item.progress === 100 ?
                                                <>
                                                    <button>
                                                        <Delete
                                                            set="curved"
                                                            size={20}
                                                        />
                                                    </button>
                                                    <button className="ml-1">
                                                        <TickSquare
                                                            set="curved"
                                                            size={20}/>
                                                    </button>
                                                </>
                                                :
                                                <span
                                                    className="text-bold text-sm">
                                                {`%${persianJs(item.progress.toString()).englishNumber().toString()}`}
                                           </span>
                                    }
                                </div>
                            </div>
                            <div
                                className={
                                    classNames('h-1 rounded-full mt-2 ',
                                        {
                                            'animate-liner': !item.progress && !item.failed,
                                            'bg-yellow-300': (item.progress && !item.failed) || !item.progress,
                                            'bg-red-400': item.failed,
                                            'bg-green-400': item.progress == 100
                                        })}
                                style={{width: `${!item.progress ? '30' : item.progress}%`}}/>
                        </div>
                    </div>
                ))}
            </div>

        </>
    );
}
