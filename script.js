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
    var w = oSlide.offsetWidth
    var timer=null;
    window.onresize=function(){
        
        w = oSlide.offsetWidth 
        slide.style.transform = 'translate('+ (-w*index) +'px)'
        //console.log(w)
    }
    
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
    next.addEventListener('click',function(){
        clearInterval(timer);
        play();
    });
    prev.addEventListener('click',function(){
        clearInterval(timer);
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
        let hasNext = true
        let isLoading = false
        function load(){
            if(isLoading){return}
            if(!hasNext){return}
            let request = new XMLHttpRequest()
            request.open('GET','./page'+ index +'.html')
            request.onload=function(){
                isLoading = false   // 如果加载完毕，就发送请求
                index+=1
                let response = request.responseText
                let data = JSON.parse(response)
                let html = ''
                for(let i = 0;i < data.content.length;i++){
                    html += '<li>\
                    <div><img src="loading-bg.gif" data-src='+ data.content[i].url +' alt=""></div>\
                    <h3>'+ data.content[i].title +'</h3><p>'+ data.content[i].content +'</p>\
                    </li>'
                } 
                loadMore.innerText = '加载更多'
                loadMore.className = ''
                if(!data.hasNextPage){
                    loadMore.innerText = '没有更多的数据了'
                    loadMore.className = ''
                    hasNext = false    // 判断是否有下一页，如果没有，直接return
                }
                
                content.innerHTML += html   
                
            }
            
            
            isLoading = true  // 如果正在加载，就直接return,不允许用户重复点击、重复发送请求
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

        function showInViewport(element){
            let clientHeight = document.documentElement.clientHeight
            let viewportOffset = element.getBoundingClientRect();
            let buttonTop = viewportOffset.top;
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            if(buttonTop > clientHeight - 57){   // || elementTop <  -elementHeight
                
                return false
            }else{
                return true    
            }
        }
        /* jquery 判断元素是否出现在viewport中
        * function isVisible(element){
            let scrollTop = $(window).scrollTop()
            let elementTop = $(element).offset().top
            let windowHeight = $(window).height()
            let elementHeight = $(element).height()
            if(elementTop>scrollTop-elementHeight && elementTop< scrollTop+windowHeight){
                return true
            }else{
                return false
            }
        }
        *
        */
        loadMore.onclick = load
        window.onscroll = function(){
            if(showInViewport(loadMore)){
                load()
            }
            let images = document.querySelectorAll('img[data-src]')
            for(let i=0;i<images.length;i++){
                if(showInViewport(images[i])){
                    images[i].src = images[i].getAttribute('data-src')
                    images[i].removeAttribute('data-src')
                }
            }
        }
    }()

}