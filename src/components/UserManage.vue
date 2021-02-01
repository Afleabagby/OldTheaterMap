<template>
  <v-container>
    <v-row class="pa-15">
      <v-col cols="12" md="6">
        <v-breadcrumbs
          :items="breadcrumbs"
          large
        ></v-breadcrumbs>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  會員姓名
                </th>
                <th class="text-left">
                  會員帳號
                </th>
                <th class="text-center">
                  操作
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(user, idx) in users"
                :key="idx"
              >
                <td>{{ user.name }}</td>
                <td>
                  <v-text-field
                  v-if="user.edit"
                  v-model="user.model"
                  filled
                  ></v-text-field>
                  <span v-else>{{ user.account }}</span>
                </td>
                <td class="text-center">
                  <p v-if="!user.edit">
                    <v-btn icon @click="editUser(user)">
                    <v-icon
                      small
                    >
                      mdi-lead-pencil
                    </v-icon>
                    </v-btn>
                    <v-btn icon @click="deleteUser(user, idx)">
                    <v-icon
                      small
                    >
                      mdi-trash-can
                    </v-icon>
                    </v-btn>
                  </p>
                  <p v-if="user.edit">
                    <v-btn @click="saveEdit(user)">
                      儲存變更
                    </v-btn>
                    <v-btn @click="cancelEdit(user)">
                      取消
                    </v-btn>
                  </p>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      // 麵包屑標題
      breadcrumbs: [
        {
          text: '會員資料管理',
          disabled: true,
          href: 'breadcrumbs_dashboard'
        }
      ],
      // data table 會員列表
      users: [],
      // 字串
      user: ''
    }
  },
  computed: {
    manager () {
      return this.$store.state.manager
    }
  },
  methods: {
    editUser (user) {
      user.edit = true
      user.model = user.account
    },
    cancelEdit (user) {
      user.edit = false
      user.account = user.model
    },
    saveEdit (user) {
      this.axios.patch(process.env.VUE_APP_API + '/users/manager/' + user._id + '/edit', { description: user.model })
        .then(res => {
          if (res.data.success) {
            user.edit = false
            user.account = user.model
          } else {
            this.$swal({
              icon: 'error',
              title: '錯誤',
              text: res.data.message
            })
          }
        })
        .catch(err => {
          console.log(err)
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: err.response.data.message
          })
        })
    },
    deleteUser (user, idx) {
      this.axios.delete(process.env.VUE_APP_API + '/users/manager/' + user._id + '/delete')
        .then(res => {
          if (res.data.success) {
            this.users.splice(idx, 1)
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
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/users/manager/' + this.manager.id)
      .then(res => {
        if (res.data.success) {
          this.users = res.data.result.map(data => {
            // 要整理成可以拿的東西 ex.model
            data.model = data.account
            data.edit = false
            return data
          })
        } else {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: res.data.message
          })
        }
      })
  }
}
</script>
