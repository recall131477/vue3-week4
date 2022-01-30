import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.1.4/vue.esm-browser.min.js';

import pagination from './pagination.js'; // 匯入分頁元件(預設匯出)

let productModal = '';
let delProductModal = '';
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
  },
  methods: {
    checkLogin() { //確認是否登入
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
      if (status === 'add') { // add時變回資料初始狀態
        this.tempProduct = {
          imagesUrl: [],
        };
        productModal.show();
      } else if (status === 'edit') { // 編輯 深層拷貝
        this.tempProduct = JSON.parse(JSON.stringify(item));
        productModal.show();
      } else if (status === 'delete') { // 刪除 深層拷貝
        this.tempProduct = JSON.parse(JSON.stringify(item));
        delProductModal.show()
      }
    },
    updateProduct() { // 判斷新增或修改(新增=新資料，修改=舊資料)
      if (this.status === 'add') {
        const url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
        axios.post(url, { data: this.tempProduct })
          .then(() => {
            Swal.fire({
              icon: 'success',
              text: '已建立商品'
            });
            productModal.hide();
            this.getProductData();
          })
          .catch((err) => {
            alert(err.data.message);
          })
      } else {
        const id = this.tempProduct.id;
        const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${id}`;
        axios.put(url, { data: this.tempProduct })
          .then(() => {
            Swal.fire({
              icon: 'success',
              text: '已更新商品'
            });
            productModal.hide();
            this.getProductData();
          })
          .catch((err) => {
            alert(err.data.message);
          })
      }
    },
    deleteProduct() { // 刪除產品
      const id = this.tempProduct.id;
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${id}`;
      axios.delete(url)
        .then(() => {
          Swal.fire({
            icon: 'success',
            text: '已刪除商品'
          });
          delProductModal.hide();
          this.getProductData();
        })
        .catch((err) => {
          alert(err.data.message);
        })
    },
    uploadImages() { //上傳圖片
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('');
    },
  },
  mounted() {
    // 實體化modal(這裡才取的到DOM元素)
    productModal = new bootstrap.Modal(document.getElementById('productModal'));
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));
  },
  created() {
    this.checkLogin();
  }
});
app.mount('#app');