function a() {
    var el = document.getElementById('iSlider');
    var holder = document.getElementById("holder");
    console.log(el.childNodes[1]);
    var ham = new Hammer.Manager(el);
    ham.add(new Hammer.Pan({ threshold: 1 }));
    ham.add(new Hammer.Pinch()).dropRecognizeWith(ham.get('pan'));
    ham.on('panstart panmove panend', onPan);
    ham.on('pinchstart pinchin pinchout pinchend', onPinch);
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
        holder.style.transform = value;
        console.log(holder.style.transform);
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
        if (ev.target.localName == 'img') {
            // if (pinching) {
            //     imgTransform.translate.x = 
            //     return;
            // }
            if (imgTransform.scale>1 &&pinching==1) {
                var img = ev.target;
                if (ev.type == 'panstart') {
                    startImgX =  imgTransform.translate.x;
                    startImgY =  imgTransform.translate.y;
                    startX = ev.center.x;
                    startY = ev.center.y;
                    imgTransform.scale
                }
                if (startX * imgTransform.scale - startX <= imgTransform.translate.x 
                    || (img.offsetWidth - startX )*(imgTransform.scale - 1) <= -imgTransform.translate.x) {
                    
                    ev.deltaX =0;
                    pinching=0;

                    return;
                }
                imgTransform.translate.x = ev.deltaX + startImgX;
                // imgTransform.translate.y = ev.deltaY + startImgY;
                // startImgX =imgTransform.translate.x;
                // startImgY =imgTransform.translate.y;
                updateImgTransform(ev.target);
                return;
            }
            console.log(ev);
            el.childNodes[1].className = '';
            if (ev.type == 'panend') {
                console.log(transX);
                _index = index;
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
                if (_index == index) {
                    if (index == 0 || index == 2) {
                        holder.className = 'animation';
                        holderTransform.translate.x = index*(-340);
                        updateElementTransform();
                    }
                    return;
                }
                el.childNodes[1].className = 'animation';
                ev.target.className = 'animation';
            
                holderTransform.translate.x = index*(-340);
                updateElementTransform();
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
        }
    };


    var initScale = 1;
    function onPinch(ev) {
        if (ev.target.localName == 'img') {
            pinching = 1;
            if(ev.type == 'pinchstart') {
                initScale = imgTransform.scale || 1;
            }
            if (ev.type == 'pinchend') {
                
                setTimeout(function () {
                    pinching = 1;
                    ev.target.className = '';
                },100);
            }
            else {
                if(imgTransform.scale > 3){
                    imgTransform.scale = 2.999;
                }
                else {
                    imgTransform.scale = initScale* ev.scale;
                }
                if (imgTransform.scale <= 0.5){
                    imgTransform.scale = 0.5;
                }
                updateImgTransform(ev.target);
            }
            
        }
    }
}