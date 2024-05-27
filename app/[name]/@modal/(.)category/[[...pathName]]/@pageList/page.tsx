'use client'

import styles from "./category.module.css"
import Link from "next/link";
import {useEffect} from "react";

function Page() {



    return (
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
                    222
                </div>
            </div>
    )
}

export default Page;