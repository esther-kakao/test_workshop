/**
 * 카카오 테크 백서 검색 기능 스크립트
 * 용어 검색 및 필터링 기능 구현
 */

// 검색 데이터 (실제로는 서버에서 가져옴)
const glossaryTerms = [
    {
        id: 1,
        title: 'API',
        category: 'app',
        categoryName: '앱 개발',
        description: '애플리케이션 프로그래밍 인터페이스(Application Programming Interface)의 약자로, 서로 다른 소프트웨어 간의 통신 방법을 정의합니다.',
        isNew: false,
        createdAt: '2025-01-10'
    },
    {
        id: 2,
        title: 'REST API',
        category: 'web',
        categoryName: '웹 개발',
        description: '표현 상태 전송(Representational State Transfer) API로, 웹 서비스 간의 통신을 위한 아키텍처 스타일입니다.',
        isNew: true,
        createdAt: '2025-05-01'
    },
    {
        id: 3,
        title: 'API 키',
        category: 'programming',
        categoryName: '프로그래밍',
        description: 'API에 접근하기 위한 고유 식별자로, 접근 권한 관리와 사용량 추적에 사용됩니다.',
        isNew: false,
        createdAt: '2025-02-15'
    },
    {
        id: 4,
        title: 'API 게이트웨이',
        category: 'cloud',
        categoryName: '클라우드',
        description: '마이크로서비스 아키텍처에서 여러 API를 중앙에서 관리하고 클라이언트 요청을 적절한 서비스로 라우팅하는 서비스입니다.',
        isNew: false,
        createdAt: '2025-03-05'
    },
    {
        id: 5,
        title: 'API 인증',
        category: 'security',
        categoryName: '보안',
        description: 'API 사용자의 신원을 확인하고 접근 권한을 부여하는 과정입니다. JWT, OAuth 등의 방식이 사용됩니다.',
        isNew: false,
        createdAt: '2025-02-20'
    },
    {
        id: 6,
        title: 'GraphQL API',
        category: 'web',
        categoryName: '웹 개발',
        description: '필요한 데이터만 정확하게 요청할 수 있는 쿼리 언어 기반의 API로, REST API의 대안으로 사용됩니다.',
        isNew: true,
        createdAt: '2025-05-03'
    }
];

// DOM 요소
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const newTermsOnly = document.getElementById('newTermsOnly');
const searchQueryElement = document.getElementById('searchQuery');
const resultCountElement = document.getElementById('resultCount');
const searchResultsContainer = document.querySelector('.search-results');

// URL 파라미터에서 검색어 가져오기
function getSearchQueryFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('q') || '';
}

// 검색 결과 페이지 초기화
function initSearchPage() {
    const query = getSearchQueryFromURL();
    if (query) {
        searchInput.value = query;
        searchQueryElement.textContent = `"${query}"`;
        performSearch(query);
    }
    
    // 이벤트 리스너 등록
    searchButton.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            updateSearchParams(query);
            performSearch(query);
        }
    });
    
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                updateSearchParams(query);
                performSearch(query);
            }
        }
    });
    
    // 필터 변경 이벤트
    categoryFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);
    newTermsOnly.addEventListener('change', applyFilters);
}

// URL 파라미터 업데이트
function updateSearchParams(query) {
    const url = new URL(window.location.href);
    url.searchParams.set('q', query);
    window.history.pushState({}, '', url);
    searchQueryElement.textContent = `"${query}"`;
}

// 검색 수행
function performSearch(query) {
    // 실제로는 서버 API 호출
    // fetch(`/api/search?q=${encodeURIComponent(query)}`)
    //    .then(response => response.json())
    //    .then(data => {
    //        displayResults(data.results);
    //    });
    
    // 클라이언트 측 검색 (데모용)
    const results = glossaryTerms.filter(term => {
        return term.title.toLowerCase().includes(query.toLowerCase()) ||
               term.description.toLowerCase().includes(query.toLowerCase());
    });
    
    displayResults(results);
}

// 필터 적용
function applyFilters() {
    const query = searchInput.value.trim();
    const category = categoryFilter.value;
    const sort = sortFilter.value;
    const newOnly = newTermsOnly.checked;
    
    // 실제로는 서버 API 호출 시 파라미터로 전달
    // fetch(`/api/search?q=${encodeURIComponent(query)}&category=${category}&sort=${sort}&new=${newOnly}`)
    
    // 클라이언트 측 필터링 (데모용)
    let results = glossaryTerms.filter(term => {
        const matchesQuery = query ? 
            (term.title.toLowerCase().includes(query.toLowerCase()) || 
             term.description.toLowerCase().includes(query.toLowerCase())) : true;
        
        const matchesCategory = category ? term.category === category : true;
        const matchesNew = newOnly ? term.isNew : true;
        
        return matchesQuery && matchesCategory && matchesNew;
    });
    
    // 정렬 적용
    if (sort === 'newest') {
        results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === 'az') {
        results.sort((a, b) => a.title.localeCompare(b.title));
    }
    // 'relevance'는 기본 정렬로 서버에서 처리
    
    displayResults(results);
}

// 검색 결과 표시
function displayResults(results) {
    resultCountElement.textContent = results.length;
    searchResultsContainer.innerHTML = '';
    
    if (results.length === 0) {
        searchResultsContainer.innerHTML = '<p class="no-results">검색 결과가 없습니다.</p>';
        return;
    }
    
    results.forEach(term => {
        const termCard = document.createElement('div');
        termCard.className = 'term-card';
        
        let html = '';
        if (term.isNew) {
            html += '<span class="new-badge">NEW</span>';
        }
        
        html += `
            <span class="category">${term.categoryName}</span>
            <h3>${term.title}</h3>
            <p>${term.description}</p>
            <a href="#" class="details-link" data-id="${term.id}">자세히 보기</a>
        `;
        
        termCard.innerHTML = html;
        searchResultsContainer.appendChild(termCard);
    });
    
    // 자세히 보기 링크에 이벤트 리스너 등록
    document.querySelectorAll('.details-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const termId = this.getAttribute('data-id');
            // 용어 상세 페이지로 이동
            // window.location.href = `term.html?id=${termId}`;
            alert(`용어 ID ${termId} 상세 페이지로 이동합니다.`);
        });
    });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', initSearchPage);