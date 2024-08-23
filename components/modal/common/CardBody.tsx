import styles from "@/components/modal/common/modal.module.css";
import ModalCardItem from "@/components/modal/common/CardItem";
import {PaginatedPost} from "@/services/paginatedPosts/interface";
import {Directories} from "@/types/directories.interface";
import {formatDate} from "@/utils/data";
import getDirectoryTree from "@/utils/directoryTree";
import {Slugs} from "@/components/sideBar/SideBar";


interface CardBodyProps {
    isLoading: boolean;
    loadingMessage: string;
    noPostsMessage: string;
    postCount: number;
    slugs: Slugs;
    paginatedPosts: PaginatedPost[];
    directories: Directories;
}

export default function CardBody({isLoading, loadingMessage, noPostsMessage, postCount, slugs, paginatedPosts, directories }: CardBodyProps) {

    return (
        <div className={styles.modalCardBody}>
            {
                isLoading
                    ? (<span>{loadingMessage}</span>)
                    : postCount === 0
                        ? (<span>{noPostsMessage}</span>)
                        : paginatedPosts.map((v, i) => {
                            const href = `/${slugs.blogSlug}/${v.slug}`;
                            const thumbUrl = v.metadata.thumbUrl;
                            const title = v.title;
                            const description = v.metadata.description;

                            const date = new Date(v.metadata.createdAt);
                            const createdAt = formatDate(date)

                            const directoryId = v.directoryId;
                            const path = getDirectoryTree({directories, directoryId}).path

                            return (
                                <ModalCardItem
                                    slugs={slugs}
                                    key={href}
                                    href={href}
                                    thumbUrl={thumbUrl}
                                    title={title}
                                    description={description}
                                    createdAt={createdAt}
                                    path={path}/>
                            )
                        })
            }
        </div>
    )
}