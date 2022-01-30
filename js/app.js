import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.1.4/vue.esm-browser.min.js';
const app = createApp({
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
    }
  },
  methods: {
    login() {
      const url = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
      axios.post(url, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token};expires=${new Date(expired)}`;
          window.location = 'product.html';
        }).catch((err) => {
          alert(err.data.message);
          console.dir(err);
        });
    },
  },
});
app.mount('#app');