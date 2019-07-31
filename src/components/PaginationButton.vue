<template>
  <div>
    <button v-if="showPreviousLink()" @click="previousPage()">Prev</button>

    <button v-if="showNextLink()" @click="nextPage()">Next</button>
  </div>
</template>

<script>
export default {
  name: "pagination-button",
  computed: {
    totalBlocks() {
      return this.$store.state.blocks.currentBlockHeight;
    },
  },
  methods: {
    showPreviousLink() {
      return this.$store.state.blocks.currentPage <= 1 ? false : true;
    },
    showNextLink() {
      let block = this.$store.state.blocks.blockList.filter(block => {
        return block.height == 1;
      });
      return block.length >= 1 ? false : true;
    },
    nextPage() {
      let blocks = this.$store.state.blocks;
      blocks.currentPage++;
      let block = blocks.blockList[blocks.blockList.length - 1];
      this.$store.dispatch("FETCH_BLOCKS_LIST_BY_HEIGHT", block.height - 1);
    },
    previousPage() {
      let blocks = this.$store.state.blocks;
      if (blocks.currentPage > 1) {
        blocks.currentPage--;
        let block = blocks.blockList[0];
        this.$store.dispatch("FETCH_BLOCKS_LIST_BY_HEIGHT", block.height + 1);
      }
    }
  },
  mounted() {
    this.showPreviousLink(),
    this.showNextLink()
  }
};
</script>
