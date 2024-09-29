import styles from "@/components/modal/common/modal.module.css";
import ModalCardItem from "@/components/modal/dashboard/CardItem";
import {PaginatedPost} from "@/services/paginatedPosts/interface";
import {Directories} from "@/types/directories.interface";
import {formatDate} from "@/utils/data";
import getDirectoryTree from "@/utils/directoryTree";
import {Dispatch, SetStateAction} from "react";
import {SeriesPostsObject} from "@/app/dashboard2/management/series/component/SeriesPosts";


interface CardBodyProps {
    state: {
        isLoading: boolean;
        loadingMessage: string;
        noPostsMessage: string;
        postCount: number;
        slug: string;
        paginatedPosts: PaginatedPost[];
        directories: Directories;
        seriesOrder: number,
        seriesPosts: SeriesPostsObject
    }
    setState: {
        seriesPosts: Dispatch<SetStateAction<SeriesPostsObject>>
        onClose: () => void
    }
}

export default function CardBody({state, setState}: CardBodyProps) {

    return (
        <div className={styles.modalCardBody}>
            {
                state.isLoading
                    ? (<span>{state.loadingMessage}</span>)
                    : state.postCount === 0
                        ? (<span>{state.noPostsMessage}</span>)
                        : state.paginatedPosts.map((v, i) => {
                            const postSlug = v.slug
                            const thumbUrl = v.metadata.thumbUrl;
                            const title = v.title;
                            const description = v.metadata.description;

                            const date = new Date(v.metadata.createdAt);
                            const createdAt = formatDate(date)

                            const directoryId = v.directoryId;
                            const path = getDirectoryTree({directories: state.directories, directoryId}).path

                            return (
                                <ModalCardItem
                                    key={state.slug}
                                    state={{
                                        slug: state.slug,
                                        seriesOrder: state.seriesOrder,
                                        seriesPosts: state.seriesPosts,
                                        postSlug,
                                        thumbUrl,
                                        title,
                                        description,
                                        createdAt,
                                        path,
                                        directoryId
                                    }}
                                 setState={{
                                     seriesPosts: setState.seriesPosts,
                                     onClose: setState.onClose
                                 }}/>
                            )
                        })
            }
        </div>
    )
}