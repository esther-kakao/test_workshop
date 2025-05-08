/**
 * 카카오 테크 백서 인증 관련 스크립트
 * 로그인 및 회원가입 기능 구현
 */

// DOM 요소
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// 이메일 유효성 검사
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// 비밀번호 유효성 검사 (8자 이상, 영문/숫자/특수문자 조합)
function validatePassword(password) {
    const lengthRegex = /.{8,}/;
    const letterRegex = /[a-zA-Z]/;
    const digitRegex = /\d/;
    const specialRegex = /[!@#$%^&*(),.?":{}|<>]/;
    
    return lengthRegex.test(password) && 
           letterRegex.test(password) && 
           digitRegex.test(password) && 
           specialRegex.test(password);
}

// 로그인 핸들러
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const remember = document.querySelector('input[name="remember"]')?.checked;
        
        // 유효성 검사
        if (!validateEmail(email)) {
            alert('유효한 이메일 주소를 입력해주세요.');
            return;
        }
        
        if (!password) {
            alert('비밀번호를 입력해주세요.');
            return;
        }
        
        // 로그인 처리 (실제로는 서버 API 호출)
        console.log('로그인 시도:', { email, remember });
        
        // 서버 API 호출 코드 (실제 구현 시)
        /* 
        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, remember })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // 로그인 성공 처리
                localStorage.setItem('auth_token', data.token);
                window.location.href = 'index.html';
            } else {
                // 로그인 실패 처리
                alert(data.message || '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
            }
        })
        .catch(error => {
            console.error('로그인 중 오류 발생:', error);
            alert('로그인 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        });
        */
        
        // 임시 로그인 성공 처리 (데모용)
        alert('로그인 되었습니다. 메인 페이지로 이동합니다.');
        window.location.href = 'index.html';
    });
}

// 회원가입 핸들러
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password-confirm').value;
        const termsAgreed = document.querySelector('input[name="terms"]')?.checked;
        const privacyAgreed = document.querySelector('input[name="privacy"]')?.checked;
        const marketingAgreed = document.querySelector('input[name="marketing"]')?.checked;
        
        // 유효성 검사
        if (!name) {
            alert('이름을 입력해주세요.');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('유효한 이메일 주소를 입력해주세요.');
            return;
        }
        
        if (!validatePassword(password)) {
            alert('비밀번호는 8자 이상, 영문/숫자/특수문자를 조합해야 합니다.');
            return;
        }
        
        if (password !== passwordConfirm) {
            alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }
        
        if (!termsAgreed || !privacyAgreed) {
            alert('필수 약관에 동의해주세요.');
            return;
        }
        
        // 회원가입 처리 (실제로는 서버 API 호출)
        console.log('회원가입 시도:', { name, email, termsAgreed, privacyAgreed, marketingAgreed });
        
        // 서버 API 호출 코드 (실제 구현 시)
        /*
        fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                name, 
                email, 
                password,
                agreements: {
                    terms: termsAgreed,
                    privacy: privacyAgreed,
                    marketing: marketingAgreed
                }
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // 회원가입 성공 처리
                alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
                window.location.href = 'login.html';
            } else {
                // 회원가입 실패 처리
                alert(data.message || '회원가입에 실패했습니다.');
            }
        })
        .catch(error => {
            console.error('회원가입 중 오류 발생:', error);
            alert('회원가입 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        });
        */
        
        // 임시 회원가입 성공 처리 (데모용)
        alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        window.location.href = 'login.html';
    });
}

// 소셜 로그인 버튼 핸들러
document.querySelectorAll('.social-btn').forEach(button => {
    button.addEventListener('click', function() {
        const provider = this.classList.contains('kakao') ? 'kakao' : 'google';
        
        // 소셜 로그인 처리 로직 (실제로는 해당 제공자의 OAuth 인증 처리)
        console.log(`${provider} 로그인 시도`);
        
        // 카카오 로그인 (데모용)
        if (provider === 'kakao') {
            alert('카카오 계정으로 로그인을 시도합니다.');
            // 실제로는 카카오 SDK를 통한 인증 처리
        }
        
        // 구글 로그인 (데모용)
        if (provider === 'google') {
            alert('Google 계정으로 로그인을 시도합니다.');
            // 실제로는 Google OAuth를 통한 인증 처리
        }
    });
});