import { Route, Routes } from "react-router-dom";
import BoardContainer from "./pages/BoardContainer";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<BoardContainer />} />
    </Routes>
  );
};

export default App;
