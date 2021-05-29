import classNames from "classnames";
import { useState } from "react";

export default function Steps({ children, titles }) {
  const [active, setActive] = useState(0);

  const activeStep = children.find((child) => child.key == active);
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div
        className=" w-full flex items-start justify-start"
        style={{ minHeight: "500px" }}
      >
        <div className="w-2/6 py-2">
          {titles.map((title, index) => (
            <div
              key={title}
              className={classNames({
                "p-4": true,
                "border-r-2": index > active,
                "border-r-4": index <= active,
                "border-yellow-300": index === active,
                "opacity-70": index < active,
                "opacity-50": index > active,
                "transition-all": true,
              })}
            >
              <button
                className="focus:outline-none"
                onClick={() => setActive(index)}
              >
                <h4
                  className={classNames({
                    "font-bold": index === active,
                  })}
                >
                  {title}
                </h4>
              </button>
            </div>
          ))}
        </div>
        <div className=" w-4/6"> {activeStep} </div>
      </div>
    </div>
  );
}

/**
 * <div className="p-4 border-r-2">
          <button>
            <h4>بخش اول</h4>
          </button>
        </div>
        <div className="p-4 border-r-2  border-yellow-300">
          <button>
            <h4 className="font-bold">بخش دوم</h4>
          </button>
        </div>
        <div className="p-4 border-r-2 opacity-50">
          <button>
            <h4>بخش سوم</h4>
          </button>
        </div>
        <div className="p-4 border-r-2 opacity-50">
          <button>
            <h4>بخش چهارم</h4>
          </button>
        </div>
 */
