Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
    <div class="container">
      <div class="row justify-content-center align-items-center">
          <div class="col-lg-6 col-md-7 col-sm-8">
              <img class="img-fluid" v-bind:src="image">
          </div>
          <div class="col-lg-6 text-lg-left text-md-center text-sm-center">
              <h1>{{title}}</h1>
              <p v-if="inStock">In Stock</p>
              <p v-else>Out of Stock</p>
              <p>Shipping: {{shipping}}</p>
              <ul class="pl-0">
                  <p class="mb-0 font-weight-bold">Details :</p>
                  <li class="list-unstyled" v-for="detail in details">{{detail}}</li>
              </ul>
              <div class="color-box"
                  v-for="(variant, index) in variants" 
                  :key="variant.variantId"
                  :style="{ backgroundColor: variant.variantColor }"
                  @click="updateProduct(index)"
                  >
              </div> 
              <div>
                  <button class="btn btn-success d-inline my-2" v-on:click="addToCart" :disabled="!inStock">Add to Cart</button>
              </div>
          </div>
      </div>
    </div>
  `,
  data() {
    return {
      product: 'Socks',
      brand: 'Vue',
      selectedVariant: 0,
      details: ['80% cotton', '20% polyester', 'Gender-neutral'],
      variants: [
        {
          variantId: 2234,
          variantColor: 'green',
          variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
          variantQuantity: 10     
        },
        {
          variantId: 2235,
          variantColor: 'blue',
          variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
          variantQuantity: 0     
        }
      ],
      cart: 0
    }
  },
  methods: {
      addToCart() {
          this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
      },
      updateProduct: function(index) {  
          this.selectedVariant = index
          console.log(index)
      }
  },
  computed: {
      title() {
          return this.brand + ' ' + this.product  
      },
      image(){
          return this.variants[this.selectedVariant].variantImage
      },
      inStock(){
          return this.variants[this.selectedVariant].variantQuantity
      },
      shipping() {
        if (this.premium){
          return "Free"
        }
        return '$' + 2.99
      },
      mounted() {
        eventBus.$on('review-submitted', productReview => {
          this.reviews.push(productReview)
        })
      }
  }
})

var app = new Vue({
    el: '#app',
    data: {
      premium: false,
      cart: []
    },
    methods: {
      updateCart(id) {
        this.cart.push(id)
      }
    }
})
