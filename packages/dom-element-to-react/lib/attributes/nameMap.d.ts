/**
 * * Keys should always be lowercase
 * * Don't include any properties where key === value. These will be handled automatically.
 */
interface INameMap {
    [propName: string]: string;
}
declare const nameMap: INameMap;
export default nameMap;
