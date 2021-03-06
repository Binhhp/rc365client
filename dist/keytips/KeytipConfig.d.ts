import { IKeytipProps } from "../@uifabric/utilities";
export interface IKeytipConfig {
  keytips: IKeytipConfigItem[];
}
export interface IKeytipConfigItem {
  /**
   * Key Sequence for this keytip only
   * If sequence is not defined it will be derived from the content string
   */
  sequence?: string;
  /**
   * Content for the keytip
   */
  content: string;
  /**
   * Identifier for the keytip, to be used to access in the configMap
   */
  id: string;
  /**
   * Optional props in IKeytipProps
   */
  optionalProps?: Partial<IKeytipProps>;
  /**
   * Children keytips of this keytip
   */
  children?: IKeytipConfigItem[];
}
export interface IKeytipConfigMap {
  [id: string]: IKeytipProps;
}
/**
 * Builds a map of ID -> IKeytipProps
 *
 * @param config - IKeytipConfig object
 * @returns {IKeytipConfigMap} - Config map
 */
export declare function buildKeytipConfigMap(
  config: IKeytipConfig
): IKeytipConfigMap;
/**
 * Constructs a keytip from an IKeytipConfigItem and puts it in the configMap
 *
 * @param configMap - IKeytipConfigMap to store the keytip in
 * @param parentSequence - string of the parent keytip
 * @param keytip - IKeytipConfigItem data
 */
export declare function constructKeytip(
  configMap: IKeytipConfigMap,
  parentSequence: string[],
  keytip: IKeytipConfigItem
): void;
