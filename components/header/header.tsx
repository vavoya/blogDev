
import Link from "next/link";
import styles from "./header.module.css"
import {auth, signOut} from "@/auth";
import SvgSLoGHeader from "@/components/svg/SL";


interface HeaderProps {
    blogSlug?: string;
    blogName?: string;
    slug1?: string;
    slug2?: string
}

export default async function Header({blogSlug, blogName, slug1, slug2}: HeaderProps) {

    // 경로가 바뀌면 이게 음... 이것도 최적화를 고민해보자
    const session = await auth();
    const managementList = ['folder', 'tag', 'series', 'post']
    const statisticsList = ['test']


    return (
        <header className={styles.container}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <Link href={'/'}>
                        <SvgSLoGHeader/>
                    </Link>
                </div>
                {
                    blogSlug &&
                    <div className={styles.blogHome}>
                        <Link href={'/' + blogSlug}>
                            <span>{`${blogName}`}</span>
                        </Link>
                    </div>
                }
                <div className={styles.option}>
                    {
                        session?.registrationState == true ?
                            <form
                                action={async () => {
                                    "use server"
                                    await signOut({redirectTo: '/'})
                                }}
                            >
                                <button type={'submit'}>
                                    로그 아웃
                                </button>
                            </form> :
                            <Link href={`/login`}>
                                로그인
                            </Link>
                    }
                </div>
            </div>
            {
                slug1 &&
                <div className={styles.dashboard}>
                    <Link href={"/dashboard/folder"} className={`${styles.management} ${managementList.includes(slug2 ?? "") ? styles.current : ""}`}>
                        <span>관리</span>
                    </Link>
                    <Link href={"/dashboard/tag"} className={`${styles.statistics} ${statisticsList.includes(slug2 ?? "") ? styles.current : ""}`}>
                        <span>통계</span>
                    </Link>
                </div>
            }
        </header>
    )
}
