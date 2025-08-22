// scroll reveal animation

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click',function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target){
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll reveal animation

const revealElements = document.querySelectorAll('.reveal');
const revealOptions = {
    threshold: 0.15, //요소가 얼마나 보여야 콜백함수가 실행되는지 결정되는 임계값
    rootMargin: '0px 0px -50px 0px' //뷰포트 감지 영역
};


const revealObserver = new IntersectionObserver((entries) =>{ //요소 감지되면 동작할 함수
    entries.forEach(entry => {
        if(entry.isIntersecting){  //화면에 보일 때만 실행
            entry.target.classList.add('active');
            //여려 요소에 계단식 애니메이션 추가
            const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
            entry.target.style.transitionDelay = `${index * 0.1}s`;
        }
    });
},revealOptions);

revealElements.forEach(element => {
    revealObserver.observe(element);
});