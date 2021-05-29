import validator from "validator";
import { useState } from "react";
import classNames from "classnames";
import Select from "react-select";

export default function Index({
  name,
  type,
  placeholder,
  className,
  icon,
  dir,
  align,
  validate,
  setIsOk,
  setValue,
  textarea,
  rows,
  cols,
  disabled,
  select,
  selectOptions,
  selectDefaultValue,
  selectIsSearchable,
  selectNoOptionsMessage,
  selectIsMulti,
}) {
  const [] = useState();
  const [containerClassName, setContainerClassName] = useState(
    classNames(
      `
    shadow-sm 
    flex
    items-center
    justify-start 
    bg-white 
    rounded-lg 
    w-full
    transition
    transform
    duration-300 
    hover:shadow-lg
    ${className || ""}`,
      {
        "px-3": !select,
        "py-1": !select,
      }
    )
  );

  let inputClassName = `mx-2  appearance-none flex-1 outline-none mt-1 bg-opacity-0 placeholder-opacity-10  p-2 ${
    align && align === "left"
      ? "text-left"
      : align && align === "center"
      ? "text-center"
      : "text-right"
  }`;

  const setMeIsOk = (isValid) => {
    let temp = containerClassName;
    if (isValid) {
      if (setIsOk && typeof value === "function") setIsOk(true);
      temp = temp.replace("ring-2 ring-red-500", "");
      setContainerClassName(temp);
    } else {
      if (setIsOk && typeof value === "function") setIsOk(false);
      const isAlreadyRed = temp.includes("ring-2 ring-red-500");
      if (!isAlreadyRed) temp += " ring-2 ring-red-500";
      setContainerClassName(temp);
      return;
    }
  };

  const validateMe = (e) => {
    const value = e.target.value;
    if (setValue && typeof value === "function") setValue(value);

    if (validate) {
      for (let item of validate) {
        switch (item) {
          case "isEmail":
            setMeIsOk(validator.isEmail(value));
            break;
          case "isEmpty":
            setMeIsOk(!validator.isEmpty(value));
            break;
          case "isNumeric":
            setMeIsOk(validator.isNumeric(value, { no_symbols: false }));
            break;
        }
      }
    }
  };

  return (
    <div className={containerClassName + ""} dir={dir || "rtl"}>
      {icon}
      {textarea ? (
        <textarea
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          className={inputClassName}
          onChange={validateMe}
          rows={rows || 10}
          cols={cols || 5}
        />
      ) : select ? (
        <Select
          name={name}
          placeholder={placeholder}
          isDisabled={disabled}
          defaultValue={selectDefaultValue}
          options={selectOptions}
          onChange={setValue}
          isMulti={selectIsMulti || false}
          noOptionsMessage={selectNoOptionsMessage || "هیچ موردی یافت نشد"}
          className="w-full py-1 border-none outline-none"
          isSearchable={selectIsSearchable}
          styles={{
            control: (styles) => ({ ...styles, border: "none" }),
            input: (styles) => ({ ...styles, outline: "none" }),
          }}
        />
      ) : (
        <input
          disabled={disabled}
          name={name}
          type={type ? type : "text"}
          placeholder={placeholder}
          className={inputClassName}
          onChange={validateMe}
        />
      )}
    </div>
  );
}
