import styles from "@/components/header/header.module.css";
import Link from "next/link";
import SvgSLoGHeader from "@/components/svg/SL";
import {auth, signOut} from "@/auth";

interface CommonHeaderProps{
    blogSlug?: string,
    blogName?: string
}

export default async function CommonHeader({blogSlug, blogName}: CommonHeaderProps) {
    const session = await auth()


    return (
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
    )
}