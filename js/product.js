import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.1.4/vue.esm-browser.min.js';
import pagination from './pagination.js'; // 匯入分頁元件(預設匯出)
import { modalForProduct, delModalForProduct } from './modal.js'; // 匯入 modal 元件(具名匯出)

const app = createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'rousong',
      products: [],
      tempProduct: {
        imagesUrl: []
      },
      status: '',
      pagination: {}
    }
  },
  components: {
    pagination,
    modalForProduct,
    delModalForProduct
  },
  methods: {
    checkLogin() { // 確認是否登入
      // 取出token
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      axios.defaults.headers.common['Authorization'] = token;

      const url = `${this.apiUrl}/api/user/check`;
      axios.post(url)
        .then(() => {
          this.getProductData();
        })
        .catch((err) => {
          alert(err.data.message);
          window.location = 'index.html';
        })
    },
    getProductData(page = 1) { // 取得產品資料
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`;
      axios.get(url)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          alert(err.data.message);
        })
    },
    openModal(status, item) { //打開modal並判斷執行動作
      this.status = status;
      if (status === 'add') { // 狀態為add時變回資料初始狀態
        this.tempProduct = {
          imagesUrl: [],
        };
        this.$refs.callProductModal.openProductModal(); // 開啟新增、編輯產品 modal
      } else if (status === 'edit') { // 編輯 深層拷貝
        this.tempProduct = JSON.parse(JSON.stringify(item));
        this.$refs.callProductModal.openProductModal(); // 開啟新增、編輯產品 modal
      } else if (status === 'delete') { // 刪除 深層拷貝
        this.tempProduct = JSON.parse(JSON.stringify(item));
        this.$refs.callDelProductModal.openDeleteProductModal(); // 開啟刪除產品 modal
      }
    },
  },
  created() {
    this.checkLogin();
  }
});
app.mount('#app');