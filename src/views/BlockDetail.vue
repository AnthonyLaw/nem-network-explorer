<template>
    <div>
    <div class="full-con mt-4 mob_con">
      <div class="container p-2">
        <div class="widget has-shadow">
          <div class="widget-body node_list_con">
            <h2>Block Detail</h2>
            <block-info />
            <block-transaction-list />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlockInfo from "@/components/BlockInfo"
import BlockTransactionList from "@/components/BlockTransactionList"
export default {
    name: 'BlockDetail',
    components: {
        BlockInfo,
        BlockTransactionList
    },
    methods: {
        fetchBlockInfo() {
            const { blockHeight } = this.$route.params;
            this.$store.dispatch("FETCH_BLOCK_INFO_BY_HEIGHT", blockHeight);
        }
    },
    mounted() {
        this.fetchBlockInfo()
    }
}
</script>

