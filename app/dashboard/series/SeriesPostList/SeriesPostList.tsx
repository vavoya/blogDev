import styles from "./SeriesPostList.module.css";
import {Directories} from "@/types/directories.interface";
import PostItem from "@/app/dashboard/series/SeriesPostList/PostItem";
import {SeriesPostWithKey} from "@/app/dashboard/series/Series";



interface SeriesPostListProps {
    state: {
        directories: Directories,
        isLoading: boolean,
        loadingErrorCode: number | null
        seriesPosts: SeriesPostWithKey[]
        userId: number
    },
    setState: {
        seriesPosts: (seriesPosts: SeriesPostWithKey[]) => void
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

        // 기존 seriesOrder 은 초기 정렬에만 사용, 이후에는 배열의 index를 seriesOrder로 사용
        return state.seriesPosts.map((seriesPost, seriesOrder) => (
            <PostItem
                state={{
                    directories: state.directories,
                    seriesPosts: state.seriesPosts,
                    seriesOrder: seriesOrder,
                    userId: state.userId
                }}
                setState={{
                    seriesPosts: setState.seriesPosts
                }}
                key={seriesPost.key}
            />
        ))
    };

    return (
        <div className={styles.seriesPostListContainer}>
            <span className={styles.title}>포스트 목록</span>
            <div className={styles.postList}>{renderContent()}</div>
        </div>
    );
}









