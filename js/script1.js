(function(){
    'use strict';

    //carousel
    var btnPrev = document.querySelector('.carouselBtnPrev');
    var btnNext = document.querySelector('.carouselBtnNext');
    var carousel = document.querySelector('.carousel');
    var carouselInner = document.querySelector('.carouselInner');
    var carouselItens = document.querySelectorAll('.carouselItem');
    var carouselPagination = document.querySelector('.carouselPagination');

    var bannerStarter = 0;
    var qtdBanners = carouselItens.length;
    
    //changing css status with js
    btnPrev.style.display = 'block';
    btnNext.style.display = 'block';
    carousel.style.overflowX = 'hidden';

    btnPrev.addEventListener('click', showPrev);
    btnNext.addEventListener('click', showNext);

    setPagination();

    setupNav(bannerStarter);

    function setPagination(){
        for(var i = 0; i < qtdBanners; i++){
            addLiPagination(i);
        }
    }

    function addLiPagination(i){
        var li = document.createElement('li');
        if(i === 0) li.className = 'atual';
        li.addEventListener('click', function(){
            bannerStarter = i;
            showBanner(bannerStarter);
        });

        carouselPagination.appendChild(li);
    }

    function reloadPagination(){
        carouselPagination.querySelector('li.atual')
            .removeAttribute('class');

        carouselPagination.querySelectorAll('li')[bannerStarter]
            .className = 'atual';
    }

    function showPrev(){
        bannerStarter++;
        showBanner(bannerStarter);
    }

    function showNext(){
        bannerStarter--;
        showBanner(bannerStarter);
    }

    function setupNav(bannerStarter){
        btnPrev.disabled = !bannerStarter > 0;
        btnNext.disabled = bannerStarter === qtdBanners - 1;
    }

    function showBanner(bannerStarter){
        eraseIntervall();
        setupNav(bannerStarter);

        var itemWidth = getComputedStyle(carouselItens[0]).width;
        itemWidth = parseInt(itemWidth);
    
        var newPosition = itemWidth * bannerStarter * -1;

        carouselInner.style.transform = 'translateX(' + newPosition + 'px)';
    
        reloadPagination();
        startIntervall();
    }

    var intervall = null;
    function startIntervall(){
        intervall = setInterval(function(){
            bannerStarter++;
            if(bannerStarter >= qtdBanners) bannerStarter = 0;
            showBanner(bannerStarter);
        }, 5000);
    }
    startIntervall();

    function eraseIntervall(){
        clearInterval(intervall);
    }
    //carousel


    //MenuMobile
    window.onload = function (){
        document.querySelector('.menuMobile').addEventListener('click', function(){
            if(document.querySelector('#menu-direito-info').style.display == 'flex') {
                document.querySelector('#menu-direito-info').style.display = 'none';
            } else {
                document.querySelector('#menu-direito-info').style.display = 'flex';
            }
        });
    };

})()