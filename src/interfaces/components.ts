import { ReactNode } from "react";
import { Locales } from "./global";

export interface ChildrenProps {
    readonly children: ReactNode;
  }
  
  export interface FunctionChildrenProps<T extends Record<string, unknown>> {
    readonly children: (data: T) => ReactNode;
  }
  
  export interface LocaleProps {
    readonly locale: Locales;
  }