import {SeriesObject} from "@/types/series.interface";
import {checkInputErrors, ErrorState} from "@/app/dashboard/common/checkInputErrors";
import {useCallback} from "react";
import TreeItem from "@/app/dashboard/common/TreeItem";

interface TreeItemsProps {
    state: {
        series: SeriesObject;
        currentSeriesId: number | null;
        errorState: ErrorState
    }
    setState: {
        currentSeriesId: (currentSeriesId: number | null) => void;
        errorState: (errorState: ErrorState) => void;
        series: (series: SeriesObject) => void;
    }
}

export default function TreeItems({state, setState}: TreeItemsProps) {

    const clickCallback = useCallback((key: string) => setState.currentSeriesId(+key), [setState])
    const addCallback = useCallback(() => {
        const maxSeriesId = Math.max(...Object.keys(state.series).map(Number))
        const newSeriesId = maxSeriesId + 1
        const newSeries = {...state.series}
        newSeries[newSeriesId] = {
            name: "새 시리즈",
            postCount: 0,
        }
        const newErrorState = {...state.errorState}
        checkInputErrors({
            data: newSeries,
            errorState: newErrorState,
            children: Object.keys(newSeries).map(Number)
        })
        setState.errorState(newErrorState)
        setState.series(newSeries)
    }, [setState, state.errorState, state.series])
    const subtractCallback = useCallback((key: string) => {
        const newSeries = {...state.series}
        // 현재 시리즈 삭제
        delete newSeries[key]
        setState.series(newSeries)
        setState.currentSeriesId(null)
    }, [setState, state.series])
    const getCount = (key: string) => state.series[key].postCount
    const isError = (key: string) => !(state.errorState[key] === undefined)
    const isFocused = (key: string) => Number(key) === state.currentSeriesId
    const getItemName = (key: string) => state.series[key].name


    return (
        <>
            {
                Object.keys(state.series).map(key => {
                    return (
                        <TreeItem
                            clickCallback={() => clickCallback(key)}
                            addCallback={() => addCallback()}
                            subtractCallback={() => subtractCallback(key)}
                            count={getCount(key)}
                            isError={isError(key)}
                            isFocused={isFocused(key)}
                            type={'series'}
                            key={key}
                            itemName={getItemName(key)}
                            level={0} />
                    )
                })
            }
        </>
    )
}