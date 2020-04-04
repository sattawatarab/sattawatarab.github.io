var VT = new ol.layer.VectorTile({
          source: new ol.source.VectorTile({
            format: new ol.format.MVT(),
            //url:'http://localhost:8080/data/toris-point/{z}/{x}/{y}.pbf'
            url:'http://tictile.mots.go.th/5e68570b96bb6b8cc288741a/{z}/{x}/{y}'
            // url:'http://192.168.1.38:30055/5e68570b96bb6b8cc288741a/{z}/{x}/{y}'
          })
        });


var osm = new ol.layer.Tile({
      source: new ol.source.OSM()
    });
    

var map = new ol.Map({
  target: 'map',
  layers: [
    osm,
    VT
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([100.569181, 13.691994]),
    zoom: 6.25
  })
});

map.on('pointermove', showInfo);

var info = document.getElementById('info');
      function showInfo(event) {
        var features = map.getFeaturesAtPixel(event.pixel);
        if (!features) {
          info.innerText = '';
          info.style.opacity = 0;
          return;
        }
        var properties = features[0].getProperties();
        info.innerText = JSON.stringify(properties, null, 2);
        info.style.opacity = 1;
      }