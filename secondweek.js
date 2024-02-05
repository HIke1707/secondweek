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

let productModal = null;
let delProductModal = null;
  
  
  const app = Vue.createApp({
      data() {
        return {
          products: [],
          focusProduct: null,
          hasFocus: false,
          modalopen: false,
          isNewModal: false,
          delModal: null,
          expectedDeleteId: 0,
          tempProduct: { imagesUrl: [] },
          pagination: {}
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
        async getProducts(page=1) {
            const url = `https://ec-course-api.hexschool.io/v2/api/yangapi/admin/products?page=${page}`;
            await axios.get(url).then((res) => {
                console.log(res);
              const { products } = res.data;
              console.log(products);
              this.products = Object.entries(products).map(([id, obj]) => ({ id, ...obj }));
              this.pagination = res.data.pagination;
            })
            .catch((err) => { console.log(err) });
          },
        async checkAuth() {
            const url = "https://ec-course-api.hexschool.io/v2/api/user/check";
            let result = false;
            await axios.post(url).then((res) => {
                const { success } = res.data;
                result = success;
            }).catch((err) => { alert(err.message); });
            return result;
        },
        closeModal() {
          this.modalopen = false;
          console.log('emit');
          this.getProducts();
        },
        openModal(type, item) {
          if (type === 'new') {
            this.tempProduct = { imagesUrl: [] };
            this.isNewModal = true;
            productModal.show();
          } else if (type === 'edit') {
            this.tempProduct = { ...item };
            this.isNewModal = false;
            productModal.show();
          } else if (type === 'delete') {
            this.tempProduct = { ...item };
            delProductModal.show();
          }
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
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
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
  template: '#productModal',
  props: ['isopen', 'isnew', 'propitem'],
  emits: ['close'],
  data() {
    return {
      product: this.propitem,
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
      }).catch((err) => { alert(JSON.stringify(err)); });
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
      }).catch((err) => { alert(JSON.stringify(err));  });
      return result;
    },
    async modalConfirm() {
      let result = false;
      result = this.isnew ? await this.addProduct() : await this.updateProduct();
      this.$emit('close');
      productModal.hide();
      return result;
    },
    cancelModal() {
      this.$emit('close');
    },
    createImages() {
      this.product.imagesUrl = [];
      this.product.imagesUrl.push('');
    }
  },
  watch: {
    propitem: function (newValue, rawValue) {
      this.product = newValue;
    },
  },
  mounted() {
    productModal = new bootstrap.Modal(document.getElementById('product-modal'), {
      keyboard: false,
    });
  }
});

app.component('delete-modal', {
  name: 'delete-modal',
  template: '#deleteModal',
  props: ['propitem'],
  emits: ['close'],
  data() {
    return {
      product: this.propitem
    }
  },
  methods: {
    async deleteProduct() {
      const id = this.propitem.id;
      const url =  `https://ec-course-api.hexschool.io/v2/api/yangapi/admin/product/${id}`;
      let result = false;
      await axios.delete(url).then((res) => {
          const { success } = res.data;
        result = success;
        alert('已刪除商品');  
        delProductModal.hide();
        this.$emit('close');
      }).catch((err) => { alert(JSON.stringify(err)) });      
      return result;
    },
    mounted() {
      delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
        keyboard: false,
      });
    }
  }
})

// 分頁元件
app.component('pagination', {
  template: '#pagination',
  props: ['pages'],
  emits: ['emit-pages'],
  methods: {
    emitPages(page){
      this.$emit('emit-pages', page);
    }
  }
});

  app.mount('#app');