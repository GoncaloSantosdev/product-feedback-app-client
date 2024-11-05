import axios from "axios";
import { FeedbackData } from "../../validation/feedbackFormValidation";
import { FeedbackItem } from "../../types";

const BASE_URL = "http://localhost:5000/api/feedbacks";

export const createFeedbackAPI = async (feedbackData: FeedbackData) => {
  const response = await axios.post(`${BASE_URL}/create`, feedbackData);
  return response.data;
};

export const getFeedbacksAPI = async (): Promise<FeedbackItem[]> => {
  const response = await axios.get(BASE_URL);
  return response.data.feedbacks;
};

export const getFeedback = async (
  feedbackId: string
): Promise<FeedbackItem> => {
  const response = await axios.get(`${BASE_URL}/${feedbackId}`);
  return response.data.feedback;
};
