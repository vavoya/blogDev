import styles from "@/components/modal/common/modal.module.css";
import ModalCardItem from "@/components/modal/common/CardItem";
import {PaginatedPostDocument} from "@/services/getPaginatedPosts/interface";
import {Directories} from "@/types/directories.interface";
import {formatDate} from "@/utils/data";
import getDirectoryTree from "@/utils/directoryTree";
import {Slugs} from "@/components/sideBar/SideBar";


interface CardBodyProps {
    isModalOpen: boolean
    isLoading: boolean;
    loadingMessage: string;
    noPostsMessage: string;
    postCount: number;
    slugs: Slugs;
    paginatedPosts: PaginatedPostDocument[];
    directories: Directories;
    onClose: () => void
}

export default function CardBody({isModalOpen, isLoading, loadingMessage, noPostsMessage, postCount, slugs, paginatedPosts, directories, onClose }: CardBodyProps) {

    return (
        <div className={styles.modalCardBody}>
            {
                isLoading
                    ? (<span>{loadingMessage}</span>)
                    : postCount === 0
                        ? (<span>{noPostsMessage}</span>)
                        : paginatedPosts.map((v, i) => {
                            const href = `/${slugs.blogName}/${v.slug}`;
                            const thumbUrl = v.metadata.thumbUrl;
                            const title = v.title;
                            const description = v.metadata.description;

                            const date = new Date(v.metadata.createdAt);
                            const createdAt = formatDate(date)

                            const directoryId = v.directoryId;
                            const path = getDirectoryTree({directories, directoryId}).path

                            return (
                                <ModalCardItem
                                    isModalOpen={isModalOpen}
                                    slugs={slugs}
                                    key={href}
                                    href={href}
                                    thumbUrl={thumbUrl}
                                    title={title}
                                    description={description}
                                    createdAt={createdAt}
                                    path={path}
                                    onClose={onClose}/>
                            )
                        })
            }
        </div>
    )
}