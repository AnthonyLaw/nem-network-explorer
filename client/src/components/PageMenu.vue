<template>
  <header class="ex-header bg01">
    <div class="container n-p">
      <div class="row flex-nowrap justify-content-between align-items-center">
        <div class="col-md-1 logo-wrap">
          <a href="#" class="logo-h">
            <img src="theme/img/logo-w.png" alt="Nem" />
          </a>
        </div>
        <div class="col-md-8">
          <div class="nav-con">
            <ul class="nav-menu">
              <li>
                <router-link :to="{ name: 'home'}" exact active-class="active">Nodes</router-link>|
              </li>
              <li>
                <router-link :to="{ name: 'network-stat'}" active-class="active">Network Stat</router-link>
              </li>
               <li>
                <!-- <router-link :to="{ name: 'map'}" active-class="active">Map</router-link> -->
                <router-link to="/map" active-class="active">Map</router-link>
              </li>
              <li>
                <router-link :to="{ name: 'blocks' }" active-class="active">Blocks</router-link>
                <!-- <router-link to="/blocks" active-class="active">Blocks</router-link> -->
              </li>
            </ul>
          </div>
        </div>
        <!-- <div class="col-md-3 lang-swtchwrap">
                    <div class="lang-swtch dropdown ">
                        <a class="dropdown-toggle"><i class="flag-icon fl-i-us"></i>English</a>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item active" href="#"><i class="flag-icon fl-i-us"></i>English</a>
                            <a class="dropdown-item" href="#"><i class="flag-icon fl-i-jp"></i>日本語</a>
                        </div>
                    </div>
        </div>-->
      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: "PageMenu",
  props: {
    msg: String
  }
};
</script>
