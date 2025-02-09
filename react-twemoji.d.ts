declare module "react-twemoji" {
    import { ReactNode } from "react";

    interface TwemojiProps {
        children: ReactNode;
        options?: {
            className?: string;
            ext?: string;
            size?: string;
            base?: string;
            folder?: string;
            callback?: (icon: string, options: object) => string;
        };
    }

    const Twemoji: React.FC<TwemojiProps>;

    export default Twemoji;
}
