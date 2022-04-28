export interface ICloneable<T> {
  Clone(): T;
  ToDto?: () => any;
}
