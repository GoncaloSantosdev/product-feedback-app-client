import { Route, Routes } from "react-router-dom";
// Pages
import {
  EditFeedback,
  FeedbackDetail,
  NewFeedback,
  Roadmap,
  Suggestions,
} from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={"Landing Page"} />
      <Route path="/suggestions" element={<Suggestions />} />
      <Route path="/feedback-detail" element={<FeedbackDetail />} />
      <Route path="/new-feedback" element={<NewFeedback />} />
      <Route path="/edit-feebdack" element={<EditFeedback />} />
      <Route path="/roadmap" element={<Roadmap />} />
    </Routes>
  );
};

export default App;
