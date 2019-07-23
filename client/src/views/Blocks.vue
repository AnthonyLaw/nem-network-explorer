<template>
  <div>

    <div class="full-con mt-4 mob_con">
      <div class="container p-2">
        <div class="widget has-shadow">
          <div class="widget-body node_list_con">
            <h2>Blocks</h2>
            <h2>Last Block Height: {{ blocks.currentBlockHeight }}</h2>
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
                      <th>HEIGHT</th>
                      <th>HARVESTER</th>
                      <th>TXES</th>
                      <th>FEES</th>
                      <th>TIMESTAMP</th>
                      <th>AGE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="block in blocks.blockList" v-bind:key="block.id">
                      <td data-idx="2">{{block.height}}</td>
                      <td data-idx="2">{{block.signer.address.address}}</td>
                      <td data-idx="3">{{block.numTransactions ? 'undefine' : 0}}</td>
                      <td data-idx="4">{{block.totalFee}}</td>
                      <td data-idx="4">{{fmtDate(block.timestamp)}}</td>
                      <td data-idx="5">{{compareTime(fmtDate(block.timestamp))}}</td>
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
</template>

<script>
import store from "../store";
import { mapState } from "vuex";
import moment from 'moment';

export default {
  name: "Blocks",
  store,
  computed: {
    ...mapState(["blocks"])
  },
  created() {
    this.$store.dispatch("FETCH_BLOCKS_LIST");
  },
  methods: {
    fmtDate(timestamp) {
      return moment(timestamp * 1000).format("YYYY-MM-DD HH:mm:ss");
    },
    compareTime(blockTimestamp) {
      return moment(blockTimestamp).fromNow();
    }
  }
};
</script>