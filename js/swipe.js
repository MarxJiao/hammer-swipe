function a() {
    var el = document.getElementById('iSlider');
    console.log(el.childNodes[1]);
    var ham = new Hammer.Manager(el);
    ham.add(new Hammer.Pan({ threshold: 1 }));
    ham.add(new Hammer.Pinch());
    ham.on('pan panend', onPan);
    ham.on('pinch', onPinch);
    var transX = 0;
    var index = 0;

    function onPan(ev) {
        el.childNodes[1].className = '';
        if (ev.type == 'panend') {
            console.log(transX);
            if (ev.deltaX > 10) {
                if (index != 0){
                    index -=1;
                }
                
            }
            if (ev.deltaX < -10) {
                if (index != 2) {
                    index +=1;
                }
            }
            console.log(index)
            el.childNodes[1].className = 'animation';
            el.childNodes[1].style.transform = 'translate('+index*(-340)+'px, 0px)';
            transX = 0;
        }
        else {
            // console.log(ev);
            console.log(ev);
            var a = ev.deltaX+index*(-340);
            el.childNodes[1].style.transform = 'translate('+a+'px, 0px)';
            transX = ev.deltaX;

        }
        
    };
    var initScale = 1;
    function onPinch(ev) {
        el.childNodes[1].className = '';
        console.log(ev);
        initScale *=ev.scale;
        el.childNodes[1].style.transform = 'scale('+initScale+',' + initScale+')';
        // el.className = '';
        // initScale *= 
        // transform.scale = initScale * ev.scale;
        // el.childNodes[1].style.transform = 'scale()'
    }
}