/**
 * 카카오 테크 백서 메인 페이지 스크립트
 */

// DOM 요소
const categoryButtons = document.querySelectorAll('.category-filters button');
const termCards = document.querySelectorAll('.term-card');
const educationCards = document.querySelectorAll('.education-card');
const techTrendCards = document.querySelectorAll('.tech-trend-card');

// 초기화 함수
function init() {
    // 카테고리 필터링
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 활성 버튼 표시
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.textContent.trim();
            
            // 모든 카드 표시
            if (category === '전체') {
                termCards.forEach(card => {
                    card.style.display = 'block';
                });
                educationCards.forEach(card => {
                    card.style.display = 'block';
                });
                techTrendCards.forEach(card => {
                    card.style.display = 'block';
                });
                return;
            }
            
            // 카테고리 값으로 변환
            const categoryValue = getCategoryValue(category);
            
            // 용어 카드 필터링
            termCards.forEach(card => {
                const cardCategory = card.querySelector('.category').textContent.trim();
                if (cardCategory === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // 교육 카드 필터링
            educationCards.forEach(card => {
                if (category === '전체' || card.getAttribute('data-category') === categoryValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // 기술 동향 카드 필터링
            techTrendCards.forEach(card => {
                if (category === '전체' || card.getAttribute('data-category') === categoryValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // 카테고리 한글명을 영문 값으로 변환하는 함수
    function getCategoryValue(categoryName) {
        const categoryMap = {
            '프로그래밍': 'programming',
            '웹 개발': 'web',
            '인공지능': 'ai',
            '클라우드': 'cloud',
            '보안': 'security',
            '앱 개발': 'app'
        };
        return categoryMap[categoryName] || '';
    }
    
    // 검색 단축키 (Ctrl + K)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.querySelector('.search-bar').focus();
        }
    });
    
    // 자세히 보기 링크 클릭 이벤트
    document.querySelectorAll('.details-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('용어 상세 페이지로 이동합니다.');
            // 실제로는 해당 용어의 상세 페이지로 이동
            // window.location.href = `term.html?id=${termId}`;
        });
    });
    
    // 교육 신청 버튼 클릭 이벤트
    document.querySelectorAll('.apply-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('교육 신청 페이지로 이동합니다.');
            // 실제로는 해당 교육의 신청 페이지로 이동
            // window.location.href = `education.html?id=${educationId}`;
        });
    });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', init);