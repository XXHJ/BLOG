<template>
  <div id="content">
    <div
      class="article_wrap"
      v-for="(item, index) in articleList"
      :key="index"
    >
      <div
        @click="articleEdit(item._id)"
        class="article_title"
      >{{ item.title }}</div>
      <div class="article_info">
        <span class="article_info_date">发表于：{{ item.date }}</span>
        <span class="article_info_label">
          标签：
          <span v-if="item.labels.length === 0">未分类</span>
          <el-tag
            v-else
            class="tag_margin"
            type="primary"
            v-for="(tag, i) in item.labels"
            :key="i"
          >{{ tag }}</el-tag>
        </span>
      </div>
      <div class="article_gist">{{ item.gist }}</div>
      <div>
        <div
          @click="articleEdit(item._id)"
          class="article_button edit"
        >修改</div>
        <div
          @click="deleteArticle(item._id)"
          class="article_button delete"
        >删除</div>
      </div>
      <div class="article_underline"></div>
    </div>
  </div>
</template>

<script>
import { article } from '../../api/index'
export default {
  name: 'articless',
  data () {
    return {
      articleList: [],
    }
  },
  created: function () {
    let userId = sessionStorage.getItem('userId')
    if (userId) {
      // 获取文章列表
      article.userArticle({ userId }).then(res => {
        if (res.status === 200) {
          this.articleList = res.data
        }
      })
    } else {
      this.$router.push('/admin/signin')
    }

  },
  methods: {
    // 跳转至文章编辑页
    articleEdit: function (id) {
      this.$router.push('/admin/articleEdit/' + id)
    },
    // 删除文章
    deleteArticle: function (id) {
      let self = this
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        article.deleteArticle({
          _id: id
        }).then(res => {
          if (res.status === 200) {
            self.$message({
              type: 'success',
              message: '删除成功!'
            });
            self.fetchData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 更新数据
    fetchData: function () {
      article.articleList().then(res => {
        if (res.status === 200) {
          this.articleList = res.data
        }
      })
    }
  }
}
</script>

<style>
.edit:hover {
  background: limegreen;
  color: white;
  font-weight: 600;
}

.delete:hover {
  background: red;
  color: white;
  font-weight: 600;
}
</style>
