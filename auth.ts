import NextAuth, { DefaultSession, Account, Session } from "next-auth"
import Google from "next-auth/providers/google"
import { fetchRegistrationStatus } from "@/fetcher/server/GET/registrationStatusFetcher"
import { JWT } from "next-auth/jwt"
import {FetchResult} from "@/fetcher/FetchResult";
import {UserInfoDocument} from "@/types/userInfo.interface";

declare module "next-auth" {
    interface Session {
        provider: string
        userId: number | null
        registrationState: boolean
        providerId: string | null
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        provider?: string
        providerId?: string | null
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        jwt ({ account, token }: { account: Account | null; token: JWT }): JWT {
            if (account) {
                token.provider = account.provider
                token.providerId = account.providerAccountId
            }
            return token
        },
        async session({session, token}: { session: Session; token: JWT }) {
            if (token) {
                // 사용자 등록 정보
                if (token.providerId && token.provider) {
                    const data = await fetchRegistrationStatus(token.providerId, token.provider)
                    if (data.status === 200) {
                        session.userId = data.data
                        session.registrationState = true
                    } else {
                        session.userId = null
                        session.registrationState = false
                    }
                } else {
                    session.userId = null
                    session.registrationState = false
                }

                // 인증 정보
                session.providerId = token.providerId ?? null
                session.provider = token.provider ?? ""
            }
            return session
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 10 * 60, // 10분
        updateAge: 4 * 60, // 4분마다 갱신
    }
})