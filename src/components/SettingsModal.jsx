const SettingsModal = () => {
  return (
    <dialog id="settings_modal" className="modal modal-top sm:modal-middle">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Settings</h3>
        <div>
          <p className="opacity-30">Timer (minutes)</p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="field1">Pamodoro</label>
              <input
                type="number"
                id="field1"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Pamodoro"
              />
            </div>
            <div>
              <label htmlFor="field2">Short Break</label>
              <input
                type="number"
                id="field2"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Short Break"
              />
            </div>
            <div>
              <label htmlFor="field3">Long Break</label>
              <input
                type="number"
                id="field3"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Long Break"
              />
            </div>
          </div>
        </div>
      </form>
    </dialog>
  );
};

export default SettingsModal;
