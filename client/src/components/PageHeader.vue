<template>
  <div class="full-con gradinet_01 top_head">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <!-- <div class="btn-grp">
                    <a href="#" class="btn active">Nem</a>
                    <a href="#" class="btn">Testnet</a>
          </div>-->
        </div>
        <div class="col-md-6 text-center">
          <a href="#" class="logo">
            <img src="theme/img/logo-w.png" />
          </a>
          <div class="full-con">
            <h1 class="head-titl">Nem network explorer</h1>
            <p class="head-sub-t">Catapult, the next generation of the NEM blockchain</p>
          </div>
          <div class="full-con">
            <div class="search-grp">
              <input type="text" />
              <button type="button">
                <i class="ico-search-1"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <!-- <div class="lang-swtch dropdown">
                    <a class="dropdown-toggle"><i class="flag-icon fl-i-us"></i>English</a>
                    <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item active" href="#"><i class="flag-icon fl-i-us"></i>English</a>
                        <a class="dropdown-item" href="#"><i class="flag-icon fl-i-jp"></i>日本語</a>
                    </div>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PageHeader",
  props: {
    msg: String
  }
};
</script>