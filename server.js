const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// 메일 전송 설정
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-email-password'
  }
});

// 인재 등록 API 엔드포인트
app.post('/api/register-talent', async (req, res) => {
  try {
    const data = req.body;
    
    // 메일 옵션 설정
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: process.env.RECEIVER_EMAIL || 'esther.0605@kakaocorp.com',
      subject: `[인재등록] ${data.name}님의 지원서`,
      text: `
안녕하세요,

카카오 테크 백서 사이트를 통해 새로운 인재가 등록되었습니다.

==============================
지원자 정보
==============================
이름: ${data.name}
이메일: ${data.email}
연락처: ${data.phone}
희망 직무: ${data.positionName}
경력: ${data.careerName}
보유 기술: ${data.skills}
포트폴리오: ${data.portfolio || '없음'}

==============================
자기소개
==============================
${data.introduction || '없음'}

※ 본 메일은 자동 발송되었습니다.
      `
    };

    // 메일 전송 (개발 모드에서는 로그만 출력)
    console.log('이메일 전송 시도:', mailOptions);
    
    // 실제 환경에서는 아래 코드의 주석을 제거
    // await transporter.sendMail(mailOptions);
    
    // 데이터베이스에 저장하는 코드를 여기에 추가할 수 있음
    
    // 응답 반환
    res.status(200).json({ success: true, message: '인재 등록이 완료되었습니다.' });
  } catch (error) {
    console.error('인재 등록 처리 중 오류 발생:', error);
    res.status(500).json({ success: false, message: '인재 등록 중 오류가 발생했습니다. 다시 시도해주세요.' });
  }
});

// 기본 경로 처리
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});