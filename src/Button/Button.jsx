import {
  Computed,
  Memo,
  observer,
  Reactive,
  useComputed,
  useObserveEffect,
} from "@legendapp/state/react";
import "./Button.scss";
import { useRef } from "react";
import { observe } from "@legendapp/state";
// import { DocIcon, InfoIcon } from "./App3";
const ButtonsContainer = () => {
  return (
    <div className="App3">
      ButtonsContainer
      <p
        style={{
          color: "red",
          textAlign: "center",
        }}
      >
        solid buttons
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <InfoIcon />
        <SolidButton
          name={"button"}
          width="100px"
          borderRadius={"2"}
          type={"solidblue"}
          id="primary_btn"
          LeftIcon={InfoIcon}
          size="lg"
        />
        <SolidButton
          name={"button"}
          type={"slatewhite"}
          LeftIcon={DocIcon}
          width="100px"
          size="md"
        />
        <SolidButton
          name={"button"}
          type={"warningred"}
          LeftIcon={DocIcon}
          width="100px"
        />
        <SolidButton
          name={"button"}
          type={"solidgreen"}
          LeftIcon={DocIcon}
          width="100px"
        />
        <SolidButton
          name={"button"}
          type={"solidblack"}
          LeftIcon={DocIcon}
          width="100px"
        />
        <Button
          name={"button"}
          extraClassName="neutral"
          LeftIcon={DocIcon}
          width="100px"
        />
      </div>
      <p
        style={{
          color: "red",
          textAlign: "center",
        }}
      >
        monochrome buttons
      </p>
      <div
        style={{
          display: "flex",
        }}
      >
        <Button
          name={"button"}
          monoChrome
          border
          borderWeight={"2px"}
          borderColor={"#e2e4e9"}
          borderRadius="1"
          width="100px"
        />
        <Button
          name={"button"}
          monoChrome
          border
          borderWeight={"2px"}
          borderColor={"#e2e4e9"}
          borderRadius="1"
          LeftIcon={DocIcon}
          width="100px"
        />
        <Button name={"button"} monoChrome link width="100px" />
      </div>
      <p
        style={{
          color: "red",
          textAlign: "center",
        }}
      >
        bg shade button buttons
      </p>
      <div
        style={{
          display: "flex",
        }}
      >
        <Button
          name={"button"}
          color={"#FF0000"}
          bgShade
          fontWeight={"600"}
          borderRadius={2}
          LeftIcon={InfoIcon}
          width="100px"
        />
        <Button
          name={"button"}
          borderRadius={1}
          color={"#216E4E"}
          bgShade
          fontWeight={"600"}
          width="100px"
        />
        <Button
          name={"button"}
          LeftIcon={DocIcon}
          color={"#004B91"}
          bgShade
          fontWeight={"600"}
          width="100px"
        />
        <Button
          name={"button"}
          color={"#733FB5"}
          bgShade
          fontWeight={"600"}
          width="100px"
        />
      </div>
    </div>
  );
};

export const SolidButton = ({
  name,
  LeftIcon,
  RightIcon,
  size,
  extraClassName,
  type = "solidblue",
  borderRadius,
  disabled,
  id,
  style,
  width,
}) => {
  // console.log(props, "props");
  // let type2 =
  //   "solidblue" | "slatewhite" | "warningred" | "solidgreen" | "solidblack";
  // let props = { name, LeftIcon, RightIcon, extraClassName, type, disabled };

  const type2 = useComputed(() => {
    let typeofbtn = typeof type !== "object" ? type : type.get();

    let retuningClases = typeofbtn;
    if (extraClassName) {
      let extraClassNameString =
        typeof extraClassName !== "object"
          ? extraClassName
          : extraClassName.get();

      retuningClases += " " + extraClassNameString;
    }
    // console.log(retuningClases);
    return retuningClases;
  });

  // useObserveEffect(() => {
  //   console.log(type2.get(), "type2 computed>>>>>>>>>>>>");
  // });

  return (
    <Button
      extraClassName={type2}
      {...{
        name,
        LeftIcon,
        RightIcon,
        disabled,
        borderRadius,
        size,
        id,
        style,
        width,
      }}
    />
  );
};

export const Button = ({
  name,
  LeftIcon,
  RightIcon,
  extraClassName = "",
  bgShade = false,
  monoChrome,
  color,
  borderRadius = false,
  border = false,
  borderColor = false,
  borderWeight = false,
  disabled,
  readOnly = false,
  onClick,
  width,
  height,
  size = "sm",
  fontWeight,
  style,
  link,
  id,
  verticle,
}) => {
  //   size = "sm" | "md" | "lg";

  const renderCount = ++useRef(0).current;

  const styles = {
    width: !width && "100px",
    height,
    cursor: disabled ? "not-allowed" : readOnly ? "auto" : null,
    opacity: disabled && 0.8,
    borderRadius: !borderRadius && "2px",
    textDecoration: link && "underline",
    color,
    fontWeight,
    backgroundColor:
      color && bgShade && `color-mix(in oklab, ${color} 20%,  white)`,
    ...style,
  };
  //   console.log(LeftIcon, "LeftIcon");
  //   console.log(bgShade, color, `color.scale(${color},  $lightness: 90%)`);
  if (border) {
    styles["border"] =
      borderWeight + " solid " + (borderColor ? borderColor : "transparent");
  }
  if (monoChrome) {
    styles["backgroundColor"] = "white";
    styles["color"] = "#20232D";
  }
  if (borderRadius) {
    styles["borderRadius"] =
      borderRadius == 1 ? "5px" : borderRadius == 2 && "99px";
  }

  if (size) {
    styles["fontSize"] =
      size === "sm" ? "12px" : size === "md" ? "18px" : "30px";

    if (!width) {
      styles["width"] =
        size === "sm" ? "100px" : size === "md" ? "120px" : "150px";
    }

    styles["height"] = size === "sm" ? "25px" : size === "md" ? "45px" : "70px";
  }

  const getName = useComputed(() => {
    let name2 = typeof name === "object" ? name.get() : name;
    return name2;
  });

  const extraClassNameString = useComputed(() => {
    const classString =
      typeof extraClassName === "object"
        ? extraClassName.get()
        : extraClassName;
    return "button " + classString;
  });

  const isDisabled = useComputed(() => {
    let isDisabled;

    if (typeof disabled === "object") {
      isDisabled = disabled.get() ? true : false;
    } else {
      isDisabled = disabled ? true : false;
    }

    console.log(isDisabled ? "isDisabled" : "not isDisabled");

    return isDisabled;
  });

  // useObserveEffect(() => {
  //   console.log(
  //     getName.get(),
  //     extraClassNameString.get(),
  //     " useObserveEffect Class "
  //   );
  // });

  return (
    <Computed>
      {() => (
        <Reactive.button
          $className={extraClassNameString.get()}
          $onClick={!readOnly ? onClick : null}
          $disabled={isDisabled.get()}
          $style={{ ...styles }}
          $id={id}
        >
          {renderCount}

          {LeftIcon && (
            <LeftIcon fill={color} width={styles["fontSize"]} height={"100%"} />
          )}
          {getName.get()}

          {/* <Memo>{() => getName.get()}</Memo> */}
          {/* <Memo>{() => name.get()}</Memo> */}
          {RightIcon && (
            <RightIcon
              fill={color}
              width={styles["fontSize"]}
              height={"100%"}
            />
          )}
        </Reactive.button>
      )}
    </Computed>
  );
};

export const InfoIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props?.width ?? 16}
    height={props?.height ?? 16}
    viewBox={`0 0 16 16`}
    fill="#20232D"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM9 4C9 4.55228 8.55228 5 8 5C7.44772 5 7 4.55228 7 4C7 3.44772 7.44772 3 8 3C8.55228 3 9 3.44772 9 4ZM7 7C6.44772 7 6 7.44772 6 8C6 8.55229 6.44772 9 7 9V12C7 12.5523 7.44772 13 8 13H9C9.55228 13 10 12.5523 10 12C10 11.4477 9.55228 11 9 11V8C9 7.44772 8.55228 7 8 7H7Z"
    />
  </svg>
);

export const DocIcon = (props) => (
  <svg
    width={props?.width ?? 16}
    height={props?.height ?? 16}
    viewBox="0 0 24 24"
    fill="#000"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17 5H7a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1M7 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3z"
    />
    <path d="M8 7h8v2H8zm0 4h8v2H8zm0 4h5v2H8z" />
  </svg>
);

export const LocationIcon = (props) => (
  <svg
    width={props?.width ?? 16}
    height={props?.height ?? 16}
    viewBox="0 0 0.96 0.96"
    xmlns="http://www.w3.org/2000/svg"
    fill="#20232D"
    {...props}
  >
    <path d="M.48.03a.33.33 0 0 0-.33.33c0 .337.3.555.313.564a.03.03 0 0 0 .035 0C.51.915.81.697.81.36A.33.33 0 0 0 .48.03m0 .48A.15.15 0 1 1 .63.36a.15.15 0 0 1-.15.15" />
  </svg>
);
export const CameraIcon = (props) => (
  <svg
    width={props?.width ?? 16}
    height={props?.height ?? 16}
    viewBox="0 0 0.72 0.72"
    xmlns="http://www.w3.org/2000/svg"
    fill="#20232D"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M0.227 0.13A0.09 0.09 0 0 1 0.302 0.09h0.116a0.09 0.09 0 0 1 0.075 0.04l0.024 0.037A0.03 0.03 0 0 0 0.542 0.18H0.57a0.09 0.09 0 0 1 0.09 0.09v0.27a0.09 0.09 0 0 1 -0.09 0.09H0.15A0.09 0.09 0 0 1 0.06 0.54V0.27A0.09 0.09 0 0 1 0.15 0.18h0.028A0.03 0.03 0 0 0 0.203 0.167zM0.3 0.39a0.06 0.06 0 1 1 0.12 0 0.06 0.06 0 0 1 -0.12 0M0.36 0.27a0.12 0.12 0 1 0 0 0.24 0.12 0.12 0 0 0 0 -0.24"
      clipRule="evenodd"
    />
  </svg>
);
