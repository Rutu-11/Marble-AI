declare module "*.svg" {
    const content: any;
    export default content;
}

declare module "Images" {
    import { ReactComponent as EditOnHover } from './StatusHover.svg';
    import { ReactComponent as Help } from "./Help.svg";
    import { ReactComponent as Trend } from "./Trend.svg";

    const Images: {
        EditOnHover: typeof EditOnHover;
        Help: typeof Help;
        Trend: typeof Trend;
    };

    export default Images;
}
