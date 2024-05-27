import styles from "@/app/[name]/@modal/(.)category/[[...pathName]]/category.module.css";
import {Modal} from "@/app/[name]/@modal/modal";


export default function Page() {

    return (
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
    )
}