import HttpClient from "@/src/lib/http-client";
import {
  GeneratePracticeRequest,
  GeneratePracticeResponse,
  SubmitPracticeRequest,
  PracticeResult,
} from "@/src/type";

const BASE_PATH = "/calculation-practices";

export const generatePractice = (request: GeneratePracticeRequest) =>
  HttpClient.post<GeneratePracticeResponse>(`${BASE_PATH}/generate`, request);

export const submitPractice = (request: SubmitPracticeRequest) =>
  HttpClient.post<PracticeResult>(`${BASE_PATH}/submit`, request);

export const getPracticeDetail = (practiceId: string) =>
  HttpClient.get<PracticeResult>(`${BASE_PATH}/${practiceId}`);
