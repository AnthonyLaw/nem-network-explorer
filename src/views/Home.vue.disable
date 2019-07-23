<template>
  <div>
    <div class="page_con">
      <div class="full-con mt-5 mob_con">
        <div class="container">
          <div class="row chain_info_sync">
            <div class="col-lg-3 col-md-6 col-sm-6 row-eq-height p-2 block_01">
              <tile-widjet
                ItemTitle="Block Height (Last Block)"
                :ItemData="chain_info.chain_height"
                itemThumb="ico-block-ch"
              ></tile-widjet>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 row-eq-height p-2 block_01">
              <tile-widjet
                ItemTitle="Nodes Online (now)"
                :ItemData="node_online_tot"
                itemThumb="ico-nodes"
              ></tile-widjet>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 row-eq-height p-2 block_01">
              <tile-widjet
                :ItemTitle="last_block_time"
                ItemData="Last Block (ago)"
                itemThumb="ico-lst-blk"
              ></tile-widjet>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 row-eq-height p-2 block_01">
              <tile-widjet
                ItemTitle="Node Avg Response Time"
                :ItemData="avg_resp_time"
                itemThumb="ico-res-time"
              ></tile-widjet>
            </div>
          </div>
        </div>
      </div>
      <div class="full-con mt-4 mob_con">
        <div class="container p-2">
          <div class="widget has-shadow">
            <div class="widget-body node_list_con">
              <div class="table-responsive">
                <div
                  id="sorting-table_wrapper"
                  class="dataTables_wrapper container-fluid dt-bootstrap4 no-footer"
                >
                  <table
                    id="table-nodes-list"
                    class="table table-striped table-bordered"
                    cellspacing="0"
                    width="100%"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <!-- <th>Internet Service Provider</th> -->
                        <th>Server Name</th>
                        <th>Resolved IP</th>
                        <th>Version</th>
                        <th>Location</th>
                        <th>Internet Service Provider</th>
                        <th>Height</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, key, index) in node_list " :key="index">
                        <td data-idx="1">{{index+1}}</td>

                        <td data-idx="2" v-if="item.nodeinfo">{{item.nodeinfo.friendlyName}}</td>
                        <td data-idx="2" v-else="item.nodeinfo">Unknown</td>

                        <td data-idx="3">{{ key }}</td>
                        <td data-idx="4" v-if="item.nodeinfo">{{item.nodeinfo.version}}</td>
                        <td data-idx="4" v-else="item.nodeinfo">-</td>

                        <td data-idx="5">{{item.country}}</td>
                        <td data-idx="6">{{item.isp}}</td>
                        <td data-idx="7">{{item.chain_height}}</td>
                        <td data-idx="9" v-if="item.status === 1 ">Online</td>
                        <td v-else>Offline</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script type="application/javascript">
  $(document).ready(function() {
    var dt = $("#table-nodes-list").DataTable({
      lengthMenu: [[10, 15, 20, -1], [10, 15, 20, "All"]],
      order: []
    });
  });
    </script>
  </div>
</template>
<script>
import tileWidjet from "@/components/widjet01.vue";
import axios from "axios";
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
    getData(filename) {
      axios
        .all([
          axios.get(conf.api_url + "api/chain_info"),
          axios.get(conf.api_url + "api/node_list")
        ])
        .then(axios.spread((res1, res2) => {}))
        .catch(error => {
          console.log();
        });
    },
    doNodesOnlineMath: function(index) {
      var node_online_tot = 0;
      var avg_resp_time = 0;
      Object.keys(nodelist).forEach(function(key) {
        var item = nodelist[key];
        if (item.status == 1) node_online_tot++;
        if (item.resp_time) avg_resp_time = avg_resp_time + item.resp_time;
      });
      this.node_online_tot = node_online_tot;
      this.avg_resp_time =
        (avg_resp_time / node_online_tot).toFixed(2) + " (MS)";
    },
    timeDifference: function(previous, current = new Date()) {
      var msPerMinute = 60 * 1000;
      var msPerHour = msPerMinute * 60;
      var msPerDay = msPerHour * 24;
      var msPerMonth = msPerDay * 30;
      var msPerYear = msPerDay * 365;

      var elapsed = current - previous;

      if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + " seconds ago";
      } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + " minutes ago";
      } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + " hours ago";
      } else if (elapsed < msPerMonth) {
        return "approximately " + Math.round(elapsed / msPerDay) + " days ago";
      } else if (elapsed < msPerYear) {
        return (
          "approximately " + Math.round(elapsed / msPerMonth) + " months ago"
        );
      } else {
        return (
          "approximately " + Math.round(elapsed / msPerYear) + " years ago"
        );
      }
    }
  },
  mounted() {
    this.doNodesOnlineMath();
    this.last_block_time = this.timeDifference(this.chain_info.last_block_time);
  }
};
</script>