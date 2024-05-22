'use client'

import {Modal} from "@/app/[name]/@modal/(.)category/modal";
import styles from "./category.module.css"

export default function Test() {
    console.log('모달?')




    return (
        <Modal>
            <div className={styles.catList}>
                <div className={styles.catListHead}>
                    <span>목록</span>
                    <button>
                        <div />
                        <span>이전</span>
                    </button>
                </div>
                <div className={styles.catListBody}>
                    <div>
                        <span>
                            FrontEnd
                        </span>
                    </div>
                    <div>
                        <span>
                            FrontEnd
                        </span>
                    </div>
                    <div>
                        <span>
                            FrontEnd
                        </span>
                    </div>
                    <div>
                        <span>
                            FrontEnd
                        </span>
                    </div>
                    <div>
                        <span>
                            FrontEnd
                        </span>
                    </div>
                    <div>
                        <span>
                            FrontEnd
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles.pageList}>
                <div className={styles.pageListHead}>
                    <span>
                        FrontEnd/React/FrontEnd/React/FrontEnd/React/
                    </span>
                    <div>
                        <span>27개의 글</span>
                        <div/>
                        <span>5 페이지</span>
                    </div>
                </div>
                <div className={styles.pageListBody}>
                    <div className={styles.card}>
                        <div>
                        </div>
                        <div>
                            <span>Next.js 14 요약하기</span>
                            <span>2024.02.04</span>
                        </div>
                        <div>
                            <div>
                                <div></div>
                                <span>999+</span>
                            </div>
                            <div>
                                <div></div>
                                <span>999+</span>
                            </div>
                            <div>
                                <div></div>
                                <span>999+</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div>
                        </div>
                        <div>
                            <span>Next.js 14 요약하기</span>
                            <span>2024.02.04</span>
                        </div>
                        <div>
                            <div>
                                <div></div>
                                <span>999+</span>
                            </div>
                            <div>
                                <div></div>
                                <span>999+</span>
                            </div>
                            <div>
                                <div></div>
                                <span>999+</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div>
                        </div>
                        <div>
                            <span>Next.js 14 요약하기</span>
                            <span>2024.02.04</span>
                        </div>
                        <div>
                            <div>
                                <div></div>
                                <span>999+</span>
                            </div>
                            <div>
                                <div></div>
                                <span>999+</span>
                            </div>
                            <div>
                                <div></div>
                                <span>999+</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div>
                        </div>
                        <div>
                            <span>Next.js 14 요약하기</span>
                            <span>2024.02.04</span>
                        </div>
                        <div>
                            <div>
                                <div></div>
                                <span>999+</span>
                            </div>
                            <div>
                                <div></div>
                                <span>999+</span>
                            </div>
                            <div>
                                <div></div>
                                <span>999+</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div>
                        </div>
                        <div>
                            <span>Next.js 14 요약하기</span>
                            <span>2024.02.04</span>
                        </div>
                        <div>
                            <div>
                                <div></div>
                                <span>999+</span>
                            </div>
                            <div>
                                <div></div>
                                <span>999+</span>
                            </div>
                            <div>
                                <div></div>
                                <span>999+</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </Modal>
    )
}