// import mongoose from "mongoose";
import {  TErrorMessages, TGenericErrorResponse } from "../interface/error";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const regex = /{ name: "([^"]+)" }/;
  const match = err.message.match(regex);

  const extractedMessage = match && match[1];
  const errorMessages: TErrorMessages = [
    { path: "", message: `${extractedMessage} is already exist` },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: " Duplicate data",
    errorMessages,
  };
};
export default handleDuplicateError;
