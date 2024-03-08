import Files from "./components/Files";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  return (
    <div className="flex flex-col gap-3 justify-center items-center mt-20">
      <ModeToggle />
      <Files />
    </div>
  );
}

export default App;
