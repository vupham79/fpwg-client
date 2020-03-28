/// <reference types="react" />
interface Props {
    className?: string;
    classes?: any;
    label?: string;
    defaultFont: string | undefined;
    onFontSelected?: (family: any) => void;
    buttonColor?: 'inherit' | 'default' | 'primary' | 'secondary' | undefined;
    buttonVariant?: 'text' | 'outlined' | 'contained' | undefined;
    placement?: 'bottom' | 'left' | 'right' | 'top' | 'bottom-end' | 'bottom-start' | 'left-end' | 'left-start' | 'right-end' | 'right-start' | 'top-end' | 'top-start' | undefined;
    searchable?: boolean;
}
declare const _default: import("react").ComponentType<Pick<Props, "label" | "className" | "onFontSelected" | "searchable" | "defaultFont" | "placement" | "buttonColor" | "buttonVariant"> & import("@material-ui/core/styles").StyledComponentProps<"root" | "pickerButton">>;
export default _default;
