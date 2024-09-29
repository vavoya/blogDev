
type Option = {
    label: string,
    command: string
}

type AsyncAction = {
    function: any,
    // .then
    successMessage: string,
    // .error
    errorMessage: string,
    loadingMessage: string,
    onSuccessOptions: Option[],
    onErrorOptions: Option[]
}

// 입력 검증
type InputValidation = {
    function: any,
    // true 반환
    successMessage: string,
    // false 반환
    errorMessage: string,
    onSuccessOptions: Option[],
    onErrorOptions: Option[]
}

type CommandData = {
    message?: string
    options?: Option[]
    getAction?: AsyncAction
    postAction?: AsyncAction
    inputValidation?: InputValidation
}

const start: CommandData = {
    getAction: {
        function: () => null,
        loadingMessage: "초기 설정 중",
        successMessage: "안녕하세요! vavoya 님\n무엇을 도와드릴까요?",
        errorMessage: "초기 설정에 실패 했어요.\n",
        onErrorOptions: [
            { label: "재시도", command: "start" },
        ],
        onSuccessOptions: [
            { label: "편집", command: "edit" },
            { label: "통계", command: "edit" }
        ]
    }
}

const edit: CommandData = {
    message: "어떤 작업을 도와드릴까요?",
    options: [
        { label: "폴더 편집", command: "edit-folder" },
        { label: "시리즈 편집", command: "edit-series" },
        { label: "태그 편집", command: "edit-tag" },
        { label: "이전으로 돌아가기", command: "start" }
    ]
}



type CommandsData = {

}

const commandsData: CommandsData = {

}

export default commandsData