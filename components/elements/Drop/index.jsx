import { useState, useEffect } from 'react';
import { PaperUpload, TickSquare, Delete, InfoCircle } from 'react-iconly';
import persianJs from 'persianjs';
import axios from 'axios';
import classNames from 'classnames';
import Upload from 'rc-upload';

export default function DropUpload({
  maxSize,
  isUploading,
  onDelete,
  accept,
  onDone,
  onError,
}) {
  const [queue, setQueue] = useState({ data: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isUploading && typeof isUploading === 'function') isUploading(loading);
  }, [loading]);

  const updateData = (id, data) => {
    const temp = queue.data;
    const index = temp.findIndex((element) => element.id === id);
    temp[index] = {
      ...temp[index],
      ...data,
    };
    setQueue({ data: temp });
  };

  const updateProgressHandler = (data) => {
    const { percent, id } = data;
    updateData(id, { progress: percent });
  };

  const startNewUpload = (data) => {
    const { name, type, uid } = data;
    const temp = queue.data;
    temp.push({
      id: uid,
      name: name.length > 30 ? `${name.substr(0, 25)}...` : name,
      type,
      progress: 0,
      failed: false,
    });

    setQueue({ data: temp });
  };

  const onDeleteUpload = (id) => {
    const temp = queue.data;
    const index = temp.findIndex((element) => element.id === id);
    if (index !== -1) {
      temp.splice(index, 1);
      setQueue({ data: temp });
    }
    if (onDelete && typeof onDelete === 'function') onDelete(id);
  };

  /**
   * validate file format , file size and etc
   * @param file
   * @returns {{ok: boolean}|{msg: string, ok: boolean}}
   */
  const validate = (file) => {
    if (accept && accept.length) {
      const temp = file.name.split('.');
      const format = temp[temp.length - 1];
      const isAccepted = accept.includes(format);
      if (!isAccepted)
        return {
          msg: 'خطای فرمت نامعتبر',
          ok: false,
        };
    }
    if (maxSize) {
      if (maxSize < file.size / (1024 * 1024))
        return {
          msg: 'خطای فایل حجیم',
          ok: false,
        };
    }
    return { ok: true };
  };

  const customUpload = async ({ file, onProgress, headers }) => {
    const validated = validate(file);

    if (!validated.ok) {
      updateData(file.uid, {
        name: (
          <>
            {file.name}
            <span className="text-sm text-red-400"> ({validated.msg}) </span>
          </>
        ),
        failed: true,
        progress: 1,
      });
      const timer = setTimeout(() => {
        const temp = queue.data;
        const index = temp.findIndex((element) => element.id === file.uid);
        if (index !== -1) {
          temp.splice(index, 1);
          setQueue({ data: temp });
          clearTimeout(timer);
        }
      }, 3000);
      return false;
    }

    const data = new FormData();
    data.append('file', file);
    try {
      if (isUploading && typeof isUploading === 'function') isUploading(true);
      const res = await axios.post('https://api.codetori.ir/file', data, {
        headers,
        onUploadProgress: ({ total, loaded }) => {
          onProgress(
            { percent: Math.floor((loaded / total) * 100), id: file.uid },
            file
          );
        },
      });
      if (onDone && typeof onDone === 'function') onDone(res.data);
    } catch (err) {
      if (onError && typeof onError === 'function') onError(err);
      updateData(file.uid, { failed: true, progress: 99 });
    }
    if (isUploading && typeof isUploading === 'function') isUploading(false);
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm w-full h-full">
      <div className="w-full flex flex-col justify-center items-center">
        <h3 className="lg:text-2xl text-bold mb-3">آپلود فایل</h3>
        <h6 className="mb-3 text-gray-400 text-light text-xs">
          {accept && accept.length
            ? accept.join(' | ').toUpperCase()
            : 'همه فرمت ها مجاز است'}
        </h6>
      </div>
      <Upload
        name="file"
        action="https://api.codetori.ir/file"
        multiple
        customRequest={customUpload}
        onProgress={updateProgressHandler}
        onStart={startNewUpload}
        className="w-full h-full flex items-center justify-center rounded-lg p-3 border-4  border-dashed cursor-pointer "
      >
        <div className="lg:hidden flex flex-col items-center justify-center">
          <PaperUpload
            set="curved"
            primaryColor="#000"
            size={64}
            style={{ opacity: 0.6 }}
            stroke="light"
          />
          <p className="text-gray-600 mt-3 text-sm">
            فایل رو اینجا رها کن یا کلیک کن
          </p>
        </div>
        <div className="hidden lg:flex  flex-col items-center justify-center">
          <PaperUpload
            set="curved"
            primaryColor="#000"
            size={128}
            style={{ opacity: 0.6 }}
            stroke="light"
          />
          <p className="text-gray-600 mt-3">فایل رو اینجا رها کن یا کلیک کن</p>
        </div>
      </Upload>
      <div dir="ltr" className="mt-5    overflow-hidden">
        {queue.data.map((item, index) => (
          <div
            key={item.id}
            className={classNames('p-1', { 'animate-pulse': !item.progress })}
          >
            <div className="relative w-full p-3 animate-fade-down">
              <div className="flex w-full justify-between">
                <div className="flex items-center justify-start w-4/5">
                  <PaperUpload set="curved" primaryColor="#374151" />
                  <h6
                    className={classNames({
                      'mx-2': true,
                      'text-bold': item.progress == 100,
                      'text-xs': true,
                    })}
                  >
                    {item.name}
                  </h6>
                </div>
                <div className="flex items-center">
                  {item.failed ? (
                    <InfoCircle set="curved" />
                  ) : !item.progress ? (
                    <img
                      src="/images/loading.gif"
                      alt="loading"
                      width={20}
                      alt="loading"
                      height={20}
                    />
                  ) : item.progress === 100 ? (
                    <>
                      <button type="button">
                        <Delete
                          set="curved"
                          size={20}
                          onClick={() => onDeleteUpload(item.id)}
                        />
                      </button>
                      <TickSquare className="ml-1" set="curved" size={20} />
                    </>
                  ) : (
                    <span className="text-bold text-sm">
                      {`%${persianJs(item.progress.toString())
                        .englishNumber()
                        .toString()}`}
                    </span>
                  )}
                </div>
              </div>
              <div
                className={classNames('h-1 rounded-full mt-2', {
                  'animate-liner': !item.progress && !item.failed,
                  'bg-yellow-300':
                    (item.progress && !item.failed) || !item.progress,
                  'bg-red-400': item.failed,
                  'bg-green-400': item.progress == 100,
                })}
                style={{ width: `${!item.progress ? '30' : item.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
