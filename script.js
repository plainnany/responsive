window.onload = function(){
    var prev = document.querySelector('#prev'),
        next = document.querySelector('#next'),
        slide = document.querySelector('.slide'),
        aLi = document.querySelectorAll('.slide>li'),
        menu = document.querySelector('.menu'),
        menuLi = document.querySelectorAll('.menu>li');
    
    var index = 0;
    var num;
    var w = aLi[0].offsetWidth;
    next.addEventListener('click',function(){
        w = aLi[0].offsetWidth;
        index++;
        if(index===4){
            index = 0;
        }
        slide.style.transform = 'translate('+ (-w*index) +'px)';

        for(var i=0;i<menuLi.length;i++){
            menuLi[i].className=''
        }
        menuLi[index].className='active';
        
    })
    prev.addEventListener('click',function(){
        w = aLi[0].offsetWidth;
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
    
    // 事件委托  不会写
    // menu.addEventListener('click',function(e){
        
    //     if(e.target.tagName==='LI'){
    //         for(var i=0;i<menuLi.length;i++){
    //             menuLi[i].className='';
    //         }
    //         index++
    //         console.log(num)
    //         e.target.className ='active'
    //     }
    // })   

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

}