import Header from "@components/Header";
import { useEffect, useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState("pomodoro");
  const [active, setActive] = useState(false);
  const [time, setTime] = useState({
    min: 25,
    sec: 0,
  });
  const onTabClickHandler = (tab) => {
    let newTime = {};
    if (tab === "pomodoro") {
      newTime = {
        min: 25,
        sec: 0,
      };
    } else if (tab === "short_break") {
      newTime = {
        min: 5,
        sec: 0,
      };
    } else {
      newTime = {
        min: 15,
        sec: 0,
      };
    }
    setActiveTab(tab);
    setTime(newTime);
    setActive(false);
  };
  const getClassName = (tabName) => {
    return activeTab === tabName ? "tab tab-active" : "tab";
  };

  const onStartTimer = () => {
    setActive(true);
  };
  const onStopTimer = () => {
    setActive(false);
  };
  useEffect(() => {
    let interval = null;
    if (active) {
      interval = setInterval(() => {
        if (time.sec === 0) {
          setTime({ min: time.min - 1, sec: 59 });
        } else if (time.min === 0 && time.min ===0) {
          clearInterval(interval);
          setActive(false);
        } else {
          setTime({ ...time, sec: time.sec - 1 });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  },[active, time]);
  return (
    <>
      <Header />
      <div className="flex justify-center items-center bg-white bg-opacity-10">
        <div>
          <div className="tabs tabs-boxed mt-3">
            <a
              className={getClassName("pomodoro")}
              onClick={() => onTabClickHandler("pomodoro")}
            >
              Pomodoro
            </a>
            <a
              className={getClassName("short_break")}
              onClick={() => onTabClickHandler("short_break")}
            >
              Short Break
            </a>
            <a
              className={getClassName("long_break")}
              onClick={() => onTabClickHandler("long_break")}
            >
              Long Break
            </a>
          </div>
          <div className="grid grid-flow-col gap-5 text-center auto-cols-max mt-3">
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-8xl">
                <span style={{ "--value": time.min }}></span>
              </span>
              min
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-8xl">
                <span style={{ "--value": time.sec }}></span>
              </span>
              sec
            </div>
          </div>
          <div className="flex justify-center items-center mt-3">
            <button
              className="btn btn-primary p-2"
              onClick={() => onStartTimer()}
              disabled={active}
            >
              Start
            </button>
            <button
              className="btn btn-secondary p-2"
              onClick={() => onStopTimer()}
              disabled={!active}
            >
              Stop
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
