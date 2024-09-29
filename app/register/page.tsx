'use client'

import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import InputFieldWithLabel from "@/app/dashboard/common/InputFieldWithLabel";
import styles from "./page.module.css"
import {fetchRegistration} from "@/fetcher/client/POST/registrationFetcher";
import {useRouter} from "next/navigation";
import ProcessingOverlay from "@/components/processingOverlay/ProcessingOverlay";

export interface State {
    name: string
    blogName: string
    blogSlug: string
    email?: string
    introduce: string
}

export default function Page() {
    const router = useRouter()
    const session = useSession()
    const [state, setState] = useState<State>({
        name: "",
        blogName: "",
        blogSlug: "",
        email: session.data?.user?.email ?? "",
        introduce: ""
    })
    const [errorText, setErrorText] = useState<State>({
        name: "",
        blogName: "",
        blogSlug: "",
        introduce: ""
    })
    // state: 0(요청 x), 1(요청 중), 2(요청 끝남, 확인 필요)
    const [isSubmitting, setIsSubmitting] = useState({
        state: 0,
        text: ""
    })

    useEffect(() => {
        setState({...state, email: session.data?.user?.email ?? ""})
    }, [session])

    useEffect(() => {
        const html = document.documentElement; // document.html 대신 document.documentElement 사용
        if (isSubmitting.state === 0) {
            // html 페이지 스크롤 막기
            html.style.overflow = '';
        } else {
            html.style.overflow = 'hidden';
        }
    }, [isSubmitting]);

    console.log(session)



    return (
        <main
            className={styles.registerPage}
            style={{
                maxWidth: "350px",
                margin: "160px auto",
            }}>
            <h1>
                사용자 등록
            </h1>
            <InputFieldWithLabel
                labelText={"* 사용자 이름"}
                errorText={errorText.name}
                onChange={e => {
                    setState({...state, name: e.target.value})
                }}
                placeholder={"사용자 이름을 입력해 주세요"}/>
            <InputFieldWithLabel
                labelText={"* 블로그 이름"}
                errorText={errorText.blogName}
                onChange={e => {
                    setState({...state, blogName: e.target.value})
                }}
                placeholder={"블로그 이름을 입력해 주세요"}/>
            <InputFieldWithLabel
                labelText={"* 블로그 주소"}
                errorText={errorText.blogSlug}
                onChange={e => {
                    setState({...state, blogSlug: e.target.value})
                }}
                placeholder={" 블로그 주소를 입력해 주세요"}/>
            <InputFieldWithLabel
                labelText={"* 이메일"}
                value={state.email}
                readOnly={true}/>
            <InputFieldWithLabel
                labelText={"* 한 줄 소개"}
                errorText={errorText.introduce}
                onChange={e => {
                    setState({...state, introduce: e.target.value})
                }}
                placeholder={"한 줄 소개를 입력해 주세요"}/>
            <button onClick={e => {
                if (isSubmitting.state !== 0) {
                    return
                }
                // 초기 에러 메시지

                let errorMessage: State = {
                    name: '',
                    blogName: '',
                    blogSlug: '',
                    introduce: ''
                }

                // 이름 검증
                if (!state.name) {
                    errorMessage.name += '이름을 입력해 주세요.\n';
                } else if (state.name.length > 20) {
                    errorMessage.name += '이름은 최대 20자까지 가능합니다.\n';
                }

                // 블로그 이름 검증
                if (!state.blogName) {
                    errorMessage.blogName += '블로그 이름을 입력해 주세요.\n';
                } else if (state.blogName.length > 20) {
                    errorMessage.blogName += '블로그 이름은 최대 20자까지 가능합니다.\n';
                }

                // 블로그 주소 검증 (slug에 맞게 제한)
                const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
                if (!state.blogSlug) {
                    errorMessage.blogSlug += '블로그 주소를 입력해 주세요.\n';
                } else if (!/^[a-z0-9-]+$/.test(state.blogSlug)) {
                    errorMessage.blogSlug += '블로그 주소는 소문자, 숫자, 하이픈(-)만 사용 가능합니다.\n';
                } else if (/^-|-$/.test(state.blogSlug)) {
                    errorMessage.blogSlug += '블로그 주소는 하이픈(-)으로 시작하거나 끝날 수 없습니다.\n';
                } else if (state.blogSlug.length > 50) { // 최대 길이 제한 추가
                    errorMessage.blogSlug += '블로그 주소는 최대 50자까지 가능합니다.\n';
                }

                // 한 줄 소개 검증
                if (!state.introduce) {
                    errorMessage.introduce += '한 줄 소개를 입력해 주세요.\n';
                } else if (state.introduce.length > 100) {
                    errorMessage.introduce += '한 줄 소개는 최대 100자까지 가능합니다.\n';
                }

                setErrorText(errorMessage)

                if (Object.values(errorMessage).every(value => value === "")) {
                    setIsSubmitting({
                        state: 1,
                        text: "사용자 등록 중..."
                    })
                    fetchRegistration({props: state}).then(status => {
                        switch (status) {
                            case 0:
                                router.push(`/register/success?homeUrl=${state.blogSlug}&name=${state.name}`);
                                break;
                            case 1:
                                setIsSubmitting({
                                    state: 2,
                                    text: "사용자 등록에 실패했습니다"
                                });
                                break;
                            case 2:
                                setIsSubmitting({
                                    state: 2,
                                    text: "이미 등록된 계정입니다"
                                });
                                break;
                            case 3:
                                setIsSubmitting({
                                    state: 2,
                                    text: "이미 등록된 사용자 이름입니다"
                                });
                                break;
                            case 4:
                                setIsSubmitting({
                                    state: 2,
                                    text: "이미 등록된 블로그 이름입니다"
                                });
                                break;
                            case 5:
                                setIsSubmitting({
                                    state: 2,
                                    text: "이미 등록된 블로그 주소입니다"
                                });
                                break;
                            default:
                                setIsSubmitting({
                                    state: 2,
                                    text: "사용자 등록에 실패했습니다"
                                });
                                break;
                        }
                    }).catch(() => {
                        setIsSubmitting({
                            state: 2,
                            text: "예기치 못한 문제가 발생헀습니다"
                        })
                    })
                }

            }}>
                {isSubmitting.state === 0 ? "등록" : "처리 중..."}
            </button>
            {
                isSubmitting.state !== 0 &&
                <ProcessingOverlay
                    text={isSubmitting.text}
                    onClick={isSubmitting.state === 2 ? () => {setIsSubmitting({
                        state: 0,
                        text: "",
                    })} : () => null}/>
            }
        </main>
    )
}