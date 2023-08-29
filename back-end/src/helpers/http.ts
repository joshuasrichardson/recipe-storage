import { Response } from "express";

export const handleRequest = async (
  processRequest: () => Promise<any>,
  response: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    return response.send(await processRequest());
  } catch (error) {
    console.log(error);
    return response.sendStatus(500);
  }
};

export default handleRequest;
