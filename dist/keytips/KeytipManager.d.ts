import { IKeytipProps } from "../@uifabric/utilities";
export interface IUniqueKeytip {
  uniqueID: string;
  keytip: IKeytipProps;
}
/**
 * This class is responsible for handling registering, updating, and unregistering of keytips
 */
export declare class KeytipManager {
  private static _instance;
  keytips: {
    [key: string]: IUniqueKeytip;
  };
  persistedKeytips: {
    [key: string]: IUniqueKeytip;
  };
  sequenceMapping: {
    [key: string]: IKeytipProps;
  };
  inKeytipMode: boolean;
  shouldEnterKeytipMode: boolean;
  delayUpdatingKeytipChange: boolean;
  /**
   * Static function to get singleton KeytipManager instance
   *
   * @returns {KeytipManager} Singleton KeytipManager instance
   */
  static getInstance(): KeytipManager;
  /**
   * Initialization code to set set parameters to define
   * how the KeytipManager handles keytip data.
   *
   * @param delayUpdatingKeytipChange - T/F if we should delay notifiying keytip subscribers
   * of keytip changes
   */
  init(delayUpdatingKeytipChange: boolean): void;
  /**
   * Registers a keytip
   *
   * @param keytipProps - Keytip to register
   * @param persisted - T/F if this keytip should be persisted, default is false
   * @returns {string} Unique ID for this keytip
   */
  register(keytipProps: IKeytipProps, persisted?: boolean): string;
  /**
   * Update a keytip
   *
   * @param keytipProps - Keytip to update
   * @param uniqueID - Unique ID of this keytip
   */
  update(keytipProps: IKeytipProps, uniqueID: string): void;
  /**
   * Unregisters a keytip
   *
   * @param keytipToRemove - IKeytipProps of the keytip to remove
   * @param uniqueID - Unique ID of this keytip
   * @param persisted - T/F if this keytip should be persisted, default is false
   */
  unregister(
    keytipToRemove: IKeytipProps,
    uniqueID: string,
    persisted?: boolean
  ): void;
  /**
   * Manual call to enter keytip mode
   */
  enterKeytipMode(): void;
  /**
   * Manual call to exit keytip mode
   */
  exitKeytipMode(): void;
  /**
   * Gets all IKeytipProps from this.keytips
   *
   * @returns {IKeytipProps[]} All keytips stored in the manager
   */
  getKeytips(): IKeytipProps[];
  /**
   * Adds the overflowSetSequence to the keytipProps if its parent keytip also has it
   *
   * @param keytipProps - Keytip props to add overflowSetSequence to if necessary
   * @returns {IKeytipProps} - Modified keytip props, if needed to be modified
   */
  addParentOverflow(keytipProps: IKeytipProps): IKeytipProps;
  /**
   * Public function to bind for overflow items that have a submenu
   *
   * @param overflowButtonSequences
   * @param keytipSequences
   */
  menuExecute(
    overflowButtonSequences: string[],
    keytipSequences: string[]
  ): void;
  /**
   * Creates an IUniqueKeytip object
   *
   * @param keytipProps - IKeytipProps
   * @param uniqueID - Unique ID, will default to the next unique ID if not passed
   * @returns {IUniqueKeytip} IUniqueKeytip object
   */
  private _getUniqueKtp;
}
