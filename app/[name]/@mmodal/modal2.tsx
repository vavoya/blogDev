'use client'

import styles from "./modal.module.css"
import SvgUndo from "@/components/svg/Undo";
import SvgClose from "@/components/svg/Close";
import bg from '@/public/svg/hoverEffect58.svg'

export default function Modal() {


    return (
        <Backdrop>
            <ModalContainer>
                <div className={styles.modalNavSection}>
                    <div className={styles.modalNavHeader}>
                        <span>
                            목록
                        </span>
                        <button onClick={e => {

                        }}>
                            <SvgUndo/>
                            <span>
                                이전
                            </span>
                        </button>
                    </div>
                    <div className={styles.modalNavBody}>
                        <button className={styles.modalNavItem}>
                            <span>
                                FrontEnd
                            </span>
                            <span>
                                56
                            </span>
                            <div style={{
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                right: '0',
                                bottom: '0',
                                backgroundImage: `url(${bg.src})`,
                                width: '100%',
                                height: '100%',
                            }}/>

                        </button>
                    </div>
                </div>
                <div className={styles.modalCardSection}>
                    <div className={styles.modalCardHeader}>
                        <span>
                            ~/FrontEnd/React
                        </span>
                        <span>
                            27 개의 글 | 5 페이지
                        </span>
                    </div>
                    <div className={styles.modalCardBody}>

                    </div>
                    <div className={styles.modalCardFooter}>

                    </div>
                </div>
                <div style={{
                    width: '30px',
                    height: '30px',
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <SvgClose/>
                </div>
            </ModalContainer>
        </Backdrop>

    )
}


function Backdrop({children}: { children: React.ReactNode }) {

    return (
        <div className={styles.backdrop}>
            {children}
        </div>
    )
}

function ModalContainer({children}: {children: React.ReactNode}) {

    return (
        <div className={styles.modalContainer}>
            {children}
        </div>
    )
}