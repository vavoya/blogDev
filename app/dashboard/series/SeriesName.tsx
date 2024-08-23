import {SeriesObject} from "@/types/series.interface";
import {checkInputErrors, ErrorState, seriesErrorTexts} from "@/app/dashboard/common/checkInputErrors";
import {useCallback} from "react";
import InputFieldWithLabel from "@/app/dashboard/common/InputFieldWithLabel";

interface SeriesNameProps {
    state: {
        series: SeriesObject,
        currentSeriesId: number | null,
        errorState: ErrorState
    },
    setState: {
        errorState: (errorState: ErrorState) => void,
        series: (series: SeriesObject) => void
    }
}

export default function SeriesName({state, setState}: SeriesNameProps) {
    const getErrorText = () => {
        const errorCode = state.currentSeriesId === null ? undefined : state.errorState[state.currentSeriesId]
        return errorCode === undefined ? undefined : seriesErrorTexts[errorCode]
    }
    const getId = () => state.currentSeriesId === null ? undefined : state.currentSeriesId
    const getValue = () => state.currentSeriesId === null ? "" : state.series[state.currentSeriesId].name
    const getPlaceholder = () => state.currentSeriesId === null ? "시리즈를 선택해 주세요" : "시리즈 명을 입력해 주세요"
    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newSeries = {...state.series};
        // currentSeriesId가 없으면 readOnly 설정
        newSeries[state.currentSeriesId as number].name = e.target.value;
        const newErrorState = {...state.errorState}
        checkInputErrors({
            data: newSeries,
            errorState: newErrorState,
            children: Object.keys(newSeries).map(Number)
        })
        setState.errorState(newErrorState)
        setState.series(newSeries)
    }, [setState, state.currentSeriesId, state.errorState, state.series])


    return (
        <InputFieldWithLabel
            key={'0'}
            errorText={getErrorText()}
            id={getId()}
            labelText={"시리즈 명"}
            value={getValue()}
            placeholder={getPlaceholder()}
            readOnly={state.currentSeriesId === null}
            onChange={onChange}/>
    )
}