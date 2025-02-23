import {
  Computed,
  For,
  Memo,
  observer,
  Show,
  useComputed,
  useObservable,
  useObserve,
  useObserveEffect,
  useSelector,
} from "@legendapp/state/react";
import "./App.scss";
import backend_data from "./device_data.json";
import { useEffect, useRef } from "react";
import {
  Button,
  CameraIcon,
  DocIcon,
  LocationIcon,
  SolidButton,
} from "./Button/Button";
import { Reactive } from "@legendapp/state/react";
import { computed } from "@legendapp/state";

const App = () => {
  const { isModalOpen, devices_data, isBtnDisabled } = useObservable({
    isModalOpen: false,
    devices_data: [...backend_data.devices],
    // totalPrize: 0,
    isBtnDisabled: false,
  });
  const closeFunction = () => {
    isModalOpen.set(false);
  };
  const renderCount = ++useRef(0).current;

  useEffect(() => {
    console.log("useeffect");

    window.addEventListener("keydown", (e) => {
      e.code === "Escape" && isModalOpen.get() === true && closeFunction();
    });
    return () => {
      window.removeEventListener("keydown");
    };
  }, []);

  // useObserve(totalPrize, (e) => {
  //   document.title = `${e.get()}`;
  // });
  const isbtndisabled = useComputed(() => isBtnDisabled.get());
  const btnName = useComputed(() =>
    !isBtnDisabled.get() ? "Selected !" : "Select btn"
  );
  const btnType = useComputed(() =>
    !isBtnDisabled.get() ? "solidblue" : "warningred anand"
  );

  return (
    <div
      className="main_app_container"
      onClick={() => {
        // isBtnDisabled.toggle();
        isModalOpen.toggle();
      }}
    >
      <div className="">{renderCount}</div>
      <button
        onClick={() => {
          isModalOpen.set(true);
        }}
      >
        add Devices
      </button>
      {/* <Button2 className={btnclassName} btnName={btnName} /> */}
      {/* <Button2
        disabled={isbtndisabled}
        name={btnName}
        width="150px"
        style={{ margin: "0px", padding: ".2vh 1vw" }}
        borderRadius={"2"}
        extraClassName={btnType}
        size="sm"
        id={"buy_now"}
        key={"buy_now"}
      /> */}

      <Show if={isModalOpen}>
        {() => (
          <Modal
            {...{
              devices_data,
              closeFunction,
            }}
          />
        )}
      </Show>
    </div>
  );
};

const Modal = ({ closeFunction, devices_data }) => {
  const renderCount = ++useRef(0).current;
  const prize = useObservable(0);

  const { items, prize2 } = useComputed(() => {
    let items = devices_data.get().filter((item) => item.isChecked === true);

    // let prize2 = items
    //   .map((item) => item.price)
    //   .reduce((curr, acc) => curr + acc, 0);

    // console.log(items, prize2, "selecteditemslength useComputed");
    return { items, prize2: 0 };
  });

  const isbtndisabled = useComputed(() => {
    return prize.get() === 0;
  });
  const btnname = useComputed(() => {
    return prize.get() ? "Buy Now $" + prize.get() : "Select Items";
  });
  const btnType = useComputed(() => {
    return prize.get() > 0 ? "solidblue" : "warningred";
  });

  // console.log(selecteditemslength.get(), "RRRRRRrr");

  useObserveEffect(prize, (e) => {
    console.log(e.value, "isbtndisabled");
  });
  // const getTotalPrize = totalPrize.get();
  // const isBtnDisabled = useComputed(()=>{

  // })
  return (
    <Reactive.div
      $className="modal_wrapper"
      // $onClick={() => {
      //   totalPrize.set((p) => p + 100);
      //   console.log(totalPrize.get());
      // }}
    >
      {/* {console.log(totalPrize.get(), "totalValue")} */}
      <div className="render_count">{renderCount}</div>
      <div
        className="modal_container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modal_header">
          <div className="modal_header_title">Add To Devices</div>
          {/* <Memo>{() => prize2.get()}</Memo> */}
          <X
            onClick={(e) => {
              e.stopPropagation();
              closeFunction();
            }}
          />
          {/* <div className="close_button">X</div> */}
        </div>
        <div className="modal_body">
          {/* <Card Data={devices_data[0]} key={devices_data[0].name.get()} /> */}
          <For each={devices_data}>
            {(item) => <Card Data={item} key={item.id.get()} prize={prize} />}
          </For>
        </div>
        <div className="modal_footer">
          <div className="total">
            {/* SubTotal () : <Memo>{() => totalPrize.get()} </Memo> */}
            <p>
              <Memo>{() => <span>SubTotal : {items.get().length}</span>}</Memo>
              {/* <Memo>{() => <span> Total : $ {prize}</span>} </Memo> */}
              <Memo>{() => <span> ${prize.get()}</span>}</Memo>
              {/* <span>{prize.get()}</span> */}
            </p>
            {/* SubTotal ({selecteditemslength.get().length}) : {prize.get()} */}
          </div>
          <div className="modal_footer_btns_container">
            <SolidButton
              name={"Dismiss"}
              type={"slatewhite"}
              width="150px"
              size="sm"
              id={"dismiss"}
              key={"dismiss"}
              borderRadius={"2"}
              style={{ margin: "0px", padding: ".2vh 1vw" }}
            />
            {/* {console.log(totalPrize.get(), "totalPrize.get()")} */}
            <SolidButton
              disabled={prize.get() === 0}
              name={btnname}
              width="150px"
              style={{ margin: "0px", padding: ".2vh 1vw" }}
              borderRadius={"2"}
              type={btnType}
              size="sm"
              id={"buy_now"}
              key={"buy_now"}
            />
          </div>
        </div>
      </div>
    </Reactive.div>
  );
};

export default App;

const Card = ({ Data, prize }) => {
  const renderCount = ++useRef(0).current;

  const isSelected = useComputed(() => {
    return Data?.isChecked?.get() ? "✅" : "⬜";
  });
  // console.log(Data.get());
  // console.log(Data.name.get(), Data.isChecked.get(), "--------");
  return (
    <div
      className="card_container"
      onClick={() => {
        Data.isChecked.set((prev) => !prev);
        // console.log(Data.name.get(), Data.isChecked.get(), ">>>>>>>>>>>>");

        Data.isChecked.get()
          ? prize.set((prev) => prev + Data.price.get())
          : prize.set((prev) => prev - Data.price.get());
      }}
    >
      <div className="left_side">
        <div className="render_count">{renderCount}</div>
        <div className="device_name">{Data.name.get()}</div>
        <div className="badges_contianer">
          <Button
            name={Data.location.get()}
            color={"#216E4E"}
            bgShade
            fontWeight={"600"}
            borderRadius={2}
            LeftIcon={LocationIcon}
            width="100px"
            style={{ margin: "0px" }}
            readOnly
          />
          <Button
            name={"Camera : " + Data.camera_count.get()}
            color={"#004B91"}
            bgShade
            fontWeight={"600"}
            borderRadius={2}
            LeftIcon={CameraIcon}
            width="100px"
            style={{ margin: "0px" }}
            readOnly
          />
          <Button
            name={"No. of Licenses : " + Data.licenses.get()}
            color={"#733FB5"}
            bgShade
            fontWeight={"600"}
            borderRadius={2}
            LeftIcon={DocIcon}
            width="100px"
            style={{ margin: "0px" }}
            readOnly
          />
        </div>
        <div className="card_footer">
          <div className="card_footer_title">License Details</div>
          <div className="card_footer_items">
            {/* { (Data.license_details).map((item) => (
              <Button
                name={item + ":" + Data.license_details[item].get()}
                monoChrome
                border
                fontWeight={"600"}
                borderWeight={"2px"}
                borderColor={"#e2e4e9"}
                borderRadius="1"
                width="100px"
                LeftIcon={DocIcon}
                style={{ margin: "0px" }}
                key={Data.id.get() + item}
                readOnly
              />
            ))} */}
            <For each={Data.license_details}>
              {(item) => (
                <Button
                  name={item.type.get() + ":" + item.value.get()}
                  monoChrome
                  border
                  fontWeight={"600"}
                  borderWeight={"2px"}
                  borderColor={"#e2e4e9"}
                  borderRadius="1"
                  width="100px"
                  LeftIcon={DocIcon}
                  style={{ margin: "0px", padding: "0px 2px" }}
                  key={item.id.get()}
                  readOnly
                />
              )}
            </For>
          </div>
        </div>
      </div>
      <div className="right_side">
        {/* <Reactive.input
          $type="checkbox"
          $value={Data.isChecked}
          $onChange={(e) => {
            Data.isChecked.set((prev) => !prev);
            // Data.isChecked.get();
            console.log(Data.isChecked.get(), ">>>>>>>>>>>>");
          }}
        /> */}
        {/* <Show if={Data?.isChecked} else={() => <div>⬜</div>}>
          {() => <div>✅</div>}
        </Show> */}
        <Memo>{() => isSelected.get()}</Memo>

        {/* <Memo>
          {() => (
            <Button
              name={Data?.isChecked?.get() ? "✅" : "⬜"}
              border
              width="10px"
              style={{ margin: "0px" }}
              readOnly
            />
          )}
        </Memo> */}
      </div>
    </div>
  );
};

const Button2 = ({
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
  disabled = false,
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
  // const { classList } = useObservable({ classList: "button" });
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
  // console.log(isBtnDisabled.get(), "isBtnDisabled");
  // if (isBtnDisabled.get()) {
  //   // classList.set((p) => p + " disabled ");
  //   console.log("loggggggggggggggg");
  // }
  // return <button className={classList.get()}>Anand{renderCount}</button>;

  // useEffect(() => {
  //   console.log("XXXXXXXXXX");
  // }, [isBtnDisabled.get()]);
  // const isSelected = useComputed(() =>
  //   isBtnDisabled.get() ? "button" : "button disabled"
  // );

  const getClassNames = useComputed(() => {
    const classString =
      typeof extraClassName === "object"
        ? extraClassName.get()
        : extraClassName;

    return classString;
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

  // console.log(extraClassName.get(), "className");

  // useComputed(()=>{

  // })

  return (
    <Computed>
      {() => (
        <Reactive.button
          $disabled={isDisabled.get()}
          $className={"button " + getClassNames.get()}
          // $className={() => classList.get()}
          // $className={() =>
          //   !isBtnDisabled.get() ? "button " : " button disabled "
          // }
        >
          {name.get()}
          {/* <Memo>{() => btnName.get()}</Memo> */}
          {renderCount}
        </Reactive.button>
      )}
    </Computed>
  );
};
const X = (props) => (
  <svg
    width={props?.width ?? 16}
    height={props?.height ?? 16}
    viewBox="0 0 38.4 38.4"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="m15.946 19.718-9.051 9.051 3.771 3.771 9.051-9.051 9.051 9.051 3.771-3.771-9.051-9.051 9.051-9.051-3.771-3.771-9.05 9.05-9.051-9.051-3.772 3.772z" />
  </svg>
);
