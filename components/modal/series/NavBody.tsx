import {SeriesObject} from "@/types/series.interface";
import NavItem from "@/components/modal/common/NavItem";

interface NavBodyProps {
    data: SeriesObject
    stack: number[]
    setStack: (newStack: number[]) => void
}

export default function SeriesNavBody({data, stack, setStack}: NavBodyProps) {

    return (
        <>
            {
                Object.keys(data).map((seriesId: string) => {
                    const name = data[seriesId].name
                    const postCount = data[seriesId].postCount

                    return (
                        <NavItem
                            key={seriesId}
                            name={name}
                            isSelected={stack.includes(+seriesId)}
                            postCount={postCount} onClick={() => {
                                if (stack.includes(+seriesId)) {
                                    setStack([])
                                    return
                                }
                                setStack([+seriesId])
                            }}/>
                    )
                })
            }
        </>
    )
}