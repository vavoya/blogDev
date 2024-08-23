import {SVGProps} from "react";

/**
 * viewBox="0 0 15 15"
 */
export default function SvgAdd({
                                      width = "15",
                                      height = "15",
                                      strokeWidth = "2"
                                  }: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 15 15"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M15 7.5H7.5M0 7.5H7.5M7.5 7.5V0V15" stroke="rgb(var(--primary-color))" strokeWidth={strokeWidth}/>
        </svg>
    );
}
