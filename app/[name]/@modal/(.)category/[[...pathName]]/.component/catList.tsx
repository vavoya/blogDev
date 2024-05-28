import styles from "../category.module.css"
import Link from "next/link";


export default function CatList() {

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

function Cat() {
    return (
        <Link>
            <div>
                <span>
                    FrontEnd
                </span>
            </div>
        </Link>
    )
}