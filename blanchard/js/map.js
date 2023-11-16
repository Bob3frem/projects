ymaps.ready(init);
function init(){
  var myMap = new ymaps.Map("myMap", {
    center: [55.759653, 37.614734],
    zoom: 15,
    controls: [],
  },
  {
    suppressMapOpenBlock: true,
  }
  );

  myMap.controls.add('zoomControl', {
    size: 'medium',
    float: 'none',
    position: {
        top: '260px',
        right: '30px'
    }
  });

  myMap.controls.add('geolocationControl', {
    size: 'medium',
    float: 'none',
    position: {
        bottom: '338px',
        right: '30px'
    }
  });


  var myPlacemark = new ymaps.Placemark([55.759653, 37.614734], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/mapImg.svg',
    iconImageSize: [20, 20],
  });

  myMap.geoObjects.add(myPlacemark)
}
