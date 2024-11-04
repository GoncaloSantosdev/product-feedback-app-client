import { Route, Routes } from "react-router-dom";
// Pages
import {
  EditFeedback,
  FeedbackDetail,
  LandingPage,
  NewFeedback,
  Roadmap,
  Suggestions,
} from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/suggestions" element={<Suggestions />} />
      <Route path="/feedback-detail/:feedbackId" element={<FeedbackDetail />} />
      <Route path="/new-feedback" element={<NewFeedback />} />
      <Route path="/edit-feedback/:feedbackId" element={<EditFeedback />} />
      <Route path="/roadmap" element={<Roadmap />} />
    </Routes>
  );
};

export default App;
