declare const autoGroupStrings: (inputStrings: string[], { delimiter, delimiterRegExp, direction, caseSensitive, includeSingleElementMembers, }?: {
    delimiter?: string | undefined;
    delimiterRegExp?: RegExp | undefined;
    direction?: "ltr" | "rtl" | undefined;
    caseSensitive?: boolean | undefined;
    includeSingleElementMembers?: boolean | undefined;
}) => {
    common: string;
    members: number[];
}[] | [];
export default autoGroupStrings;
