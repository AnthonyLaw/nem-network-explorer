<template>
  <div>
    <link rel="stylesheet" href="theme/css/leaflet.css" />
    <div class="page_con">
      <div class="full-con mt-5 mob_con">
        <div class="container p-2">
          <div class="widget has-shadow">
            <div class="widget-body node_map_con">
              <div id="map" style="height: 600px;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script src="theme/js/leaflet.min.js" type="application/javascript" onload="init_map()"></script>
    <script type="application/javascript">
      function init_map(){
         (function(k) {
    var cities = L.layerGroup();
    var mbAttr = "",
      mbUrl =
        "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";

    var grayscale = L.tileLayer(mbUrl, {
        id: "mapbox.light",
        attribution: mbAttr
      }),
      streets = L.tileLayer(mbUrl, {
        id: "mapbox.streets",
        attribution: mbAttr
      });

    var map = L.map("map", {
      center: [39.73, 60],
      zoom: 3,
      layers: [grayscale, cities]
    });

    var baseLayers = {
      Grayscale: grayscale,
      Streets: streets
    };

    var overlays = {
      Cities: cities
    };
    var greenIcon = L.icon({
      iconUrl: "/theme/img/node-ico.png",
      shadowUrl: "leaf-shadow.png",
      iconSize: [25, 36],
      iconAnchor: [25, 36]
    });
    Object.keys({{this.node_list}}).forEach(function(key) {
       var item = {{this.node_list}}[key];
      console.log(item);
      frn_name = ' ';
      if( typeof(item.nodeinfo.friendlyName)!=undefined)
      frn_name = item.nodeinfo.friendlyName;

      L.marker([item.latitude, item.longitude], { icon: greenIcon }).addTo(map).bindPopup('Server name : '+ frn_name +
      '<br> IP :  '+key + ' <br>'+ item.region +' '+item.country);
    });
  })(jQuery);

      }
    </script>
  </div>
</template>
<script>
import nodelist from "../../../server/data/nodelist.json";
export default {
  name: "Map",
  data() {
    return {
      node_list: nodelist
    };
  },

  mounted() {}
};
</script>
