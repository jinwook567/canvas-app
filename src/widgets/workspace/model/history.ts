import { Workspace } from './core';

export type History = {
  ws: Workspace[];
  counter: number;
};

export const hasNext = (history: History) => {
  return history.ws.length - 2 >= history.counter;
};

export const hasBefore = (history: History) => {
  return history.counter > 0;
};

export const insertHistory = (history: History, ws: Workspace) => {
  return {
    ws: [...history.ws.slice(0, history.counter + 1), ws],
    counter: history.counter + 1,
  };
};

export const getWorkspace = (history: History) => {
  return history.ws[history.counter];
};

export const before = (history: History) => {
  return {
    ...history,
    counter: history.counter - 1,
  };
};

export const next = (history: History) => {
  return {
    ...history,
    counter: history.counter + 1,
  };
};
