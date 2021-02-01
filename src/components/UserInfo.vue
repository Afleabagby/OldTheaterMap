<template>
  <v-container>
    <v-row class="pa-15">
      <v-col cols="12" md="6">
        <v-breadcrumbs
          :items="breadcrumbs"
          large
        ></v-breadcrumbs>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="saveUserEdit()"
        >
        <!-- <v-edit-dialog
        :return-value.sync="props.item.name"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          {{ props.item.name }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.name"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog> -->
          <v-text-field
            v-model="name"
            :counter="10"
            label="姓名"
            required
          >{{user.name}}</v-text-field>

          <v-text-field
            v-model="account"
            label="電子信箱"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="設定新密碼"
            :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show4 = !show4"
            :type="show4 ? 'text' : 'password'"
            required
          ></v-text-field>

          <v-btn
            color="secondary"
            class="mr-4"
            type="submit"
          >
            儲存變更
          </v-btn>

          <v-btn
            color="error"
            class="mr-4"
            @click="reset"
          >
            取消
          </v-btn>

        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      breadcrumbs: [
        {
          text: '會員資料',
          disabled: true,
          href: 'breadcrumbs_dashboard'
        }
      ],
      valid: true,
      name: '',
      account: '',
      password: '',
      // users: [],
      checkbox: false,
      show4: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    saveUserEdit () {
      this.axios.patch(process.env.VUE_APP_API + '/users/' + this.user.id, { name: this.name, account: this.account, password: this.password })
        .then(res => {
          if (res.data.success) {
            this.edit = true
            this.name = res.data.result.name
            this.account = res.data.result.account
            this.password = res.data.result.password
            // 送狀態給vuex，讓大頭貼那裏可以回傳顯示
            this.$store.commit('logInsubmit', res.data.result)
            this.$swal({
              icon: 'success',
              title: '修改成功'
            })
            this.password = ''
          } else {
            this.$swal({
              icon: 'error',
              title: '錯誤',
              text: res.data.message
            })
          }
        })
        .catch(err => {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: err.response.data.message
          })
        })
    }
  }
}
</script>
