// 產品資料格式
const products = [
    {
      category: "甜甜圈",
      content: "尺寸：14x14cm",
      description: "濃郁的草莓風味，中心填入滑順不膩口的卡士達內餡，帶來滿滿幸福感！",
      id: "-L9tH8jxVb2Ka_DYPwng",
      is_enabled: 1,
      origin_price: 150,
      price: 99,
      title: "草莓莓果夾心圈",
      unit: "個",
      num: 10,
      imageUrl: "https://images.unsplash.com/photo-1583182332473-b31ba08929c8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fGRvbnV0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
      imagesUrl: [
        "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2832&q=80",
        "https://images.unsplash.com/photo-1559656914-a30970c1affd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTY0fHxkb251dHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
      ]
    },
    {
      category: "蛋糕",
      content: "尺寸：6寸",
      description: "蜜蜂蜜蛋糕，夾層夾上酸酸甜甜的檸檬餡，清爽可口的滋味讓人口水直流！",
      id: "-McJ-VvcwfN1_Ye_NtVA",
      is_enabled: 16,
      origin_price: 1000,
      price: 900,
      title: "蜂蜜檸檬蛋糕",
      unit: "個",
      num: 1,
      imageUrl: "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80",
      imagesUrl: [
        "https://images.unsplash.com/photo-1618888007540-2bdead974bbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80",
      ]
    },
    {
      category: "蛋糕",
      content: "尺寸：6寸",
      description: "法式煎薄餅加上濃郁可可醬，呈現經典的美味及口感。",
      id: "-McJ-VyqaFlLzUMmpPpm",
      is_enabled: 1,
      origin_price: 700,
      price: 600,
      title: "暗黑千層",
      unit: "個",
      num: 15,
      imageUrl: "https://images.unsplash.com/photo-1505253149613-112d21d9f6a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
      imagesUrl: [
        "https://images.unsplash.com/flagged/photo-1557234985-425e10c9d7f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA5fHxjYWtlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
        "https://images.unsplash.com/photo-1540337706094-da10342c93d8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
      ]
    }
  ]
  
  const detailHtml = `<div id="detail">
    <h2>單一產品細節</h2>
    <template v-if="hasFocus">
      <div class="card mb-3">
        <img :src="product.imageUrl" class="card-img-top primary-image" alt="主圖">
        <div class="card-body">
          <h5 class="card-title">
            {{ product.title }}
            <span class="badge bg-primary ms-2">{{ product.category }}</span>
          </h5>
          <p class="card-text">商品描述：{{ product.description }}</p>
          <p class="card-text">商品內容：{{ product.content }}</p>
          <div class="d-flex">
            <p class="card-text me-2">{{ product.price }}</p>
            <p class="card-text text-secondary"><del>{{ product.origin_price }}</del></p>
            元 / {{ product.unit }}
          </div>
        </div>
      </div>
      <template v-for="(img,index) in product.imagesUrl" :key="index">
        <img :src="img" alt="" class="images m-2">
      </template>
    </template>
    <p class="text-secondary" v-show="!hasFocus">請選擇一個商品查看</p>
  </div>`

  const productModal = `<!-- Modal -->
  <div id="product-modal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
  aria-hidden="true">
<div class="modal-dialog modal-xl">
  <div class="modal-content border-0">
    <div class="modal-header bg-dark text-white">
      <h5 id="productModalLabel" class="modal-title">
        <span>新增產品</span>
      </h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-sm-4">
          <div class="mb-2">
            <div class="mb-3">
              <label for="imageUrl" class="form-label">輸入圖片網址</label>
              <input type="text" class="form-control"
                    placeholder="請輸入圖片連結" v-model="product.imageUrl">
            </div>
            <img class="img-fluid" src="" alt="">
          </div>
          <div>
            <button class="btn btn-outline-primary btn-sm d-block w-100">
              新增圖片
            </button>
          </div>
          <div>
            <button class="btn btn-outline-danger btn-sm d-block w-100">
              刪除圖片
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
              <input id="category" type="text" class="form-control"
                    placeholder="請輸入分類" v-model="product.category">
            </div>
            <div class="mb-3 col-md-6">
              <label for="price" class="form-label">單位</label>
              <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="product.unit">
            </div>
          </div>

          <div class="row">
            <div class="mb-3 col-md-6">
              <label for="origin_price" class="form-label">原價</label>
              <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model.number="product.origin_price">
            </div>
            <div class="mb-3 col-md-6">
              <label for="price" class="form-label">售價</label>
              <input id="price" type="number" min="0" class="form-control"
                    placeholder="請輸入售價" v-model.number="product.price">
            </div>
          </div>
          <hr>

          <div class="mb-3">
            <label for="description" class="form-label">產品描述</label>
            <textarea id="description" type="text" class="form-control"
                      placeholder="請輸入產品描述" v-model="product.content">
            </textarea>
          </div>
          <div class="mb-3">
            <label for="content" class="form-label">說明內容</label>
            <textarea id="description" type="text" class="form-control"
                      placeholder="請輸入說明內容" v-model="product.description">
            </textarea>
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input id="is_enabled" class="form-check-input" type="checkbox"
                    :true-value="1" :false-value="0" v-model="product.is_enabled">
              <label class="form-check-label" for="is_enabled">是否啟用</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" v-on:click="cancelModal">
        取消
      </button>
      <button type="button" class="btn btn-primary" v-on:click="modalConfirm">
        確認
      </button>
    </div>
  </div>
</div>
  </div> `

  class product {
    constructor() {
      this.title = "";
      this.category = "";
      this.origin_price = null;
      this.price = null;
      this.unit = "";
      this.description = "";
      this.content = "";
      this.is_enabled = 1;
      this.imageUrl = "";
      this.imagesUrl = [];
    }
  }

  const childComponent = {
    props: ["person"],
    template: "#newComponent",
  };
  
  
  const app = Vue.createApp({
      data() {
        return {
          products: [],
          focusProduct: null,
          hasFocus: false,
          modalopen: false,
          isNewModal: false,
          delModal: null,
          expectedDeleteId: 0 
        };
    },
    components: {
      // 'test': childComponent
    },
      methods: {
        seeDetail(product) {
          this.focusProduct = product;
          this.hasFocus = true;
        },
        async getProducts() {
            const url = "https://ec-course-api.hexschool.io/v2/api/yangapi/admin/products/all";
            await axios.get(url).then((res) => {
                console.log(res);
              const { products } = res.data;
              console.log(products);
              this.products = Object.entries(products).map(([id, obj]) => ({ id, ...obj }));
            })
            .catch((err) => { console.log(err) });
          },
        async checkAuth() {
            const url = "https://ec-course-api.hexschool.io/v2/api/user/check";
            let result = false;
            await axios.post(url).then((res) => {
                const { success } = res.data;
                result = success;
            }).catch((err) => { alert(err); });
            return result;
        },
        async deleteProduct() {
          const id = this.expectedDeleteId;
          const url =  `https://ec-course-api.hexschool.io/v2/api/yangapi/admin/product/${id}`;
          let result = false;
          await axios.delete(url).then((res) => {
              const { success } = res.data;
            result = success;
            alert('已刪除商品');            
          }).catch((err) => { console.log(err); });
          await this.getProducts();
          this.delModal.hide();
          return result;
        },
        openDeleteModal(id) {
          this.expectedDeleteId = id;
          this.delModal.show();
        },
        openNewModal() {
          this.isNewModal = true;
          this.modalopen = true;
        },
        openEditModal(product) {
          this.seeDetail(product);
          this.isNewModal = false;
          this.modalopen = true;
        },
        closeModal() {
          this.modalopen = false;
          this.getProducts();
        }
      },
      async mounted() {
        const cookieValue = document.cookie
          .split("; ")
          .find((row) => row.startsWith("hextoken="))
            ?.split("=")[1];
        axios.defaults.headers.common.Authorization = cookieValue;          
        console.log(cookieValue);
        this.checkAuth().then((res) => {
            if (res) {
                this.getProducts();
            }
            else {
                alert("請登入");
                window.location = "login.html";
            }
        });
        this.delModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
          keyboard: false,
        });
      }
    });
  
app.component('detail', {
  name: 'detail',
  props: ['product', 'hasFocus'],
  methods: {
  },
  template: detailHtml
});

app.component('product-modal', {
  name:'product-modal',
  template: productModal,
  props: ['isopen', 'isnew', 'propitem'],
  emits: ['close'],
  data() {
    return {
      product: new product(),
      productModal: null
    }
  },
  methods: {
    async addProduct() {
      const url = "https://ec-course-api.hexschool.io/v2/api/yangapi/admin/product";
      let result = false;
      const data = {
        data: this.product        
      };
      await axios.post(url, data).then((res) => {
        const { success } = res.data;
        result = success;
        console.log("addProduct", result);
      }).catch((err) => { alert(err); });
      return result;
    },
    async updateProduct() {
      const url = `https://ec-course-api.hexschool.io/v2/api/yangapi/admin/product/${this.product.id}`;
      let result = false;
      const data = {
        data: this.product        
      };
      await axios.put(url, data).then((res) => {
        const { success } = res.data;
        result = success;
        console.log("update", result);
      }).catch((err) => { alert(err); });
      return result;
    },
    async modalConfirm() {
      let result = false;
      result = this.isnew ? this.addProduct() : this.updateProduct();
      this.$emit('close');
      return result;
    },
    cancelModal() {
      this.$emit('close');
    }
  },
  watch: {
    isopen: function (newValue, rawValue) {
      console.log(this.isopen);
      if (newValue) {
        this.productModal.show();
      } else {
        this.productModal.hide();
      }
      this.product = this.isnew ? new product() : { ...this.propitem };
    },
  },
  mounted() {
    this.productModal = new bootstrap.Modal(document.getElementById('product-modal'), {
      keyboard: false,
    });
  }
});

  app.mount('#app');