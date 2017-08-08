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
        // var clone = aLi[index];
        // slide.appendChild(clone);

        // console.log(aLi[index])
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
        clearInterval(timer);
        timer = setInterval(play,3000);
    })
    timer = setInterval(play,3000);
       

    // loadMore
    
    !function(){
        let loadMore = document.querySelector('#loadMore')
        let content = document.querySelector('.content')
        let index = 0
        loadMore.onclick = function(){
            let request = new XMLHttpRequest()
            request.open('GET','./page'+ index +'.html')
            request.onload=function(){
                let response = request.responseText
                let data = JSON.parse(response)
                let html = ''
                for(let i = 0;i < data.content.length;i++){
                    html += '<li>\
                    <div><img src='+ data.content[i].url +' alt=""></div>\
                    <h3>'+ data.content[i].title +'</h3><p>'+ data.content[i].content +'</p>\
                    </li>'
                } 
                loadMore.innerText = '加载更多'
                loadMore.className = ''
                if(!data.hasNextPage){
                    loadMore.innerText = '没有更多的数据了'
                    loadMore.className = ''
                }
                
                content.innerHTML += html   
                
            }
            index+=1
            setTimeout(function(){
                request.send()
            },1000)
            if(index<3){
                loadMore.innerHTML = '<img src="loading.gif" alt="loading" title="loading" >'
                loadMore.className = 'active'
            }else{
                loadMore.innerText = '没有更多的数据了'
                loadMore.className = ''
            }
            
        }
        window.onscroll = function(){
            let clientHeight = document.documentElement.clientHeight
            let viewportOffset = loadMore.getBoundingClientRect();
            let buttonTop = viewportOffset.top;
          
            if(buttonTop > clientHeight - 57){
            }else{
                loadMore.onclick()
            }
        }
    }()

}