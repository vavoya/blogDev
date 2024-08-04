import styles from "@/components/modal/common/modal.module.css";
import bg from "@/public/svg/hoverEffect.svg";
import React from "react";

export default function MoveBackgroundAnimation({width, height}: {width: number, height: number}) {

    return (
        <div className={styles.moveBackgroundAnimation}
             style={{
                 "--modalItme-svg-width": `${height}px`,
                 "--modalItem-animation-time": `${height / 35}s`,
                 backgroundSize: width < height ? "cover" : "contain",
                 backgroundImage: `url(${bg.src})`,
             } as React.CSSProperties}/>
    )
}