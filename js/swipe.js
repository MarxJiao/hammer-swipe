function a() {
    var el = document.getElementById('iSlider');
    var holder = document.getElementById("holder");
    console.log(el.childNodes[1]);
    var ham = new Hammer.Manager(el);
    ham.add(new Hammer.Pan({ threshold: 1 }));
    ham.add(new Hammer.Pinch()).dropRecognizeWith(ham.get('pan'));
    ham.on('pan panend', onPan);
    ham.on('pinch pinchout pinchin pinchend', onPinch);
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
        
    };


    var initScale = 1;
    function onPinch(ev) {
        if (ev.target.localName == 'img') {
            
            // ev.target.style.transform = 'scale('+ev.scale*initScale+',' + ev.scale*initScale+')';
            
            if (ev.type == 'pinchend') {
                if (imgTransform.scale < 1) {
                    ev.target.className = 'animation';
                    imgTransform.scale = 1;
                    updateImgTransform(ev.target);
                }
                setTimeout(function () {
                    pinching = 0;
                },100);
            }
            else {

                pinching = 1;
            ev.target.className = '';
            console.log(ev);
            // initScale = ev.scale;
            // alert(initScale);
            // if (ev.type == 'pinchout'){
                if(imgTransform.scale > 3){
                    imgTransform.scale = 3;
                }
                else {
                    imgTransform.scale = ev.scale -1 + imgTransform.scale;
                // imgTransform.scale = ev.scale;
            }
            // }
            // else if (ev.type == 'pinchin'){
                if (imgTransform.scale <= 0.5){
                    imgTransform.scale = 0.5;
                }
            // }
            // else {
            //         imgTransform.scale = (ev.scale-1)/imgTransform.scale + imgTransform.scale;
            //     // imgTransform.scale = ev.scale;
            // }
            
            updateImgTransform(ev.target);


            }
            
        }
    }
}