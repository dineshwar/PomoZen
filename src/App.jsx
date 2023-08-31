import Header from "@components/Header";
import { useEffect, useState } from "react";
import { merge } from 'lodash';

function App() {
  const defaultFormData = {
    timer: {
      pomodoro: 25,
      short_break: 5,
      long_break: 15,
    },
    auto_start_break: true,
    auto_start_pomodoro: true,
    long_break_interval: 3,
  };
  const [activeTab, setActiveTab] = useState("pomodoro");
  const [active, setActive] = useState(false);
  const formData = JSON.parse(localStorage.getItem('pomodoro_settings'));
  const stateData = merge({}, defaultFormData, formData)
  const [form, setForm] = useState(stateData);
  const [time, setTime] = useState({
    min: form.timer.pomodoro,
    sec: 0,
  });
  const onTabClickHandler = (tab) => {
    let newTime = {};
    if (tab === "pomodoro") {
      newTime = {
        min: form.timer.pomodoro,
        sec: 0,
      };
    } else if (tab === "short_break") {
      newTime = {
        min: form.timer.short_break,
        sec: 0,
      };
    } else {
      newTime = {
        min: form.timer.long_break,
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
        if (time.min === 0 && time.sec === 0) {
          let totalSession = localStorage.getItem('total_session_completed') ?? 0;
          clearInterval(interval);
          let countSession = isNaN(parseInt(totalSession)) ? 1 : parseInt(totalSession)+1;
          localStorage.setItem('total_session_completed', countSession);
          if(activeTab === 'pomodoro') {
            if(form.auto_start_break) {
              if(countSession >= form.long_break_interval) {
                setTime({
                  min: form.timer.long_break,
                  sec: 0,
                });
                setActiveTab("long_break");
              } else {
                setTime({
                  min: form.timer.short_break,
                  sec: 0,
                });
                setActiveTab("short_break");
              }
            }
          } else if(form.auto_start_pomodoro) {
            if(activeTab === 'long_break') {
              localStorage.setItem('total_session_completed', 0);
            }
            setTime({
              min: form.timer.pomodoro,
              sec: 0,
            });
            setActiveTab("pomodoro");
          } else {
            setActive(false);
          }
        }else if (time.sec === 0) {
          setTime({ min: time.min - 1, sec: 59 });
        } else {
          setTime({ ...time, sec: time.sec - 1 });
        }
      }, 1000);
    }
    return () => {
      clearInterval(interval)};
  },[active, time, activeTab, form]);
  return (
    <>
      <Header form={form} setForm ={setForm} />
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
              className="btn btn-primary p-2 m-1"
              onClick={() => onStartTimer()}
              disabled={active}
            >
              Start
            </button>
            <button
              className="btn btn-secondary p-2 m-1"
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
