개발 중인 프로젝트로 언제든지 변경 가능


# 목차
- [1. 프로젝트 구조](#1-프로젝트-구조)
- [2. API 정리](#2-api-정리)

---

# 1. 프로젝트 구조

하위 폴더 또는 상위 폴더를 따라가면서 프로젝트 구조를 파악하시면 됩니다.

## Root

프로젝트 루트 폴더입니다.

### 상위 폴더

### 하위 폴더
- [app](#app)
- [components](#components)
- [public](#public)
- [services](#services)
- [types](#types)
- [utils](#utils)

---

## app

`app` 폴더는 프로젝트의 페이지 소스 파일을 포함합니다.

### 상위 폴더
- [Root](#root)

### 하위 폴더
- [[...name]](#name)
- [api](#api-정리-2)

---

## components

`components` 폴더는 프로젝트의 페이지 소스 파일에 import되어 사용되는 컴포넌트들을 기능별로 하위 폴더로 분류하여 포함합니다.

### 상위 폴더
- [Root](#root)

### 하위 폴더
- [footer](#footer)
- [header](#header)
- [modal](#modal)
- [sidebar](#sidebar)
- [svg](#svg)

---

## public

`public` 폴더는 프로젝트의 정적 소스 파일을 포함합니다.

### 상위 폴더
- [Root](#root)

### 하위 폴더
- 생략

---

## services

`services` 폴더는 MongoDB와 상호작용하는 서비스 로직 파일을 포함합니다.

하위 폴더들은 API End Point에 맞게 네이밍 되었으며, 서비스 로직과 interface를 포함합니다.

### 상위 폴더
- [Root](#root)

### 하위 폴더
- getDirectories
- getInitPageNum
- getPaginatedPosts
- getPostAndAdjacentPosts
- getSeries
- getTags
- getUserId

---

## types

`types` 폴더는 MongoDB Collection의 문서 interface 정보를 포함합니다.

### 상위 폴더
- [Root](#root)

---

## utils

`utils` 폴더는 재사용되는 비즈니스 로직들을 포함합니다. 이 폴더에는 다양한 유틸리티 함수가 있으며, 이는 애플리케이션 전반에 걸쳐 여러 곳에서 사용될 수 있습니다.

### 상위 폴더
- [Root](#root)

### 하위 폴더

---

## ...name

`...name` 폴더는 루트 라우트를 제외한 모든 라우트에 대한 제어 로직과 페이지 소스 파일을 포함합니다.

### 상위 폴더
- [app](#app)

### 하위 폴더
- [_blogHome](#_bloghome)
- [_blogPost](#_blogpost)

---

## footer

`footer` 폴더는 페이지 하단부에 해당하는 컴포넌트 소스 파일을 포함합니다.

### 상위 폴더
- [components](#components)

---

## header

`header` 폴더는 페이지 상단부에 해당하는 컴포넌트 소스 파일을 포함합니다.

### 상위 폴더
- [components](#components)

---

## modal

`modal` 폴더는 사용자 블로그의 포스트에 접근할 수 있는 `폴더`, `시리즈`, `태그`, `검색` 모달을 제공하는 컴포넌트 소스 파일을 기능별로 정리한 하위 폴더들을 포함합니다.

### 상위 폴더
- [components](#components)

### 하위 폴더
- common
- directory
- series
- tag

---

## sidebar

`sidebar` 폴더는 `modal`을 렌더링하는 `폴더`, `시리즈`, `태그`, `검색` 버튼들의 소스 파일을 포함합니다.

### 상위 폴더
- [components](#components)

### 하위 폴더
- directory
- search
- series
- tag

---

## svg

`svg` 폴더는 프로젝트에 사용되는 svg를 JSX를 통해 컴포넌트로 반환하는 소스 파일을 포함합니다.

### 상위 폴더
- [components](#components)

---

## _blogHome

`_blogHome` 폴더는 사용자 블로그의 홈 페이지를 렌더링 하는 SSR 소스 파일을 포함합니다.

### 상위 폴더
- [...name](#app)

### 하위 폴더

---

## _blogPost

`_blogPost` 폴더는 사용자 블로그의 포스트 페이지를 렌더링 하는 SSR 소스 파일을 포함합니다.

### 상위 폴더
- [...name](#app)

### 하위 폴더

---

# 2. API 정리

이 섹션에서는 프로젝트에서 사용되는 API 엔드포인트들을 정리합니다.

## ~/api/directory
**Method**: GET  
**설명**: 주어진 사용자 ID에 따라 디렉토리를 반환합니다.    
**변수**:
- `userId` (required): 사용자의 고유 ID

**응답**:  
자세한 응답 형식은 해당 API 폴더의 `interface` 파일을 참조하세요.


## ~/api/init-page-num-directoryId
**Method**: GET  
**설명**: 현재 페이지의 포스트에 대한 directoryId와 directoryId를 기준으로 페이지네이션 번호를 반환합니다.    
**변수**:
- `userId` (required): 사용자의 고유 ID
- `slug` (required): 현재 페이지의 포스트 slug

**응답**:  
자세한 응답 형식은 해당 API 폴더의 `interface` 파일을 참조하세요.


## ~/api/init-page-num-seriesId
**Method**: GET  
**설명**: 현재 페이지의 포스트에 대한 seriesId와 seriesId를 기준으로 페이지네이션 번호를 반환합니다.   
**변수**:
- `userId` (required): 사용자의 고유 ID
- `slug` (required): 현재 페이지의 포스트 slug

**응답**:  
자세한 응답 형식은 해당 API 폴더의 `interface` 파일을 참조하세요.


## ~/api/paginated-posts
**Method**: GET  
**설명**: 주어진 사용자 ID와 페이지네이션 분류 정보, 페이지네이션 번호를 기준으로 최대 12개의 페이지네이션 카드를 반환합니다.  
**변수**:
- `userId` (required): 사용자의 고유 ID
- `pageNum` (required): 페이지 번호
- `directoryIds` (optional, `directoryIds`, `seriesId`, `tagIds` 중 최소 1개 포함)
- `seriesId` (optional, `directoryIds`, `seriesId`, `tagIds` 중 최소 1개 포함)
- `tagIds` (optional, `directoryIds`, `seriesId`, `tagIds` 중 최소 1개 포함)

**응답**:  
자세한 응답 형식은 해당 API 폴더의 `interface` 파일을 참조하세요.


## ~/api/posts
**Method**: GET  
**설명**: 주어진 사용자 ID와 포스트 slug를 기준으로 포스트를 반환합니다.  
**변수**:
- `userId` (required): 사용자의 고유 ID
- `slug` (required): 현재 URI의 slug

**응답**:  
자세한 응답 형식은 해당 API 폴더의 `interface` 파일을 참조하세요.


## ~/api/series
**Method**: GET  
**설명**: 주어진 사용자 ID에 따라 시리즈를 반환합니다.    
**변수**:
- `userId` (required): 사용자의 고유 ID

**응답**:  
자세한 응답 형식은 해당 API 폴더의 `interface` 파일을 참조하세요.


## ~/api/tag
**Method**: GET  
**설명**: 주어진 사용자 ID에 따라 태그를 반환합니다.    
**변수**:
- `userId` (required): 사용자의 고유 ID

**응답**:  
자세한 응답 형식은 해당 API 폴더의 `interface` 파일을 참조하세요.


## ~/api/userId
**Method**: GET  
**설명**: 주어진 blogName에 따라 사용자 고유 ID를 반환합니다.    
**변수**:
- `blogName` (required): 블로그 이름

**응답**:  
자세한 응답 형식은 해당 API 폴더의 `interface` 파일을 참조하세요.
