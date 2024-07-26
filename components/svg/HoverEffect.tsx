import {SVGProps} from "react";

/**
 * viewBox="0 0 46 38"
 */
export default function HoverEffect({
                                        width = "46",
                                        height = "38",
                                        opacity = "0.1"
                                    }: SVGProps<SVGSVGElement>) {

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 46 38"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                opacity={opacity}
                d="M18.7364 37.5H0.948557L26.2936 0.5H44.0814L18.7364 37.5Z"
                fill="black"
                stroke="black"
                strokeLinecap="round"/>
        </svg>
    )
}

