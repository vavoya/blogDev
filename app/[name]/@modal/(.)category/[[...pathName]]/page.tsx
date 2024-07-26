
import styles from "../../.component/pageList.module.css";
import {usePathname, useSearchParams} from "next/navigation";
import {useEffect} from "react";

function Page({pathName, searchParams}: {pathName: string; searchParams: {}}) {
    //const params = useSearchParams()
    console.log('asd',searchParams,'dasdasd', pathName);

    // param과 pathname을 통해 적합한 페이지 목록을 가져옴
    // 또한 페이지네이션 번호하고


    return (
        <div className={styles.pageListBody}>
            <div className={styles.card}>
                <div>
                </div>
                <div>
                    <span>Next.js 14 요약하기</span>
                    <span>2024.02.04</span>
                    <span>~/FrontEnd/Next</span>
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
                    <span>~/FrontEnd/Next</span>
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
                    <span>~/React/FrontEnd</span>
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
                    <span>~/React/FrontEnd</span>
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
                    <span>~/React/FrontEnd</span>
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
    )
}

export default Page;