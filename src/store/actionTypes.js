import { createAction } from "@reduxjs/toolkit";

export const taskUpdated = "task/updated";
export const taskDeleted = "task/deleted";
export const taskRequested = createAction("task/taskRequested");
