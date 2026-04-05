import * as React from "react";
export type CustomElementHandlerType = (el: Element) => Promise<React.ReactNode | false>;
declare const convert: (el: Node, customElementHandler: CustomElementHandlerType) => Promise<string | number | true | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null>;
export default convert;
