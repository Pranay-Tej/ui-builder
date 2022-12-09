import { createContext, FC, PropsWithChildren, useReducer } from "react";

const componentStateReducer = (state: any, action: any) => {
  return { ...state, [action.id]: action.state };
};
const StateContext = createContext({});

export const StateContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [componentState, dispatch] = useReducer(componentStateReducer, {});
  return (
    <StateContext.Provider value={{ componentState, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
