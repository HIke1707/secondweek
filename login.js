const app = Vue.createApp({
    data() {
      return {
          account: null,
          password: null
      };
    },
    methods: {
        async login() {
            console.log(this.account, this.password);
            const parameter = {
                username: this.account,
                password:this.password
            }
            await axios.post('https://ec-course-api.hexschool.io/v2/admin/signin', parameter).then((res) => {
                console.log(res);
                const { token } = res.data;
                document.cookie = `hextoken=${token}`;
                window.location = "secondweek.html"
            })
                .catch((err) => { console.log(err) });
        }
    }
});
  
app.mount('#app');