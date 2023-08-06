import Header from "@components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center">
        <div className="tabs tabs-boxed">
          <a className="tab tab-active">Pamodoro</a>
          <a className="tab">Short Break</a>
          <a className="tab">Long Break</a>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-8xl">
              <span style={{ "--value": 25 }}></span>
            </span>
            min
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-8xl">
              <span style={{ "--value": 0 }}></span>
            </span>
            sec
          </div>
        </div>
        </div>
    </>
  );
}

export default App;
