window.onload = function () {
    var el = document.getElementById('iSlider');
    var ham = new Hammer.Manager(el);
    ham.add(new Hammer.Pan({ threshold: 0 }));
    ham.on('pan', onPan);
    function onPan() {
        
    }
}