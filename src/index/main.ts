console.log('Hi');
import './style.scss'
function onLoad() {
            document.body.innerHTML = `
            <canvas id="noise"></canvas>
<div id="content">
	<h1 id="title"><span class="glitch">Wel</span>co<span class="glitch-compact">m</span>e t<span class="glitch-compact">o</span><br/><span class="glitch-rand">lostofthought.com</span></h1>
	<h2 id="subtitle">A<span class="glitch-compact">r</span>e <span class="glitch-compact">y</span>ou <span class="glitch-rand">lost?</span></h2>
</div>
`;
            var canvas = document.getElementById('noise');
            var ctx = canvas.getContext('2d');

            window.addEventListener('resize', resizeCanvas, false);
            var canvasData = [];
            canvasData.length = 15;

            var rng;
            if(typeof window.crypto.getRandomValues === "function"){
                var array = new Uint32Array(1);
                window.crypto.getRandomValues(array);
                rng = array[0]|0;
			} else {
                rng = (Math.random() * Math.pow(2, 32))|0;
			}
            function next(){
                rng ^= rng << 13;
                rng ^= rng >> 17;
                rng ^= rng << 5;
                return rng;
            }

            var canvasIndex = 0;
            function resizeCanvas() {
                canvas.width = canvas.clientWidth;
                canvas.height = canvas.clientHeight;
                for(var i = 0; i < canvasData.length; i++){
                    canvasData[i] = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    for(var y = 0; y < canvasData[i].height; y++){
                        for(var x = 0; x < canvasData[i].width; x++){
                            var index = (x + y * canvasData[i].width) * 4;
                            var bits = next();
                            canvasData[i].data[index    ] = (bits >> 24 & 0xFF);
                            canvasData[i].data[index + 1] = (bits >> 16 & 0xFF);
                            canvasData[i].data[index + 2] = (bits >>  8 & 0xFF);
                            canvasData[i].data[index + 3] = (bits >>  0 & 0xFF);
                        }
                    }
                }
                draw();
            }

            resizeCanvas();
            function draw(){
                if(++canvasIndex >= canvasData.length){
                    canvasIndex = 0;
                }
                ctx.putImageData(canvasData[canvasIndex], 0, 0);
            }

            function splitGlitch(element) {
                var chars = element.innerText.split('');
                element.innerText = '';
                chars.forEach(function(char) {
                    var split = document.createElement('span');

                    element.appendChild(split);
                    split.classList.add('glitch-split');
                    split.setAttribute('data-char', char);

                    if(element.classList.contains('glitch')){
                        split.innerText = char.toUpperCase();
                    }
                    if(element.classList.contains('glitch-compact')){
                        split.innerText = char.toLowerCase();
                    }
                    if(element.classList.contains('glitch-rand')){
                        switch(Math.floor(Math.random() * 3)){
						case 0:
							split.innerText = char.toUpperCase();
							break;
						case 1:
							split.innerText = char.toLowerCase();
							break;
						case 2:
						    split.classList.remove('glitch-split');
                            split.removeAttribute('data-char', char);
							split.innerText = char;
							break;
						}
                    }

                    var computed = window.getComputedStyle(split);
                    split.style.width = computed.width;
                    split.style.height = computed.height;

                    split.innerText = char;
                });
            }

            var glitchClasses = [].concat(
                Array.from(document.getElementsByClassName('glitch'))
					, Array.from(document.getElementsByClassName('glitch-compact'))
					, Array.from(document.getElementsByClassName('glitch-rand'))
			);
			glitchClasses.forEach(splitGlitch);

            var glitchElements = document.getElementsByClassName('glitch-split');

            var num = 32;
            function glitch(){
                Array.prototype.forEach.call(glitchElements, function (element) {
                    switch(Math.floor(Math.random() * 5)){
                        case 0:
                            element.innerText = element.getAttribute('data-char').toLowerCase();
                            break;
                        case 1:
                            element.innerText = element.getAttribute('data-char').toUpperCase();
                            break;
                        case 2:
                            element.innerText = String.fromCharCode(Math.floor(Math.random() * (93)) + 33);
                            //element.innerText = String.fromCharCode(num++);
                            if(num === 94){
                                num = 32
							}
                            break;
						default:
                            element.innerText = element.getAttribute('data-char');
                    }
                });
            }

            draw();
            window.setInterval(draw, 16);

            glitch();
            window.setInterval(glitch, 100);
            }
             window.addEventListener("load",onLoad);
