import { For, Show, useObservable } from "@legendapp/state/react";
import "./App.scss";
import backend_data from "./device_data.json";
import { useRef } from "react";
// console.log(device_data);

function App() {
  const renderCount = ++useRef(0).current;
  const { isModalOpen, devices_data } = useObservable({
    isModalOpen: false,
    devices_data: [...backend_data.devices],
  });
  return (
    <div className="main_app_container">
      {renderCount}
      <button
        onClick={() => {
          isModalOpen.set(true);
        }}
      >
        add Devices
      </button>
      <Show if={isModalOpen}>
        <div
          className="modal_wrapper"
          onClick={() => {
            isModalOpen.set(false);
          }}
        >
          <div
            className="modal_container"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <For each={devices_data}>
              {(item) => <Card Data={item} key={item.name.get()} />}
            </For>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default App;

const Card = ({ Data }) => {
  const renderCount = ++useRef(0).current;

  console.log(Data.get());
  return <div>{renderCount}Card</div>;
};
