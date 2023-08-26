import { useState } from "react";
import { merge } from 'lodash';

const MIN_IN_A_DAY = 1440;

const SettingsModal = () => {
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
  const formData = JSON.parse(localStorage.getItem('pomodoro_settings'));
  const stateData = merge({}, defaultFormData, formData)
  const [form, setForm] = useState(stateData);
  const timerInputHandler = (event) => {
    setForm((preVal) => {
      return {
        ...preVal,
        timer:{
          ...preVal.timer,
          [event.target.name]: (event.target.value) > MIN_IN_A_DAY ? MIN_IN_A_DAY : event.target.value
        }
      }
    })
  }
  const updateToggleHandler = (event) => {
    setForm((preVal) => {
      return {
        ...preVal,
        [event.target.name]: !preVal[event.target.name]
      }
    })
  }
  const inputNumberHandler = (event) => {
    setForm((preVal) => {
      return {
        ...preVal,
        [event.target.name]: event.target.value
      }
    })
  }
  const formSaveHandler = () => {
    localStorage.setItem('pomodoro_settings', JSON.stringify(form));
  }
  return (
    <dialog id="settings_modal" className="modal modal-top sm:modal-middle">
      <form method="dialog" className="modal-box" onSubmit={formSaveHandler}>
        <h3 className="font-bold text-lg">Settings</h3>
        <div>
          <p className="opacity-30">Timer (minutes)</p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="field1">Pomodoro</label>
              <input
                type="number"
                id="pomodoro"
                name="pomodoro"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Pomodoro"
                value={form.timer.pomodoro}
                onInput={timerInputHandler}
              />
            </div>
            <div>
              <label htmlFor="field2">Short Break</label>
              <input
                type="number"
                id="short_break"
                name="short_break"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Short Break"
                value={form.timer.short_break}
                onInput={timerInputHandler}
              />
            </div>
            <div>
              <label htmlFor="field3">Long Break</label>
              <input
                type="number"
                id="long_break"
                name="long_break"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Long Break"
                value={form.timer.long_break}
                onInput={timerInputHandler}
              />
            </div>
          </div>
          <div>
              <label htmlFor="field3">Auto Start Breaks</label>
              <input type="checkbox" name="auto_start_break" id="auto_start_break" className="toggle toggle-success" checked={form.auto_start_break} onChange={updateToggleHandler} />
            </div>
            <div>
              <label htmlFor="field3">Auto Start Pomodoro</label>
              <input type="checkbox" name="auto_start_pomodoro" id="auto_start_pomodoro" className="toggle toggle-success" checked={form.auto_start_pomodoro} onChange={updateToggleHandler} />
            </div>
            <div>
              <label htmlFor="field3">Long Break Interval</label>
              <input
                type="number"
                id="long_break_interval"
                name="long_break_interval"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={form.long_break_interval}
                onChange={inputNumberHandler}
              />
            </div>
        </div>
        <button className="btn  btn-primary top-2 m-1 p-3 float-right">Save</button>
      </form>
    </dialog>
  );
};

export default SettingsModal;
