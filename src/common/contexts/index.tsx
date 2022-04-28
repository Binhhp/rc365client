import React from 'react';
import { ValidatorJsonFile } from 'src/common/functions/FieldValidate';

export function createCtx<A>(defaultValue: A) {
   type UpdateType = React.Dispatch<
     React.SetStateAction<typeof defaultValue>
   >;
   const defaultUpdate: UpdateType = () => defaultValue;
   const ctx = React.createContext({
     state: defaultValue,
     update: defaultUpdate,
   });
   function Provider(props: React.PropsWithChildren<{}>) {
     const [state, update] = React.useState(defaultValue);
     return <ctx.Provider value={{ state, update }} {...props} />;
   }
   return [ctx, Provider] as const; 
}
export const [ctx, ValidatorJsonProvider] = createCtx(new ValidatorJsonFile());
export const ValidatorJsonContext = ctx;
