type IOptions = import("./IOptions").default;
type IRehydrator = import("./IRehydrator").default;
declare const rehydratableToReactElement: (el: Element, rehydrators: IRehydrator, options: IOptions) => Promise<React.ReactElement<any>>;
declare const rehydrateChildren: (el: Node, rehydrators: IRehydrator, options: IOptions) => Promise<import("react").ReactNode>;
declare const _default: (container: Element, rehydrators: IRehydrator, options: IOptions) => Promise<void>;
export default _default;
export { IRehydrator, rehydratableToReactElement, rehydrateChildren };
