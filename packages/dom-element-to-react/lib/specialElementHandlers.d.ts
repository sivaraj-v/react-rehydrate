import { IAttributeList } from "./IAttributeList";
interface ISpecialElementHandlers {
    [propName: string]: (el: Element, attributes: IAttributeList) => IAttributeList;
}
declare const specialElementHandlers: ISpecialElementHandlers;
export default specialElementHandlers;
