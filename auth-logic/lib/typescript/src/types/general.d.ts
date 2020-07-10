export declare type Fn<T, U> = (t: T) => U;
export declare type UnionKeys<T> = T[keyof T];
export declare type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;
export declare type AsStrings<T> = {
    [P in keyof T]: string;
};
export declare type ValueOf<T> = T[keyof T];
export declare type ActionType<TActions extends {
    [k: string]: any;
}> = ReturnType<ValueOf<TActions>>;
export declare type ArgumentsType<T extends (...args: any[]) => any> = T extends (...args: infer A) => any ? A : never;
export declare type FirstArgument<T> = T extends (arg1: infer U, ...args: any[]) => any ? U : any;
export declare type SecondArgument<T> = T extends (arg1: any, arg2: infer U, ...args: any[]) => any ? U : any;
export declare type ThirdArgument<T> = T extends (arg1: any, arg2: any, arg3: infer U, ...args: any[]) => any ? U : any;
