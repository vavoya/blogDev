'use server'

import styles from "./page.module.css"
import SvgSLoG from "@/components/svg/S-Log";
import Link from "next/link";
import SvgApple from "@/components/svg/Apple";
import SvgGoogle from "@/components/svg/Google";
import {auth, signIn, signOut} from "@/auth"
import {redirect} from "next/navigation";


export default async function Page() {


    return (
        <main style={{
            maxWidth: '400px',
            width: '100%',
            minHeight: '100vh',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div className={styles.container}>
                <Link href={'/'} className={styles.logo}>
                    <SvgSLoG />
                </Link>
                <span className={styles.title}>
                    로그인
                </span>
                <div className={styles.oauthButtonSection}>
                    <form
                        action={async () => {
                            "use server"
                            await signIn("google", { redirectTo: '/register' })

                        }}
                    >
                        <button>
                            <SvgGoogle/>
                            <span>
                                Google
                            </span>
                        </button>
                    </form>
                    <form
                        action={async () => {
                            "use server"
                            await signOut()
                        }}
                    >
                        <button>
                            <SvgApple/>
                            <span>
                                Apple
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </main>
)
}






