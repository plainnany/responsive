window.onload = function(){
    var prev = document.querySelector('#prev'),
        next = document.querySelector('#next'),
        oSlide = document.querySelector('#slide'),
        slide = document.querySelector('.slide'),
        aLi = document.querySelectorAll('.slide>li'),
        menu = document.querySelector('.menu'),
        menuLi = document.querySelectorAll('.menu>li');
    
    var index = 0;
    var num;
    var w = aLi[0].offsetWidth;
    var timer=null;

    function play(){
        index++;
        if(index===4){
            index = 0;
        }
        slide.style.transform = 'translate('+ (-w*index) +'px)';

        for(var i=0;i<menuLi.length;i++){
            menuLi[i].className=''
        }
        menuLi[index].className='active';
    }
    next.addEventListener('click',play);
    prev.addEventListener('click',function(){
        index--;
        if(index===-1){
            index = 3;
        }
        slide.style.transform = 'translate('+ (-w*index) +'px)';

        for(var i=0;i<menuLi.length;i++){
            menuLi[i].className=''
        }
        menuLi[index].className='active';
    })

    for(var i=0;i<menuLi.length;i++){
        menuLi[i].num=i;
        menuLi[i].onclick=function(){
            index = this.num;  
            for(var i=0;i<menuLi.length;i++){
                menuLi[i].className=''
            }
            this.className='active';

            slide.style.transform = 'translate('+ (-w*index) +'px)';
        }
    }
    oSlide.addEventListener('mouseover',function(){
        clearInterval(timer);
    })
    oSlide.addEventListener('mouseout',function(){
        timer = setInterval(play,2000);
    })
    timer = setInterval(play,2000);
       

}