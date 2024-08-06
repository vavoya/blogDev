import {SVGProps} from "react";

/**
 * viewBox="0 0 28 23"
 */
export default function SvgFolder({
                                      width = "28",
                                      height = "23"
                                  }: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width={width}  // 사용자가 전달한 width 사용
            height={height} // 사용자가 전달한 height 사용
            viewBox="0 0 28 23"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M2 20.6667V2H10.6667L13.3333 4.66667H26L25.8775 20.6667H2Z"
                stroke="black"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"/>
        </svg>
    );
}
