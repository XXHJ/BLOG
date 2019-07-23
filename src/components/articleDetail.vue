<template>
  <div id="content">
    <div class="article_wrap">
      <div>
        <el-button
          style="float: left;"
          icon="arrow-left"
          size="small"
          @click="goBack"
        >返回</el-button>
      </div>
      <div class="article_title article_detail_title">{{ article.title }}</div>
      <div class="article_info">
        <span class="article_info_date">发表于：{{ article.date }}</span>
        <span class="article_info_label">
          标签：
          <span v-if="article.labels.length === 0">未分类</span>
          <el-tag
            v-else
            class="tag_margin"
            type="primary"
            v-for="(tag, i) in article.labels"
            :key="i"
          >{{ tag }}</el-tag>
        </span>
      </div>
      <div
        class="article_detail_content"
        v-html="compiledMarkdown()"
      ></div>
    </div>
    <div class="comment">
      <p class="comment-title">评论区:</p>
      <div class="comment-title">
        <div
          class="comment-item"
          v-for="(item, index) in commentsList"
          :key="index"
        >
          <div class="c-user">{{item.username}}</div>
          <div class="c-text">{{item.comment}}</div>
          <div class="c-date">
            {{item.createDate}}
            <el-tooltip
              class="item"
              effect="dark"
              content="删除评论"
              placement="top"
            >
              <i
                @click="delCom(item._id)"
                class="el-icon-delete"
              ></i>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="comment-title">
        <el-input
          style="outline: none;"
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="textarea"
        ></el-input>
      </div>
      <p class="sum_bnt">
        <el-button
          class="bnt"
          type="primary"
          @click="saveCom"
        >提交评论</el-button>
      </p>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import highlight from 'highlight.js'
import { article, comment } from '../api/index'
marked.setOptions({
  highlight: function (code) {
    return highlight.highlightAuto(code).value
  }
})
export default {
  name: 'articleDetail',
  data () {
    return {
      article: {
        title: '',
        date: '',
        labels: [],
      },
      textarea: '',
      commentsList: []
    }
  },
  created () {
    let id = this.$route.params.id
    this.articleDetail(id)
    this.comList(id)
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    articleDetail (id) {
      article.articleDetail({ id }).then(res => {
        if (res.status === 200) {
          this.article = res.data
        }
      })
    },
    compiledMarkdown: function () {
      return marked(this.article.content || '', { sanitize: true })
    },
    // 删除评论
    delCom (id) {
      comment.delCom({ id }).then(res => {
        if (res.status === 200) {
          this.comList(this.$route.params.id)
        }
      })
    },
    // 获取发表时间
    getDate () {
      let mydate, y, m, d, hh, mm, ss;
      mydate = new Date()
      y = mydate.getFullYear()
      m = mydate.getMonth()
      d = mydate.getDate()
      hh = mydate.getHours()
      mm = mydate.getMinutes()
      ss = mydate.getSeconds()
      if (m < 10) m = '0' + m
      if (d < 10) d = '0' + d
      if (hh < 10) hh = '0' + hh
      if (mm < 10) mm = '0' + mm
      if (ss < 10) ss = '0' + ss
      return (y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss)
    },
    // 提交评论
    saveCom () {
      if (!this.textarea.trim()) return false;
      let data = {
        articleId: this.$route.params.id,
        username: sessionStorage.getItem('username'),
        comment: this.textarea.trim(),
        createDate: this.getDate()
      }
      comment.saveCom(data).then(res => {
        if (res.status === 200) {
          this.textarea = ''
          this.comList(data.articleId)
        }
      })
    },
    // 获取评论
    comList (articleId) {
      comment.comList({ articleId }).then(res => {
        if (res.status === 200) {
          this.commentsList = res.data
        }
      })
    }
  }
}
</script>

<style scoped>
@import "../assets/atom-one-light.css";

.article_detail_title {
  cursor: default;
  margin: 40px 0 0;
}

.article_detail_content {
  text-align: left;
  padding: 60px 8px;
  font-size: 18px;
}

.comment {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  text-align: left;
}
.comment-title {
  margin: 8px;
}
.comment-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  padding: 8px 0;
  font-size: 14px;
  color: #666;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
.c-user {
  width: 100px;
  text-align: center;
  margin-top: 3px;
}
.c-text {
  flex: 1;
  margin-left: 8px;
  margin-right: 8px;
}
.c-date {
  width: 150px;
  margin-top: 3px;
}
.sum_bnt {
  margin: 8px;
  overflow: hidden;
}
.bnt {
  float: right;
}
</style>
