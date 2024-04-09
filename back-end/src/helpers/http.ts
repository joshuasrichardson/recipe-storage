import { Response } from "express";

export const handleRequest = async (
  processRequest: () => Promise<any>,
  response: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const result = await processRequest();
    if (process.env.NODE_ENV !== "production") console.log(result);
    return response.send(result);
  } catch (error) {
    console.log(error);
    return response.sendStatus(500);
  }
};

export default handleRequest;
