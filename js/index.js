window.onload=function(){
	
                        //	---------banner
    function banner(){
    	var oW= 0;
    	var oBanner=document.getElementById("banner")
		var oBtnL = document.getElementById("btn_L");
		var oBtnR = document.getElementById("btn_R");
		var oView = document.getElementById("view");
		var oUl = oView.getElementsByTagName('ul')[0];
		var aLis = oUl.children;
		var oOl = document.getElementsByTagName('ol')[0];
		var oBnts = oOl.children;
		oUl.innerHTML+=oUl.innerHTML;
		var aLis = oUl.children;
		var oLiWidth = aLis[0].offsetWidth;
		var iNum = 0;
		//计算轮播图的宽度
		oUl.style.width = aLis[0].offsetWidth*aLis.length + 'px';
		oW= document.documentElement.clientWidth;
		
		//计算轮播图居中
		oView.style.left = -(oView.offsetWidth - oW)/2+'px';
		
		//当窗口改变的时候重新计算轮播图居中
		window.onresize=function(){
			oW= document.documentElement.clientWidth;
			oView.style.left = -(oView.offsetWidth - oW)/2+'px';
		};
		
		//点击右侧按钮
				oBtnR.onclick=function(){
					iNum++;
					if(iNum==aLis.length/2+1){
//						oUl.style.left = oUl.offsetLeft + oUl.offsetWidth/2+'px'
						oUl.style.left = 0+'px'
						iNum=1;
					}
					for(var i=0; i<oBnts.length;i++){
						oBnts[i].className='';
					};
					if(iNum==aLis.length/2){
						oBnts[0].className='active';
					}else{
						oBnts[iNum].className='active';
					}
					animate(oUl,{'left': -iNum*oLiWidth});
				};
			
		//点击左侧按钮
				oBtnL.onclick=function(){
					iNum--;
					if(iNum<0){
						oUl.style.left =- oUl.offsetWidth/2+'px'
						iNum=aLis.length/2-1;
					};
					for(var i=0; i<oBnts.length;i++){
						oBnts[i].className='';
					};
					oBnts[iNum].className='active';
					animate(oUl,{'left': -iNum*oLiWidth});
				};
		
		//点解按钮切换轮播
		
		for(var i =0; i<oBnts.length;i++){
			oBnts[i].index=i;
			oBnts[i].onclick=function(){
				for(var i =0; i<oBnts.length;i++){
					oBnts[i].className='';
				}
				oBnts[this.index].className='active';
				iNum=this.index;
				animate(oUl,{'left': -this.index*oLiWidth});
				
			}
		};
		
		//自动播放
		function play() {
			if (iNum < oBnts.length - 1) {
	            oBnts[iNum].className='';
				oBnts[iNum+1].className='active';
				animate(oUl,{'left': -(iNum+1)*oLiWidth});     //
	            iNum++;
	        }
	        else {
	            oBnts[iNum].className='';
				oBnts[0].className='active';
				animate(oUl,{'left': 0});
	            iNum = 0;
	        }
	    }
		
	    timer=setInterval(play,2000);
	    oBanner.onmouseover=function(){
	    	clearInterval(timer)
	    };
	    oBanner.onmouseout=function(){ 
	    	timer=setInterval(play,2000)
	    };
		
    }
    
    banner()
    
    
                        //   ---------返回顶部
    
    function back(){
    	var oBtn = document.getElementById("back");
		var oTop = 0;
		var timer=null;
		var off=true;
		window.onscroll=function(){
			oTop = document.documentElement.scrollTop || document.body.scrollTop;
			
			if(oTop>300){
				oBtn.style.display='block'
			}else{
				oBtn.style.display='none'
			};				
			if(!off){
				clearInterval(timer);	
			}
			off=false;				
		};
			
		oBtn.onclick=function(){
			
			timer=setInterval(function(){
				var backTop = Math.floor(oTop/4);
				if(backTop == 0){
					clearInterval(timer)
				}else{
					if(document.documentElement.scrollTop){
						document.documentElement.scrollTop-=backTop;
					}else{
						document.body.scrollTop-=backTop;	
					}
					//document.documentElement.scrollTop = document.body.scrollTop-=backTop;			
					off=true;
				}

			},30)
			
		}
			
    }
    back()
    
    
                        //   ---------选项卡
    
    function choose(){
    	
		var oTeamHead=document.getElementById("team_head")
		var oTeamBody=document.getElementById("team_body")
		var oUl=oTeamHead.getElementsByTagName("ul")[0]
		var aLis=oUl.getElementsByTagName("li")
		var oCont=oTeamBody.getElementsByTagName("ul")       

		for(var i=0;i<aLis.length;i++){
			aLis[i].index=i
			aLis[i].onclick=function(){
				for(var i=0;i<aLis.length;i++){
					aLis[i].className=""
					oCont[i].style.display="none"
				}
				this.className="team_red"
				oCont[this.index].style.display="block"
			}
		}
    }
    choose()
    
    
    
                        //   ---------顶部菜单
    
    
    
    function shop(){
	var oTopNav = document.getElementById('top_nav');
	var aNavLi = getClass(oTopNav,'nav_li');               //含扩展箭头的li
	var aIs = oTopNav.getElementsByTagName('i');           //包住扩展箭头的i标签
	var oMoreBox  = document.getElementById('more_box');   //隐藏的大div
	var oMoreNav  = document.getElementById('more_nav');   //隐藏的大div里的ul
	var oMoreNavs = oMoreNav.getElementsByTagName('li');
	var iNum = 0;
	var off = true;
	for(var i=0; i<aNavLi.length; i++){
		aNavLi[i].index = i;
		aNavLi[i].onclick = function(ev){
			var ev = ev || window.event;
			if(iNum != this.index){
				off = true;           //解决来回点li的bug
			}
			if(off){
				for(var j=0; j<aIs.length; j++){
					aIs[j].style.backgroundPositionX = '-168px';    //未点击时的扩展箭头
					oMoreNavs[j].style.display = 'none';            //当前的li
				}
				aIs[this.index].style.backgroundPositionX = '-143px';
				oMoreBox.style.display = 'block';
				oMoreNavs[this.index].style.display = 'block';
                oMoreBox.style.left = this.offsetLeft+ 'px';        //点击显示的li左边距 = 被点击的含扩展箭头的li左边距
				
				off = false;
			}else{ 
				oMoreBox.style.display = 'none';
				aIs[this.index].style.backgroundPositionX = '-168px';
				off = true;
			}
			iNum = this.index;
			ev.cancelBubble = true;
			
		};
		document.onclick = function(ev){
			var ev = ev || window.event;
			var t = ev.target || ev.srcElement;
			if(t != aNavLi && t != oMoreNav){          //点击隐藏菜单以外的范围
				off = true;
				for(var j=0; j<aIs.length; j++){
					aIs[j].style.backgroundPositionX = '-168px';
				}
				oMoreBox.style.display = 'none';
			}
		};
	}
}
    shop()
    
    
    
    
              // -----------banner2
              
              
    function banner2(){
    	var oSub=document.getElementById("sub");
	    var img=oSub.getElementsByTagName("img");
	    var j=0
	    var i=0;
	    var timer=null;
	    img[i].style.opacity=1;
	    img[i].style.filter="alpha(opacity="+100+")";
	    
	    
	    function play2() {
	        if (i < img.length - 1) {
	            animate(img[i], {"opacity": 0});
	            animate(img[i + 1], {"opacity": 100});
	            i++;
	        }
	        else {
	            animate(img[i], {"opacity": 0});
	            animate(img[0], {"opacity": 100});
	            i = 0;
	        }
	    }
	    
	     timer=setInterval(play2,2000);
	
	    }
	    banner2()

    
    
}




