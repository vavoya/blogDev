'use client'

import Layout from "@/app/dashboard/common/Layout";
import Button from "@/app/dashboard/common/Button";
import {SeriesObject} from "@/types/series.interface";
import {useEffect, useState} from "react";
import {ErrorState} from "@/app/dashboard/common/checkInputErrors";
import SeriesPostList from "@/app/dashboard/series/SeriesPostList/SeriesPostList";
import {Directories} from "@/types/directories.interface";
import {fetchSeriesPosts} from "@/fetcher/client/GET/seriesPostsFetcher";
import {SeriesPost} from "@/services/seriesPosts/interface";
import TreeItems from "@/app/dashboard/series/TreeItems";
import SeriesName from "@/app/dashboard/series/SeriesName";


interface SeriesProps {
    data: SeriesObject,
    directories: Directories,
    userId: number
}

export interface SeriesPostWithKey extends SeriesPost {
    key: number
}


export default function Series({data, directories, userId}: SeriesProps) {
    // 시리즈 목록
    const [series, setSeries] = useState<SeriesObject>({...data});
    // 현재 선택된 시리즈 id
    const [currentSeriesId, setCurrentSeriesId] = useState<number | null>(null);
    // 시리즈 목록 에러
    const [errorState, setErrorState] = useState<ErrorState>({});
    // 시리즈 포스트 로딩 상태
    const [isLoading, setIsLoading] = useState(false)
    // 시리즈 포스트 로딩 에러
    const [loadingErrorCode, setLoadingErrorCode] = useState<null | number>(null)
    // 시리즈 포스트 목록
    const [seriesPosts, setSeriesPosts] = useState<SeriesPostWithKey[]>([])

    // 선택된 시리즈의 포스트 목록 가져오기
    useEffect(() => {
        if (currentSeriesId !== null) {
            setIsLoading(true)
            fetchSeriesPosts(userId, currentSeriesId).then(data => {
                const newSeriesPosts: SeriesPostWithKey[] = []
                if (data && data.length > 0) {
                    data.sort((a,b) => a.seriesOrder - b.seriesOrder)
                    data.forEach((seriesPost,i) => {
                        newSeriesPosts.push({...seriesPost, key : i})
                    })
                }
                // 특정 필드 (value)의 최대 값을 찾기
                const nextKey = newSeriesPosts.reduce((max, postSeries) => {
                    return postSeries.key > max ? postSeries.key : max;
                }, -1) + 1;

                newSeriesPosts.push({title: "", seriesOrder: 0, directoryId: 0, slug: "", key: nextKey})

                setSeriesPosts(newSeriesPosts)
                setLoadingErrorCode(null)
            }).catch(error => {
                setLoadingErrorCode(0)
            }).finally(() => {
                setIsLoading(false)
            })
        }
    }, [currentSeriesId, userId]);


    return (
        <Layout
            treeElements={[
                <TreeItems
                    key={0}
                    state={{
                        series,
                        currentSeriesId,
                        errorState
                    }}
                    setState={{
                        currentSeriesId: setCurrentSeriesId,
                        errorState: setErrorState,
                        series: setSeries,
                    }}
                />]}
            detailsElements={[
                <SeriesName
                    key={0}
                    state={{
                        series,
                        currentSeriesId,
                        errorState
                    }}
                    setState={{
                        errorState: setErrorState,
                        series: setSeries
                    }}/>,
                <SeriesPostList
                    key={'1'}
                    state={{
                        directories,
                        seriesPosts,
                        isLoading,
                        loadingErrorCode,
                        userId
                    }}
                    setState={{
                        seriesPosts: setSeriesPosts
                    }}/>,
                <Button key={'2'} text={"변경 사항 저장"} />]} />
    )
}