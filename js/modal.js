let productModal = '';
export default {
  props: ['product', 'status'],
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'rousong'
    }
  },
  methods: {
    updateProduct() { // 判斷新增或修改(新增=新資料，修改=舊資料)
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      let httpsMethods = 'post';

      if (this.status === 'edit') {
        const id = this.product.id;
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${id}`;
        httpsMethods = 'put';
      }
      axios[httpsMethods](url, { data: this.product })
        .then(() => {
          Swal.fire({
            icon: 'success',
            text: '已更新商品'
          });
          this.closeModal();
          this.$emit('emit-update-product');
        })
        .catch((err) => {
          alert(err.data.message);
        })
    },
    uploadImages() { //上傳圖片
      this.product.imagesUrl = [];
      this.product.imagesUrl.push('');
    },
    closeModal() {
      productModal.hide();
    }
  },
  mounted() {
    // 實體化modal(這裡才取的到DOM元素)
    productModal = new bootstrap.Modal(document.getElementById('productModal'));
  },
  template:
    `
      <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
              <span v-if="status === 'add'">新增產品</span>
              <span v-if="status === 'edit'">編輯產品</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">主要圖片</label>
                  <input type="text" class="form-control mb-2" placeholder="請輸入圖片連結" v-model="product.imageUrl">
                  <img class="img-fluid" :src="product.imageUrl">
                </div>
                <h3 class="mb-3">多圖新增</h3>
                <!--Array.isArray : 檢查傳入的值是否為陣列-->
                <div v-if="Array.isArray(product.imagesUrl)">
                  <div class="mb-1" v-for="(image, index) in product.imagesUrl" :key="index">
                    <div class="mb-3">
                      <label for="imageUrl" class="form-label">圖片網址</label>
                      <input type="text" class="form-control" placeholder="請輸入圖片連結"
                        v-model="product.imagesUrl[index]">
                    </div>
                    <img class="img-fluid" :src="image">
                  </div>
                  <div v-if="!product.imagesUrl.length || product.imagesUrl[product.imagesUrl.length - 1]">
                    <button class="btn btn-outline-primary btn-sm d-block w-100"
                      @click="product.imagesUrl.push('')">
                      新增圖片
                    </button>
                  </div>
                  <div v-else>
                    <button class="btn btn-outline-danger btn-sm d-block w-100" @click="product.imagesUrl.pop()">
                      刪除圖片
                    </button>
                  </div>
                </div>
                <div v-else>
                  <button class="btn btn-outline-primary btn-sm d-block w-100" @click="uploadImages">
                    新增圖片
                  </button>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="product.title">
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <input id="category" type="text" class="form-control" placeholder="請輸入分類"
                      v-model="product.category">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">單位</label>
                    <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="product.unit">
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價"
                      v-model.number="product.origin_price">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">售價</label>
                    <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價"
                      v-model.number="product.price">
                  </div>
                </div>
                <hr>

                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label>
                  <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述"
                    v-model="product.description">
                  </textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <textarea id="description" type="text" class="form-control" placeholder="請輸入說明內容"
                    v-model="product.content">
                  </textarea>
                </div>
                <div class="mb-3">
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                      v-model="product.is_enabled" :true-value="1" :false-value="0">
                    <label class="form-check-label" for="flexSwitchCheckChecked">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="updateProduct">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    `
}