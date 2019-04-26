<template>
  <div class = "add-bowl container">
    <h2 class="center-align orange-text">Add New Grain Bowl Recipe</h2>
    <form @submit.prevent= "AddBowl">
      <div class="field title">
        <label for="title">Grain Bowl Title:</label>
        <input type="text" name="title" v-model = "title">
      </div>
      <div v-for="(ing, index) in ingredients" :key="index" class="field">
        <label for="ingredients">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient:</label>
        <input type="text" name="add-ingredient" @keydown.enter.prevent= "addIng" v-model= "another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button class="btn grey">Add Bowl</button>
      </div>
    </form>
  </div>  
</template>

<script>
import db from '@/firebase/init'
import slugify from'slugify'
export default {
  name: 'AddBowl',
  data() {
    return {
      title: null,
      another: null,
      ingredients:[],
      feedback: null,
      slug: null
    }
  },
  methods: {
    AddBowl(){
      if(this.title){
        this.feedback = null
        this.slug = slugify(this.title, {
          replacement:'-',
          remove:/[*+~.()'"!:@]/g,
          lower:true
        })
        //add method outputs a promise
          db.collection('bowls').add ({
          title: this.title,
          ingredients: this.ingredients,
          slug: this.slug
        }).then (() => {
          this.$router.push({name:'Index'})
        }).catch(err => {
          console.log(err)
        }) 
      }else{
        this.feedback = 'You must enter a smoothie title'
      }
    },
    addIng(){
      if(this.another){
        this.ingredients.push(this.another)
        this.another = null
        this.feedback = null
      }else {
        this.feedback = 'You must enter a value to add an ingredient'
      }
    },
    deleteIng(ing){
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient !=  ing
      })
    }
  }
}
</script>

<style>

.add-bowl {
  margin-top:60px;
  padding: 20px;
  max-width: 500px;
}
.add-bowl h2 {
  font-size:2em;
  margin:20px auto;
}

.add-bowl .field {
  margin:20px auto;
  position: relative;

}

.add-bowl .delete {
  position: absolute;
  right:0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>

