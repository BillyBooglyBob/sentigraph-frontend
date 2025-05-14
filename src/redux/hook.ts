import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Better typing for use throughout your app
// compared to the default `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
  useSelector(selector);
