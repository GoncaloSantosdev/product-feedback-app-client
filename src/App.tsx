import { Navigate, Route, Routes } from "react-router-dom";
// Pages
import {
  EditFeedback,
  FeedbackDetail,
  LandingPage,
  NewFeedback,
  Roadmap,
  Suggestions,
  NotFound,
} from "./pages";
// Clerk
import { SignedIn, SignedOut } from "@clerk/clerk-react";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/suggestions"
          element={
            <>
              <SignedIn>
                <Suggestions />
              </SignedIn>
              <SignedOut>
                <Navigate to={"/"} />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/feedback-detail/:feedbackId"
          element={
            <>
              <SignedIn>
                <FeedbackDetail />
              </SignedIn>
              <SignedOut>
                <Navigate to={"/"} />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/new-feedback"
          element={
            <>
              <SignedIn>
                <NewFeedback />
              </SignedIn>
              <SignedOut>
                <Navigate to={"/"} />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/edit-feedback/:feedbackId"
          element={
            <>
              <SignedIn>
                <EditFeedback />
              </SignedIn>
              <SignedOut>
                <Navigate to={"/"} />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/roadmap"
          element={
            <>
              <SignedIn>
                <Roadmap />
              </SignedIn>
              <SignedOut>
                <Navigate to={"/"} />
              </SignedOut>
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
