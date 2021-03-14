import toString from "lodash/toString";
import { DEV } from "../constants";

export const debug = (message, ...args) => {
  if (DEV) {
    console.log(message, toString(args));
  }
};
