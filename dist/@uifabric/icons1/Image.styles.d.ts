export function getStyles(props: any): {
    root: any[];
    image: (string | false | {
        display: string;
        opacity: number;
    } | (string | {
        opacity: number;
    })[] | (string | false | {
        position: string;
        left: string;
        top: string;
        transform: string;
    } | {
        width: string;
        height: string;
    } | {
        width: string;
        height: string;
        objectFit: string;
    })[] | (string | false | {
        position: string;
        left: string;
        top: string;
        transform: string;
    } | {
        maxWidth: string;
        maxHeight?: undefined;
    } | {
        maxHeight: string;
        maxWidth?: undefined;
    })[])[];
};
