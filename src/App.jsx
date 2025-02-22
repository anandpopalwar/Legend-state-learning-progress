import {
  For,
  Memo,
  observer,
  Show,
  useComputed,
  useObservable,
  useObserve,
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
import { observable } from "@legendapp/state";
const { isModalOpen, devices_data } = observable({
  isModalOpen: false,
  devices_data: [...backend_data.devices],
  // totalPrize: 0,
  // isBtnDisabled: false,
});

const closeFunction = () => {
  isModalOpen.set(false);
};

const App = () => {
  const renderCount = ++useRef(0).current;

  const { totalPrize } = useObservable({
    totalPrize: 0,
  });

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

  return (
    <div
      className="main_app_container"
      onClick={() => {
        // isBtnDisabled.toggle();
      }}
    >
      {/* {console.log(totalPrize.get(), "totalPrize")} */}
      <div>{totalPrize.get()}</div>
      {/* {console.log(totalPrize.get(), "totalPrize")} */}
      <div className="">{renderCount}</div>
      <button
        onClick={() => {
          isModalOpen.set(true);
        }}
      >
        add Devices
      </button>
      {/* <Button2 isBtnDisabled={isBtnDisabled} key={"id"} /> */}

      <Show if={isModalOpen}>{() => <Modal totalPrize={totalPrize} />}</Show>
    </div>
  );
};

const Modal = ({ totalPrize }) => {
  const renderCount = ++useRef(0).current;

  // const totalValue = useComputed(() => totalPrize.get() + "");
  return (
    <Reactive.div className="modal_wrapper">
      {console.log(totalPrize.get(), "totalValue")}
      <Reactive.div className="render_count">{renderCount}</Reactive.div>
      <Reactive.div
        className="modal_container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Reactive.div className="modal_header">
          <Reactive.div className="modal_header_title">
            Add To Devices
          </Reactive.div>
          <Reactive.div
            className="close_button"
            onClick={(e) => {
              e.stopPropagation();
              closeFunction();
            }}
          >
            X
          </Reactive.div>
        </Reactive.div>
        <Reactive.div className="modal_body">
          {/* <Card Data={devices_data[0]} key={devices_data[0].name.get()} /> */}
          <For each={devices_data}>
            {(item) => (
              <Card Data={item} key={item.id.get()} totalPrize={totalPrize} />
            )}
          </For>
        </Reactive.div>
        <Reactive.div className="modal_footer">
          <Reactive.div className="total">
            {/* SubTotal () : <Memo>{() => totalPrize.get()} </Memo> */}
            SubTotal () : {totalPrize.get()}
          </Reactive.div>
          <Reactive.div className="modal_footer_btns_container">
            <SolidButton
              name={"Dismiss"}
              type={"slatewhite"}
              width="150px"
              size="md"
              id={"dismiss"}
              key={"dismiss"}
              borderRadius={"2"}
              style={{ margin: "0px", padding: ".2vh 1vw" }}
            />
            <SolidButton
              disabled={totalPrize.get() === 0}
              name={"Buy Now"}
              width="150px"
              style={{ margin: "0px", padding: ".2vh 1vw" }}
              borderRadius={"2"}
              type={"solidblue"}
              size="md"
              id={"buy_now"}
              key={"buy_now"}
            />
          </Reactive.div>
        </Reactive.div>
      </Reactive.div>
    </Reactive.div>
  );
};

export default App;

const Card = ({ Data, totalPrize }) => {
  const renderCount = ++useRef(0).current;

  // console.log(Data.get());
  // console.log(Data.name.get(), Data.isChecked.get(), "--------");
  return (
    <Reactive.div
      className="card_container"
      onClick={() => {
        Data.isChecked.set((prev) => !prev);
        console.log(Data.name.get(), Data.isChecked.get(), ">>>>>>>>>>>>");

        Data.isChecked.get()
          ? totalPrize.set((prev) => prev + Data.price.get())
          : totalPrize.set((prev) => prev - Data.price.get());
      }}
    >
      <Reactive.div className="left_side">
        <Reactive.div className="render_count">{renderCount}</Reactive.div>
        <Reactive.div className="device_name">{Data.name.get()}</Reactive.div>
        <Reactive.div className="badges_contianer">
          <Button
            name={Data.location.get()}
            color={"#216E4E"}
            bgShade
            fontWeight={"600"}
            borderRadius={2}
            LeftIcon={LocationIcon}
            width="100px"
            style={{ margin: "0px" }}
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
          />
        </Reactive.div>
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
      </Reactive.div>
      <Reactive.div className="right_side">
        {/* <Reactive.input
          $type="checkbox"
          $value={Data.isChecked}
          $onChange={(e) => {
            Data.isChecked.set((prev) => !prev);
            // Data.isChecked.get();
            console.log(Data.isChecked.get(), ">>>>>>>>>>>>");
          }}
        /> */}
        <Show if={Data?.isChecked} else={() => <div>⬜</div>}>
          {() => <div>✅</div>}
        </Show>
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
      </Reactive.div>
    </Reactive.div>
  );
};

const Button2 = ({ isBtnDisabled }) => {
  // const { classList } = useObservable({ classList: "button" });
  const renderCount = ++useRef(0).current;
  console.log(isBtnDisabled.get(), "isBtnDisabled");
  // if (isBtnDisabled.get()) {
  //   // classList.set((p) => p + " disabled ");
  //   console.log("loggggggggggggggg");
  // }
  // return <button className={classList.get()}>Anand{renderCount}</button>;

  // useEffect(() => {
  //   console.log("XXXXXXXXXX");
  // }, [isBtnDisabled.get()]);
  const isSelected = useComputed(() =>
    isBtnDisabled.get() ? "button" : "button disabled"
  );

  console.log(isSelected.get(), "isSelected");
  return (
    <Reactive.button
      $className={() => isSelected.get()}
      // $className={() => classList.get()}
      // $className={() =>
      //   !isBtnDisabled.get() ? "button " : " button disabled "
      // }
    >
      Anand{renderCount}
    </Reactive.button>
  );
};
