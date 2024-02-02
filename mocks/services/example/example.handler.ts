import { http, HttpResponse } from "msw";
import { exampleMock } from "./example.mock";

const endpointBaseURL = "example";

const exampleHandler = [
  http.get(`${endpointBaseURL}/example`, () => {
    return HttpResponse.json(exampleMock);
  }),
];

export default exampleHandler;
