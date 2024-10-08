import {SVGProps} from "react";

/**
 * viewBox="0 0 18 17"
 */
export default function SvgUndo({
                                    width = "18",
                                    height = "17"
}: SVGProps<SVGSVGElement>) {

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 18 17"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4.5 16H15C16.1046 16 17 15.1046 17 14V7C17 5.89543 16.1046 5 15 5H2M2 5L6.5 1M2 5L6.5 9"
                stroke="rgb(var(--primary-color))"
                strokeWidth="2"
                strokeLinecap="round"/>
        </svg>

    )
}