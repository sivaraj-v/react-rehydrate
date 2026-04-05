import * as React from "react";
import { CustomElementHandlerType } from "./convert";
declare const rehydrateChildren: (node: Node, customHandler: CustomElementHandlerType) => Promise<React.ReactNode>;
export default rehydrateChildren;
