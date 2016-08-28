function a() {
    var el = document.getElementById('iSlider');
    console.log(el.childNodes[1]);
    var ham = new Hammer.Manager(el);
    ham.add(new Hammer.Pan({ threshold: 1 }));
    ham.add(new Hammer.Pinch()).dropRecognizeWith(ham.get('pan'));
    ham.on('pan panend', onPan);
    ham.on('pinch pinchend', onPinch);
    var pinching = 0;
    var transX = 0;
    var index = 0;

    var holderTransform = {
        translate: { x: 0, y: 0 },
        scale: 1,
        angle: 0,
        rx: 0,
        ry: 0,
        rz: 0
    };
       

    function updateElementTransform() {
        var value = [
            'translate3d(' + holderTransform.translate.x + 'px, ' + holderTransform.translate.y + 'px, 0)',
            'scale(' + holderTransform.scale + ', ' + holderTransform.scale + ')',
            'rotate3d('+ holderTransform.rx +','+ holderTransform.ry +','+ holderTransform.rz +','+  holderTransform.angle + 'deg)'
        ];

        value = value.join(" ");
        // el.textContent = value;


        el.childNodes[1].style.transform = value;
        ticking = false;
    }

    var imgTransform = {
        translate: { x: 0, y: 0 },
        scale: 1,
        angle: 0,
        rx: 0,
        ry: 0,
        rz: 0
    }; 

    function updateImgTransform(img) {
        var value = [
            'translate3d(' + imgTransform.translate.x + 'px, ' + imgTransform.translate.y + 'px, 0)',
            'scale(' + imgTransform.scale + ', ' + imgTransform.scale + ')',
            'rotate3d('+ imgTransform.rx +','+ imgTransform.ry +','+ imgTransform.rz +','+  imgTransform.angle + 'deg)'
        ];

        value = value.join(" ");
        img.style.webkitTransform = value;
        img.style.mozTransform = value;
        img.style.transform = value;
        ticking = false;
    }
    var startImgX = 0;
    var startImgY = 0;
    function onPan(ev) {
        if (pinching) {
            return;
        }
        if (initScale>1) {
            imgTransform.translate.x = ev.deltaX + startImgX;
            imgTransform.translate.y = ev.deltaY + startImgY;
            startImgX =imgTransform.translate.x;
            startImgY =imgTransform.translate.y;
            updateImgTransform(ev.target);
            return;
        }
        
        el.childNodes[1].className = '';
        if (ev.type == 'panend') {
            console.log(transX);
            if (ev.deltaX >50) {
                if (index != 0){
                    index -=1;
                }
                
            }
            if (ev.deltaX < -50) {
                if (index != 2) {
                    index +=1;
                }
            }
            el.childNodes[1].className = 'animation';
            ev.target.className = 'animation';
           
            holderTransform.translate.x = index*(-340);
            alert('index :'+index)
            alert('x:' + holderTransform.translate.x);
            updateElementTransform();
            alert('x2:' + holderTransform.translate.x);
            imgTransform = {
                translate: { x: 0, y: 0 },
                scale: 1,
                angle: 0,
                rx: 0,
                ry: 0,
                rz: 0
            }; 
            updateImgTransform(ev.target);
            transX = 0;
        }
        else {
            holderTransform.translate.x = ev.deltaX + index*(-340);
            updateElementTransform()
        }
        
    };


    var initScale = 1;
    function onPinch(ev) {
        if (ev.target.localName == 'img') {
            pinching = 1;
            ev.target.className = '';
            console.log(ev);
            // initScale = ev.scale;
            // alert(initScale);
            imgTransform.scale *= ev.scale;
            updateImgTransform(ev.target);
            // ev.target.style.transform = 'scale('+ev.scale*initScale+',' + ev.scale*initScale+')';
            
            if (ev.type == 'pinchend') {
                if (imgTransform.scale < 1) {
                    ev.target.className = 'animation';
                    imgTransform.scale = 1;
                    updateImgTransform(ev.target);
                }
                setTimeout(function () {
                    pinching = 0;
                },10);
            }
            
        }
    }
}