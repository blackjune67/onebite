# Project Overview - Todo List Application

## 기술 스택 (Tech Stack)

| 구분 | 기술 | 버전 |
|------|------|------|
| **프레임워크** | React | 19.1.0 |
| **언어** | TypeScript | 5.8.3 |
| **라우팅** | React Router DOM | 7.11.0 |
| **상태관리** | Zustand (+ Immer) | 5.0.9 |
| **데이터 페칭** | TanStack React Query | 5.90.19 |
| **스타일링** | Tailwind CSS | 4.1.18 |
| **UI 컴포넌트** | Radix UI | 1.2.4 |
| **아이콘** | Lucide React | 0.562.0 |
| **빌드 도구** | Vite | 6.3.5 |
| **Mock 서버** | JSON Server | 1.0.0-beta.3 |

---

## 프로젝트 구조

```
src/
├── api/                    # API 호출 함수 (fetch 로직)
│   ├── fetch-todos.ts      # 전체 Todo 조회
│   ├── fetch-todo-by-id.ts # 단일 Todo 조회
│   └── create-todo.ts      # Todo 생성
│
├── hooks/                  # Custom Hooks
│   └── quries/
│       ├── use-todos-data.ts      # 전체 Todo 조회 훅
│       └── use-todo-data-by-id.ts # 단일 Todo 조회 훅
│
├── store/                  # Zustand 상태관리
│   ├── todos.ts            # Todo 로컬 상태
│   └── count.ts            # 카운터 상태 (예시)
│
├── components/             # 재사용 컴포넌트
│   └── todo-list/
│       ├── todo-editor.tsx # Todo 입력 폼
│       └── todo-item.tsx   # Todo 아이템
│
├── pages/                  # 페이지 컴포넌트
│   ├── todo-list-page.tsx  # Todo 목록 페이지
│   └── todo-detail-page.tsx# Todo 상세 페이지
│
├── lib/                    # 유틸리티 함수
├── types.ts                # TypeScript 타입 정의
└── App.tsx                 # 라우터 설정
```

---

## TODO 리스트 파일 구성

### 1. API Layer (`src/api/`)

서버와 통신하는 fetch 함수들을 분리하여 관리합니다.

| 파일 | 역할 | Endpoint |
|------|------|----------|
| `fetch-todos.ts` | 전체 Todo 목록 조회 | `GET /todos` |
| `fetch-todo-by-id.ts` | ID로 단일 Todo 조회 | `GET /todos/:id` |
| `create-todo.ts` | 새 Todo 생성 | `POST /todos` |

### 2. Hooks Layer (`src/hooks/quries/`)

TanStack React Query를 래핑한 커스텀 훅들입니다.

| 파일 | 역할 | Query Key |
|------|------|-----------|
| `use-todos-data.ts` | 전체 Todo 조회 + 캐싱 | `["todos"]` |
| `use-todo-data-by-id.ts` | 단일 Todo 조회 + 캐싱 | `["todos", id]` |

### 3. Store Layer (`src/store/todos.ts`)

Zustand를 이용한 클라이언트 사이드 상태 관리입니다.

```typescript
// 상태 구조
{ todos: Todo[] }

// 액션
- createTodo(content: string)  // 로컬에 Todo 추가
- deleteTodo(targetId: number) // 로컬에서 Todo 삭제

// 셀렉터 훅
- useTodos()       // Todo 배열 가져오기
- useCreateTodo()  // 생성 함수 가져오기
- useDeleteTodo()  // 삭제 함수 가져오기
```

### 4. Component Layer (`src/components/todo-list/`)

| 파일 | 역할 |
|------|------|
| `todo-editor.tsx` | Todo 입력 폼 (input + 추가 버튼) |
| `todo-item.tsx` | 개별 Todo 표시 (내용 + 삭제 버튼) |

### 5. Page Layer (`src/pages/`)

| 파일 | 경로 | 역할 |
|------|------|------|
| `todo-list-page.tsx` | `/todoList` | Todo 목록 + 에디터 |
| `todo-detail-page.tsx` | `/todoList/:id` | Todo 상세 보기 |

---

## 가상 DB (Mock Database)

### JSON Server 사용

이 프로젝트는 **JSON Server**를 사용하여 가상 REST API를 구현합니다.

**DB 파일 위치:** `server/db.json`

```json
{
  "todos": [
    {
      "id": 1,
      "content": "Todo 1",
      "isDone": true
    },
    {
      "id": 2,
      "content": "Todo 2",
      "isDone": false
    }
  ]
}
```

### 서버 실행

```bash
npm run server
# json-server --watch server/db.json --port 3001
```

### 자동 생성 API

JSON Server가 자동으로 생성하는 RESTful 엔드포인트:

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/todos` | 전체 목록 조회 |
| GET | `/todos/:id` | 단일 항목 조회 |
| POST | `/todos` | 새 항목 생성 |
| PUT | `/todos/:id` | 항목 전체 수정 |
| PATCH | `/todos/:id` | 항목 부분 수정 |
| DELETE | `/todos/:id` | 항목 삭제 |

---

## 상태관리 전략

이 프로젝트는 **하이브리드 상태관리** 전략을 사용합니다.

### 1. 서버 상태 (Server State) - React Query

```
서버 데이터 조회/캐싱에 사용
├── 자동 캐싱
├── 백그라운드 리페칭
├── 로딩/에러 상태 관리
└── Query Key 기반 캐시 무효화
```

**사용 예시:**
```typescript
// src/hooks/quries/use-todos-data.ts
const { data, isPending, isError } = useQuery({
  queryKey: ["todos"],
  queryFn: fetchTodos,
});
```

### 2. 클라이언트 상태 (Client State) - Zustand

```
UI 상태 및 로컬 데이터 관리에 사용
├── Immer 미들웨어 (불변성 관리)
├── Persist 미들웨어 (sessionStorage 저장)
├── DevTools 연동
└── 셀렉터 패턴
```

**사용 예시:**
```typescript
// src/store/todos.ts
const useTodoStore = create(
  immer(
    combine({ todos: [] }, (set) => ({
      createTodo: (content) => set((state) => {
        state.todos.push({ id: Date.now(), content });
      }),
    }))
  )
);
```

---

## 데이터 흐름

```
┌─────────────────────────────────────────────────────────────┐
│                        사용자 인터랙션                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Components (UI Layer)                     │
│              TodoEditor, TodoItem, Pages                     │
└─────────────────────────────────────────────────────────────┘
                    │                    │
          ┌────────┴────────┐   ┌───────┴────────┐
          ▼                 │   │                ▼
┌─────────────────┐         │   │    ┌─────────────────┐
│  Zustand Store  │         │   │    │  React Query    │
│ (클라이언트 상태) │         │   │    │  (서버 상태)    │
└─────────────────┘         │   │    └─────────────────┘
          │                 │   │            │
          │                 │   │            ▼
          │                 │   │    ┌─────────────────┐
          │                 │   │    │   API Layer     │
          │                 │   │    │ (fetch 함수들)   │
          │                 │   │    └─────────────────┘
          │                 │   │            │
          │                 │   │            ▼
          │                 │   │    ┌─────────────────┐
          │                 │   └───▶│  JSON Server    │
          │                 │        │  (Mock API)     │
          │                 │        └─────────────────┘
          │                 │                │
          │                 │                ▼
          │                 │        ┌─────────────────┐
          └─────────────────┴───────▶│    db.json      │
                                     │  (가상 데이터베이스) │
                                     └─────────────────┘
```

---

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# Mock API 서버 실행 (별도 터미널)
npm run server

# 프로덕션 빌드
npm run build
```

---

## 라우팅 구조

| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/` | IndexPage | 홈 (네비게이션 링크) |
| `/counter` | CounterPage | Zustand 데모 |
| `/todoList` | TodoListPage | Todo 목록 |
| `/todoList/:id` | TodoDetailPage | Todo 상세 |
| `/sign-in` | SignInPage | 로그인 |
| `/sign-up` | SignUpPage | 회원가입 |
