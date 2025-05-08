# 카카오 테크 백서

이 프로젝트는 카카오의 기술 용어와 동향을 공유하는 웹사이트입니다.

## 기능

- 기술 용어집 검색 및 카테고리 필터링
- 사내 기술 동향 소개
- 인재풀 등록 기능

## 설치 및 실행 방법

### 필수 조건

- Node.js 16.x 이상
- npm 8.x 이상

### 설치

프로젝트 디렉토리에서 다음 명령어를 실행하여 필요한 의존성을 설치합니다:

```bash
npm install
```

### 환경 설정

1. 이메일 전송을 위한 SMTP 설정을 완료해야 합니다. 
2. `server.js` 파일에서 다음 부분을 수정하세요:

```javascript
const transporter = nodemailer.createTransport({
  service: 'gmail', // 실제 카카오 메일 서버로 변경 필요
  auth: {
    user: 'your-email@gmail.com', // 실제 사용할 이메일로 대체 필요
    pass: 'your-email-password' // 실제 사용할 비밀번호로 대체 필요
  }
});
```

Gmail을 사용하는 경우 앱 비밀번호를 생성하여 사용해야 합니다.

### 실행

개발 모드로 실행하려면:

```bash
npm run dev
```

프로덕션 모드로 실행하려면:

```bash
npm start
```

서버가 시작되면 `http://localhost:3000`에서 웹사이트에 접속할 수 있습니다.

## 배포

이 애플리케이션은 다음과 같은 방법으로 배포할 수 있습니다:

1. 클라우드 서비스 (AWS, GCP, 등)
2. 카카오 내부 서버

배포 전에는 보안 설정 및 환경 변수 구성을 완료해야 합니다.

## 개발자 정보

- 담당자: esther.0605@kakaocorp.com