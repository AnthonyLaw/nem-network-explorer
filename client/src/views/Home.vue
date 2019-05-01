<template>
  <div>
    <top-header></top-header>
    <page-menu></page-menu>
    <div class="page_con">
      <div class="full-con mt-5 mob_con">
        <div class="container">
          <div class="row chain_info_sync">
            <div class="col-lg-3 col-md-6 col-sm-6 row-eq-height p-2 block_01">
              <tile-widjet ItemTitle="Block Height (Last Block)" ItemData itemThumb="ico-block-ch"></tile-widjet>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 row-eq-height p-2 block_01">
              <tile-widjet ItemTitle="Nodes Online (now)" ItemData itemThumb="ico-nodes"></tile-widjet>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 row-eq-height p-2 block_01">
              <tile-widjet
                ItemTitle="0 seconds ago"
                ItemData="Last Block (ago)"
                itemThumb="ico-lst-blk"
              ></tile-widjet>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 row-eq-height p-2 block_01">
              <tile-widjet ItemTitle="Node Avg Response Time" ItemData=" " itemThumb="ico-res-time"></tile-widjet>
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
                      <tr data-s-ip>
                        <td data-idx="1">1</td>
                        <td data-idx="2"></td>
                        <td data-idx="3"></td>
                        <td data-idx="4"></td>
                        <td data-idx="5"></td>
                        <td data-idx="6"></td>
                        <td data-idx="7"></td>
                        <td data-idx="9"></td>
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
    <page-footer></page-footer>
    <script type="application/javascript" src="theme/js/datatable.min.js"></script>
    <script type="application/javascript">
      $(document).ready(function () {
        var dt = $('#table-nodes-list').DataTable({
            "lengthMenu": [
                [10, 15, 20, -1],
                [10, 15, 20, "All"]
            ],
            "order": [
            ]
        });
      });
        
      </script>
      
  </div>
</template>
<script>
import tileWidjet from "@/components/widjet01.vue";
export default {
  name: "home",
  components: {
    "tile-widjet": tileWidjet
  },

};
</script>

