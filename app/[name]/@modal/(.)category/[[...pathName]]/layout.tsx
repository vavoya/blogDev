import styles from "@/app/[name]/@modal/.component/pageList.module.css";
import PageListHead from "@/app/[name]/@modal/.component/pageListHead";
import PageListFoot from "@/app/[name]/@modal/.component/pageListFoot";

export default async function Layout({
                                         children,
                                         params,
                                     }: {
    children: React.ReactNode
    params: {
        name: string
        pathName?: string[]
    }
}) {
    // 여기서 폴더 관련 정보 받아오기 "~/FrontEnd/React"}

    let title: string = "~";

    if (params.pathName) {
        title += '/' + params.pathName.join("/");
    }

    // 해당 경로 관련 페이지 개수만 가져오고, 그걸 5로 나누고 올림을 해



    return (
        <div className={styles.pageList}>
            <PageListHead title={title} cardCount={27} pageCount={6}/>
            {children}
            <PageListFoot start={1} end={6}/>
        </div>
    )

}

