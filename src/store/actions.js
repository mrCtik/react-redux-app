import * as actionTypes from "./actionTypes";

export function taskCompleted(id) {
  return {
    type: actionTypes.taskUpdated,
    payload: { id, completed: true },
  };
}
export function titleChanged(id) {
  return {
    type: actionTypes.taskUpdated,
    payload: { id, title: `New title for ${id}` },
  };
}
export function taskDeleted(id) {
  return {
    type: actionTypes.taskDeleted,
    payload: { id },
  };
}
export function taskAdded() {
  return {
    type: actionTypes.taskRequested,
    payload: { id: 2, title: "New Task", completed: false },
  };
}
