import * as React from "react";
import { IAttributeList } from "./IAttributeList";
export type StaticToReactElementRecursor = (el: Node) => Promise<React.ReactNode>;
declare const _default: (el: Element, recursor: StaticToReactElementRecursor) => Promise<React.DOMElement<IAttributeList, Element>>;
export default _default;
