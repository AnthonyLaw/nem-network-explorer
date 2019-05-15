<template>
  <div>
    <top-header></top-header>
    <page-menu></page-menu>
    <div class="page_con">
      <div class="full-con mt-5">
        <div class="container">
          <div class="row">
            <div class="page-header">
              <div class="d-flex align-items-center">
                <h2 class="page-header-title">Node Monitor</h2>
              </div>
            </div>
          </div>
          <div class="widget has-shadow">
            <div class="widget-body">
              <div class="chart">
                <canvas id="node-monitor01" height="80"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="full-con mt-1">
        <div class="container">
          <div class="row">
            <div class="col-xl-6">
              <div class="widget has-shadow">
                <div class="widget-header bordered d-flex align-items-center">
                  <h4>NEM unique harvesters daily chart</h4>
                </div>
                <div class="widget-body">
                  <div class="chart">
                    <canvas id="nem-uqharvstr" height="100"></canvas>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-6">
              <div class="widget has-shadow">
                <div class="widget-header bordered d-flex align-items-center">
                  <h4>NEM transactions per day chart</h4>
                </div>
                <div class="widget-body">
                  <div class="chart">
                    <canvas id="nem-transc" height="100"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-6">
              <div class="widget has-shadow">
                <div class="widget-header bordered d-flex align-items-center">
                  <h4>NEM accounts over time</h4>
                </div>
                <div class="widget-body">
                  <div class="chart">
                    <canvas id="nem-accnts" height="100"></canvas>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-6">
              <div class="widget has-shadow">
                <div class="widget-header bordered d-flex align-items-center">
                  <h4>NEM average block difficulty per day</h4>
                </div>
                <div class="widget-body">
                  <div class="chart">
                    <canvas id="nem-avg-dfclty" height="100"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <page-footer></page-footer>
     <script type="application/javascript" src="/theme/js/chart.min.js" onload="init_charts()"></script>
    <script type="application/javascript">
      function init_charts(){
         var el = document.createElement('script');
         el.src = "theme/js/data_config.js";
         document.body.appendChild(el);
      }
    </script>
  </div>
</template>
<script>
import tileWidjet from "@/components/widjet01.vue";
import axios from "axios";
import nem2 from "nem2-sdk";
import nodelist from "../../../server/data/nodelist.json";
import mother_nodeinfo from "../../../server/data/mother_node_info.json";
export default {
  name: "home",
  components: {
    "tile-widjet": tileWidjet
  },
  data() {
    return {
      chain_info: mother_nodeinfo,
      node_list: nodelist,
      node_online_tot: 0,
      avg_resp_time: 0,
      last_block_time: "0 Seconds ago"
    };
  },
  methods: {
    
  },
  mounted() {
    // let ckeditor = document.createElement("script");
    // ckeditor.setAttribute("src", "/theme/js/chart.min.js");
    // document.head.appendChild(ckeditor);


  }
};
</script>