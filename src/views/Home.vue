<template>
    <div class="home">
      <div class="_home-wrapper-img-block pt-3">
        <img class="img-responsive" src="@/assets/img/NoPath@2x.png" alt="main-bg">
      </div>
      <div class="_home-wrapper-content-main">
        <div class="_home-wrapper-content">
          <div class="_wrapper-block-main-h">
            <h1>Beautiful landscape</h1>
          </div>
          <div class="_wrapper-block-main-btn">
            <button class="btn btn-default" disabled><img src="@/assets/img/icons/cash.svg" class="pr-2"/>Donate Author</button>
          </div>
        </div>
        <div class="_wrapper-home-input">
          <div class="input-group mb-3 input-group-custom">
            <input type="text" class="form-control" placeholder="Write a new comment" aria-label="Recipient's username" aria-describedby="button-addon2" v-model="handlerCommit">
            <div class="input-group-append">
              <button class="btn btn-outline-primary" type="button" id="button-addon2" v-if="visible" @click.prevent="addCommit"><img class="pr-2" src="@/assets/img/icons/paper-plane.svg" alt=""/>Send</button>
            </div>
          </div>
        </div>
        <div class="_wrapper-home-main-comit-block">
          <div v-if="usersCommit.length">
            <div class="wrapper-user-comit mt-2 mb-2" v-for="(user, index) in usersCommit" :key="user.userId">
              <div class="wrapper-block-buttons-comit mr-3 " v-if="user.isShow &&!user.isShowInput">
                <button class="btn btn-actions-commit text-edit mr-3 ml-3" @click.prevent="editCommit(index)"><img src="@/assets/img/icons/001-edit.svg" class="pr-2 " alt="Edit" />Edit</button>
                <button class="btn btn-actions-commit text-delete" @click.prevent="deleteCommit(index, user.userId)" ><img src="@/assets/img/icons/002-rubbish-bin.svg"  class="pr-2" alt="Edit" />Delete</button>
              </div>
              <a href="" @click.prevent="redactCommit(index)">
                <div class="_wrapper-user-icons pr-3 pl-3" v-show="user.visibleEdit">
                  <img :src="user.userAvatar" class="commit-icons" alt="users">
                </div>
                <div class="wrapper-message-commit " v-show="user.visibleEdit">
                  <span>{{user.userName}} {{index}}</span>
                  <p>{{user.handlerCommit}}</p>
                </div>
                <div class="input-group input-group-custom" v-if="user.isShowInput" :tabindex="index" ref="inputEdit">
                  <input type="text" class="form-control editCommit" placeholder="Edit comment" aria-describedby="button-addon2" v-model= "user.handlerCommit" @blur="onBlur(index, user.userId, user.handlerCommit)">
                  <div class="input-group-append">
                    <button class="btn btn-outline-primary" type="button" id="button-addon2"  @click.prevent="updateCommit(index, user.userId, user.handlerCommit)"><img class="pr-2" src="@/assets/img/icons/paper-plane.svg" alt=""/>Send</button>
                  </div>
                </div>
                <div class="_wrapper-home-input mt-1 mb-1" v-show="user.visibleDelete">
                  <div class="input-group input-group-custom">
                    <input type="text" class="form-control desabled" placeholder="Delete commit?" aria-label="Recipient's username" aria-describedby="button-addon2" readonly>
                    <div class="input-group-append">
                      <div class="input-group-append" >
                        <button class="btn btn-outline-primary btn-rad" type="button" id="button-addon-now" @click.prevent="noDeleteCommit(index)">No</button>
                        <button class="btn btn-outline-danger" type="button" id="button-addon-yes" @click.prevent="yesDeleteCommit(index, user.userId)">Yes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <p v-else class="badge badge-dark">No comments</p>
        </div>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home',
  data: () => ({
    userId: '',
    visible: false,
    handlerCommit: '',
    userName: 'Jason X',
    userAvatar: '/img/IMG_0452e@2x.png',
    isShow: false,
    isShowInput: false,
    focused: false,
    visibleDelete: false,
    visibleEdit: true,
    h: '',
    valueInputDelete: 'Delete commit?'
  }),
  created () {
    // var vm = this;
    // document.addEventListener('click', function () {
    //   // vm.toggleDropdown();
    //   console.log(vm)
    // });
  },
  computed: {
    usersCommit () {
      // this.commits = this.$store.state.userCommit
      // return this.commits
      return this.$store.getters.userCommits
    }
  },
  methods: {
    addCommit () {
      let userCommit = {
        userId: Date.now(),
        handlerCommit: this.handlerCommit,
        userName: this.userName,
        userAvatar: this.userAvatar,
        isShow: this.isShow,
        isShowInput: this.isShowInput,
        visibleDelete: this.visibleDelete,
        visibleEdit: this.visibleEdit,
        success: false
      }
      // this.users.push(userCommit)
      this.$store.dispatch('addCommit', userCommit)
      // console.log(this.usersCommit)
      this.handlerCommit = ''
    },
    // onFocus (index) {
    //   this.focused = true
    //   // this.usersCommit[index].isShow = false
    //   // this.usersCommit[index].visibleEdit = false
    // },
    onBlur (index, userId, handlerCommit) {
      this.usersCommit[index].isShow = false
      this.usersCommit[index].visibleEdit = true
      this.usersCommit[index].isShowInput = false
      let commits = {
        userId,
        handlerCommit
      }
      // console.log(index, userId, handlerCommit)
      this.$store.dispatch('updateCommit', commits)
    },
    // outside () {
    //   let userCommit = this.$store.state.userCommit.concat()
    //   const idx = userCommit.find(c => c.isShowInput === true)
    //   idx.isShow = true
    //   idx.isShowInput = false
    //   console.log(idx)
    //   },
    editCommit (index) {
      this.usersCommit[index].isShowInput = true
      this.usersCommit[index].visibleEdit = false
      this.usersCommit[index].isShow = false
    },
    deleteCommit (index, userId) {
      this.usersCommit[index].visibleDelete = true
      this.usersCommit[index].isShow = false
      this.usersCommit[index].visibleEdit = false
      this.usersCommit[index].isShowInput = false
    },
    yesDeleteCommit (index, userId) {
      // this.success = true
      this.$store.dispatch('deleteCommit', userId)
    },
    noDeleteCommit (index) {
      // this.success = false
      this.usersCommit[index].visibleDelete = false
      this.usersCommit[index].isShow = true
      this.usersCommit[index].visibleEdit = true
      this.usersCommit[index].isShowInput = false
    },
    updateCommit (index, userId, handlerCommit) {
      let commits = {
        userId,
        handlerCommit
      }
      this.$store.dispatch('updateCommit', commits)
      this.usersCommit[index].isShowInput = false
      this.usersCommit[index].isShow = true
      this.usersCommit[index].visibleEdit = true
    },
    redactCommit (index) {
      // console.log(this.commits[index])
      try {
        if (this.usersCommit[index].isShow !== true) {
          this.usersCommit[index].isShow = true
        } else {
          this.usersCommit[index].isShow = false
        }
      } catch (e) {

      }

      // const result = this.commits.filter(a => a.isShow  !== false)
    }
  },
  watch: {
    handlerCommit () {
      if (this.handlerCommit !== '') {
        this.visible = true
      } else {
        this.visible = false
      }
    },
    handlerCommitEdit () {
      if (this.handlerCommitEdit !== '') {
        this.visibleEdit = true
      } else {
        this.visibleEdit = false
      }
    }
  }
}
</script>
