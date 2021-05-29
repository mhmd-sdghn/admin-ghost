import { useState } from 'react';
import { PaperUpload, Video } from 'react-iconly';
import persianJs from 'persianjs';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import classNames from 'classnames';

// TODO lock change step when upload is in progress
// TODO complete multiple file upload

export default function DropUpload({ maxFileCount, setLock }) {
  const [uploads, setUploads] = useState({ queue: [] });

  const setData = (data, index) => {
    const { queue } = uploads;
    queue[index] = data;
    setUploads({ queue });
  };

  const onDropHandler = (files) => {
    // we need Array.map here and set result to upload queue state
    const file = files[0];
    const fileInfo = {
      order: 0,
      name: file.name,
      isWating: true,
      isUploading: false,
      isFailed: false,
      isDone: false,
      progress: 0,
    };

    setUploads({
      queue: [...uploads.queue, fileInfo],
    });

    const form = new FormData();
    form.append('file', file);

    axios({
      method: 'POST',
      url: 'https://api.codetori.ir/file',
      data: form,
      onUploadProgress: (e) => {
        const progress = Math.floor((e.loaded / e.total) * 100);
        setData(
          {
            ...fileInfo,
            isUploading: true,
            isWating: false,
            progress,
          },
          0
        );
      },
    })
      .then((res) => {
        setData(
          {
            ...fileInfo,
            isUploading: false,
            isDone: true,
          },
          0
        );
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
        setData(
          {
            ...fileInfo,
            isFailed: true,
            isWating: false,
            isUploading: false,
          },
          0
        );
      });
  };

  return (
    <Dropzone onDrop={onDropHandler}>
      {({ getRootProps, getInputProps }) => (
        <section className=" ">
          <div className="w-full flex flex-col justify-center items-center">
            <h3 className="text-2xl text-bold mb-3">آپلود فایل</h3>
            <h6 className="mb-3 text-gray-400 text-light text-xs">
              AVI, MP4, MKV
            </h6>
          </div>
          <div
            {...getRootProps()}
            style={{ height: '300px' }}
            className="w-full h-full flex items-center justify-center rounded-lg  border-4  border-dashed cursor-pointer "
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center">
              <PaperUpload
                set="curved"
                primaryColor="#000"
                size={128}
                style={{ opacity: 0.6 }}
                stroke="light"
              />
              <p className="text-gray-600 mt-3">
                فایل رو رها کن یا اینجا کلیک کن
              </p>
            </div>
          </div>
          <div className="mt-5">
            {uploads.queue.map((upload) => (
              <div
                key={upload.name}
                dir="ltr"
                className="w-full relative  bg-white  my-2  overflow-hidden shadow-sm rounded-full"
              >
                <div className="z-30 flex items-center justify-between w-full  px-3 py-2">
                  <div className="flex items-center">
                    <Video set="curved" stroke="light" />
                    <h6 className="ml-2 text-bold text-xs">{upload.name}</h6>
                  </div>
                  <div className="text-xs text-bold">
                    {upload.isDone
                      ? 'آپلود موفق'
                      : upload.isWating
                      ? 'در صف آپلود'
                      : upload.isFailed
                      ? 'آپلود ناموفق'
                      : `%${persianJs(upload.progress.toString())
                          .englishNumber()
                          .toString()}`}
                  </div>
                </div>

                <div
                  className={classNames(
                    'h-1 rounded-full transition-all absolute bottom-0 px-1',
                    {
                      'animate-liner':
                        upload.isWating && !upload.isFailed && !upload.isDone,
                      'animate-pulse': upload.isUploading,
                    }
                  )}
                  style={{
                    width: `${
                      upload.isUploading && !upload.isWating
                        ? upload.progress
                        : 100
                    }%`,
                    backgroundColor: `${
                      upload.isUploading
                        ? '#FCD34D'
                        : upload.isFailed
                        ? '#F87171'
                        : '#6EE7B7'
                    }`,
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </Dropzone>
  );
}
