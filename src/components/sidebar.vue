<template>
  <div id="left_menu">
    <div class="menu_name">
      <h1>LeDng'S NOTES</h1>
      <h5>不如去骑车</h5>
    </div>
    <nav>
      <ul>
        <router-link to="/article">
          <li class="nav">
            <span>首页</span>
          </li>
        </router-link>
        <router-link to="/about">
          <li class="nav">
            <span>关于</span>
          </li>
        </router-link>
        <router-link to="/admin/signin">
          <li class="nav">
            <span>登录</span>
          </li>
        </router-link>
        <router-link to="/admin/articleList">
          <li class="nav">
            <span>管理</span>
          </li>
        </router-link>
        <router-link to="/admin/articleEdit">
          <li class="nav">
            <span>写文章</span>
          </li>
        </router-link>
      </ul>
    </nav>
    <div class="info">
      <img
        src="../assets/head.jpg"
        alt="head"
      />
      <div class="info_name">LEDNG</div>
      <div class="archive">
        <ul>
          <router-link to="/article">
            <li>
              <span class="archive_count">{{ articleNumber }}</span>
              <span class="archive_name">文章</span>
            </li>
          </router-link>
        </ul>
      </div>
      <ul class="communication">
        <li class="communication_item">
          <a href="https://github.com/XXHJ">
            <span>GitHub</span>
          </a>
        </li>
        <li class="communication_item">
          <a href="https://www.zhihu.com/people/liang-nian-zhi-hou/activities">
            <span>知乎</span>
          </a>
        </li>
        <li class="communication_item">
          <a href="https://www.jianshu.com/u/eef746eb5096">
            <span>简书</span>
          </a>
        </li>
        <li class="communication_item">
          <a href="https://gitee.com/LeDng/events">
            <span>Codeing</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { article } from '../api/index'
export default {
  name: 'sidebar',
  data () {
    return {
      articleNumber: ''
    }
  },
  created: function () {
    article.articleList().then(res => {
      if (res.status === 200) {
        this.articleNumber = res.data.length
      }
    })
  }
}
</script>

<style scoped>
#left_menu {
  float: left;
  width: 240px;
  margin-right: 20px;
}

@media (max-width: 767px) {
  #left_menu {
    display: none;
  }
}

#left_menu a:hover {
  color: #222;
  background: #f5f7f9;
}

.menu_name {
  background: rgb(38, 42, 48);
  color: white;
  padding: 10px 0;
}

nav {
  background: white;
  padding: 20px 0;
}

.nav {
  padding: 8px 20px;
  text-align: left;
}

.info {
  margin-top: 10px;
  padding: 20px;
  background: white;
}

.info_name {
  font-weight: 600;
  padding: 5px;
}

.info img {
  width: 120px;
  height: 120px;
}

.archive {
  padding-top: 20px;
}

.archive .archive_count {
  display: block;
  color: #222;
  font-weight: 600;
  font-size: 16px;
}

.archive .archive_name {
  display: block;
  color: #999;
  font-size: 14px;
}

.communication {
  padding-top: 20px;
}

.communication_item {
  display: inline-block;
  width: 40%;
  font-size: 14px;
  font-weight: 600;
  margin: 3px;
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
