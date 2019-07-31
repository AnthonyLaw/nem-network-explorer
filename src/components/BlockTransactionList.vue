<template>
  <div>
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
              <th>TYPE</th>
              <th>Sender / Recipient</th>
              <th>FEES</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tx, index) in transactionList" :key="index">
              <td data-idx="2">
                <router-link
                  :to="{ name: 'transaction-detail', params: { txId: tx.transactionInfo.hash }}"
                >{{ index + 1}}</router-link>
              </td>
              <td data-idx="2">{{tx.type}}</td>
              <td data-idx="2">{{tx.signer.address.address}} {{tx.recipient ? '/ ' + tx.recipient.address : '' }}
              </td>
               <td data-idx="2">{{tx.maxFee}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "block-transaction-list",
  computed: {
    ...mapGetters([
      'transactionList',
    ]),
  },
  methods: {
    fmtDate(timestamp) {
      return moment(timestamp * 1000).format("YYYY-MM-DD HH:mm:ss");
    },
  }
};
</script>
