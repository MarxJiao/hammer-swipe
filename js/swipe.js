function a() {
    var el = document.getElementById('iSlider');
    console.log(el.childNodes[1]);
    var ham = new Hammer.Manager(el);
    ham.add(new Hammer.Pan({ threshold: 0 }));
    ham.on('pan panend', onPan);
    var transX = 0;
    function onPan(ev) {
        if (ev.type = 'panend') {
            console.log(transX);
        }
        // console.log(ev);
        console.log(ev.velocityX);
        transX += ev.velocityX;
        el.childNodes[1].style.transform = 'translate('+transX*100+'px, 0px)';
    }
}