// 햄버거메뉴
let hamburger = document.querySelector('.hamburger');
let mobileMenu = document.querySelector('.mobileMenu');

    hamburger.addEventListener('click', () => {
            mobileMenu.classList.contains('open') ? mobileMenu.classList.remove('open') : mobileMenu.classList.add('open');
    });

//***********PAGE01*/
// 이미지 순차 나타남 ---------------------
document.addEventListener('DOMContentLoaded', () => {
    // 페이지가 모두 로드된 후 실행

    let images = document.querySelectorAll('.mainImg'); // mainImg 클래스가 붙은 모든 이미지 선택 (img01~img13)
    let duration = 500; // 각 이미지 페이드 인 애니메이션 지속 시간(ms)
    let delay = 300;    // 다음 이미지가 페이드 인 시작할 때까지 딜레이(ms)
    let lastScrollY = 0; // 이전 스크롤 위치 저장
    let triggered = false; // 페이드 인 시퀀스가 한 번만 실행되도록 플래그

    // 초기 상태: 모든 이미지 숨김
    images.forEach(img => {
        img.style.opacity = 0; 
    });

    // 이미지 순차적으로 페이드 인시키는 함수
    function fadeInSequence() {
        images.forEach((img, index) => {
            // index * delay 만큼 시간차를 두어 순차 실행
            setTimeout(() => {
                fadeIn(img, duration); // 이미지 하나씩 페이드 인
            }, index * delay);
        });
    }

    // 페이드 인 애니메이션 함수
    function fadeIn(element, duration) {
        let startTime = null;

        function animate(currentTime) {
            if (!startTime) startTime = currentTime; // 애니메이션 시작 시간 저장
            let elapsed = currentTime - startTime;   // 경과 시간 계산
            let progress = Math.min(elapsed / duration, 1); // 0~1 사이 진행률 계산
            element.style.opacity = progress;        // opacity에 진행률 반영

            if (progress < 1) {
                requestAnimationFrame(animate); // 아직 완료 안됐으면 다음 프레임 요청
            }
        }

        requestAnimationFrame(animate); // 애니메이션 시작
    }

    // 스크롤 이벤트
    window.addEventListener('scroll', () => {
        let currentY = window.scrollY; // 현재 스크롤 위치
        let targetY = document.querySelector('.container01').offsetTop

        // 조건: 아래로 스크롤 && 아직 페이드 인 시퀀스가 실행 안됨
        if (!triggered && currentY >= targetY && currentY > lastScrollY) {
            triggered = true; // 한 번만 실행하도록 플래그 변경
            fadeInSequence(); // 이미지 순차 페이드 인 실행
        }

        lastScrollY = currentY; // 이전 스크롤 위치 갱신
    });
});


//***********PAGE02-about*/
//프로필박스
document.querySelectorAll('.flipCard').forEach(card => {
    card.addEventListener('touchstart', () => {
        card.classList.toggle('touch-active');
    });
});
//***********PAGE03-photo*/
document.addEventListener("DOMContentLoaded", () => {
    // 페이지가 로드되면 실행

    // .mainImg 클래스의 모든 이미지 박스에 클릭 이벤트 추가
    document.querySelectorAll(".mainImg").forEach(imgBox => {
        imgBox.addEventListener("click", () => {
            let id = imgBox.dataset.id;  // HTML data-id 속성 값 읽기
            // 클릭한 이미지의 id를 쿼리 파라미터로 전달하며 photo.html로 이동
            window.location.href = `photo.html?img=${id}`;
        });
    });
});

    // ================= 이미지 & 이름 배열 =================
    // 슬라이드에서 사용할 이미지 경로 배열
    let images2 = [
        './image/img01.JPG','./image/img02.JPG','./image/img03.JPG','./image/img04.JPG','./image/img05.JPG',
        './image/img06.JPG','./image/img07.JPG','./image/img08.JPG','./image/img09.JPG','./image/img10.JPG',
        './image/img11.JPG','./image/img12.JPG','./image/img13.JPG','./image/img14.JPG'
    ];

    // 이미지와 연동할 이름 배열
    let names = [
        "Bathed in Light","Wet","Whispers of Autumn","Under the Sky","Walking Into Dreams",
        "Sunset Garden","Trip to The Moon","Zen","Vinyl Theater","Sitting with the Sea",
        "Sunlit Veil","Silent Steps","The Homebound Sprite","Wanderer’s Pause"
    ];

    // DOM 요소 가져오기
    let mainSlide = document.getElementById('mainSlide'); // 중앙 이미지
    let prevSlide = document.getElementById('prevSlide'); // 이전 이미지
    let nextSlide = document.getElementById('nextSlide'); // 다음 이미지
    let prevName = document.getElementById('prevName');   // 이전 이미지 이름
    let nextName = document.getElementById('nextName');   // 다음 이미지 이름

    // URL 파라미터에서 시작 이미지 번호 추출 (없으면 1번 이미지)
    let params = new URLSearchParams(window.location.search);
    let currentIndex = parseInt(params.get('img') || 1) - 1; // 배열 인덱스용 0부터 시작

    // 이미지와 이름을 화면에 업데이트하는 함수
    function updateSlides() {
        // 이전/다음 이미지 인덱스 계산 (배열 순환)
        let prevIndex = (currentIndex - 1 + images2.length) % images2.length;
        let nextIndex = (currentIndex + 1) % images2.length;

        // 페이드 효과를 위해 중앙 이미지는 잠시 숨기고, 좌우는 반투명
        mainSlide.style.opacity = 0;
        prevSlide.style.opacity = 0.3;
        nextSlide.style.opacity = 0.3;

        setTimeout(() => {
            // 이미지 변경
            prevSlide.src = images2[prevIndex];
            mainSlide.src = images2[currentIndex];
            nextSlide.src = images2[nextIndex];

            // 이름 변경
            prevName.innerText = names[prevIndex];
            nextName.innerText = names[nextIndex];

            // 중앙 이미지를 점점 보이게, 좌우 이미지는 반투명
            mainSlide.style.opacity = 1;
            prevSlide.style.opacity = 0.4;
            nextSlide.style.opacity = 0.4;
        }, 200); // 200ms 후 이미지 전환 (부드러운 페이드)
    }

    // 초기 슬라이드 업데이트
    updateSlides();

    // 이전 이미지 클릭 시
    prevSlide.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images2.length) % images2.length; // 배열 순환
        updateSlides();
    });

    // 다음 이미지 클릭 시
    nextSlide.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images2.length; // 배열 순환
        updateSlides();
    });