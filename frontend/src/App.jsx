import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/*User Layout  */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />}></Route>
        </Route>
        <Route>{/*Admin Layout  */}</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
