function a() {
    var el = document.getElementById('iSlider');
    console.log(el.childNodes[1]);
    var ham = new Hammer.Manager(el);
    ham.add(new Hammer.Pan({ threshold: 0 }));
    ham.add(new Hammer.Pinch());
    ham.on('pan panend', onPan);
    ham.on('pinch', onPinch);
    var transX = 0;
    index = 0;

    function onPan(ev) {
        if (ev.type = 'panend') {
            console.log(transX);
            if (transX > 10) {
                if (index == 2) {
                    index +=1;
                }
            }
            if (transX < -10) {
                if (index != 0){
                    index -=1;
                }
            }
            el.childNodes[1].style.transform = 'translate('+index*340+'px, 0px)';
        }
        // console.log(ev);
        console.log(ev.velocityX);
        transX += ev.velocityX;
        el.childNodes[1].style.transform = 'translate('+transX*100+'px, 0px)';
    };
    var initScale = 1;
    function onPinch(ev) {
        console.log(ev);

        // el.className = '';
        // initScale *= 
        // transform.scale = initScale * ev.scale;
        // el.childNodes[1].style.transform = 'scale()'
    }
}