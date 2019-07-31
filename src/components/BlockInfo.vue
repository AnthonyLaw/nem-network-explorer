<template>
  <div>
    <ol>
      <li>Height : {{blockInfo.height}}</li>
      <li>TimeStamp : {{fmtDate(blockInfo.timeStamp)}}</li>
      <li>Diffculty : {{blockInfo.diffculty}}</li>
      <li>Txes : {{blockInfo.txes}}</li>
      <li>Fees : {{blockInfo.fees}}</li>
      <li>Harvester : {{blockInfo.harvester}}</li>
      <li>Block Hash : {{blockInfo.blockHash}}</li>
      <li>State Hash : {{blockInfo.stateHash}}</li>
    </ol>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "block-info",
  computed: {
    ...mapGetters([
      'blockInfo',
    ]),
  },
  methods: {
    fmtDate(timestamp) {
      return moment(timestamp * 1000).format("YYYY-MM-DD HH:mm:ss");
    },
  }
};
</script>

