export enum Token {
    name = "token"
}

export interface JoyErrorItem {
    context: {
        key: string;
        label: string;
        value: string;
    };
    path: string[];
    type: string
}