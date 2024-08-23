import styles from "./SeriesPostList.module.css";
import {Directories} from "@/types/directories.interface";
import {SeriesPost} from "@/services/seriesPosts/interface";
import PostItem from "@/app/dashboard/series/SeriesPostList/PostItem";



interface SeriesPostListProps {
    state: {
        directories: Directories,
        isLoading: boolean,
        loadingErrorCode: number | null
        seriesPosts: SeriesPost[]
        userId: number
    },
    setState: {
        seriesPosts: (seriesPosts: SeriesPost[]) => void
    }
}

export default function SeriesPostList({state, setState}: SeriesPostListProps) {
    const loadingErrorText = ["서버와 연결이 되지 않습니다."]

    const renderContent = () => {
        if (state.isLoading) {
            return <span>불러오는 중...</span>;
        }

        if (state.loadingErrorCode) {
            return <span>{loadingErrorText[state.loadingErrorCode]}</span>;
        }

        if (state.seriesPosts.length > 0) {
            return state.seriesPosts.map(seriesPost => (
                <PostItem
                    state={{
                        directories: state.directories,
                        seriesPosts: state.seriesPosts,
                        seriesOrder: seriesPost.seriesOrder,
                        userId: state.userId
                    }}
                    setState={{
                        seriesPosts: setState.seriesPosts
                    }}
                    key={seriesPost.seriesOrder}
                />
            ));
        }

        return <span>포스트가 없습니다.</span>; // 시리즈에 포스트가 없을 때 처리
    };

    return (
        <div className={styles.seriesPostListContainer}>
            <span className={styles.title}>포스트 목록</span>
            <div className={styles.postList}>{renderContent()}</div>
        </div>
    );
}









