import {Tags} from "@/types/tags.interface";
import styles from "@/components/modal/common/modal.module.css";
import TagModalNavItem from "@/components/modal/tag/NavItem";

interface NavBodyProps {
    data: Tags
    stack: number[]
    setStack: (newStack: number[]) => void
    isModalOpen: boolean
}

export default function NavBody({data, stack, setStack, isModalOpen}: NavBodyProps) {

    return (
        <div className={styles.modalNavBody}>
            {
                Object.keys(data).map((tagId: string) => {
                    const name = data[tagId].name
                    const postCount = data[tagId].postCount

                    return (
                        <TagModalNavItem
                            key={tagId}
                            stack={stack}
                            setStack={setStack}
                            name={name}
                            postCount={postCount}
                            tagId={Number(tagId)}
                            isModalOpen={isModalOpen}/>
                    )
                })
            }
        </div>
    )
}