<template>
  <div v-if= "bowl" class="edit-bowl container">
    <h2>Edit {{ bowl.title }} Bowl</h2>
    <form @submit.prevent= "EditBowl">
      <div class="field title">
        <label for="title">Grain Bowl Title:</label>
        <input type="text" name="title" v-model = "bowl.title">
      </div>
      <div v-for="(ing, index) in bowl.ingredients" :key="index" class="field">
        <label for="ingredients">Ingredient:</label>
        <input type="text" name="ingredient" v-model= "bowl.ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient:</label>
        <input type="text" name="add-ingredient" @keydown.enter.prevent= "addIng" v-model= "another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button class="btn grey">Update Bowl</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
  name: 'EditBowl',
  data(){
    return {
      bowl: null,
      another: null,
      feedback: null
    }
  },
  methods: {
    EditBowl(){
      if(this.bowl.title){
        this.feedback = null
        this.bowl.slug = slugify(this.bowl.title, {
          replacement:'-',
          remove:/[*+~.()'"!:@]/g,
          lower:true
        })
        //add method outputs a promise
          db.collection('bowls').doc(this.bowl.id).update({
          title: this.bowl.title,
          ingredients: this.bowl.ingredients,
          slug: this.bowl.slug
        }).then (() => {
          this.$router.push({name:'Index'})
        }).catch(err => {
          console.log(err)
        }) 
      }else{
        this.feedback = 'You must enter a bowl title'
      }
    },
    addIng(){
      if(this.another){
        this.bowl.ingredients.push(this.another)
        this.another = null
        this.feedback = null
      }else {
        this.feedback = 'You must enter a value to add an ingredient'
      }
    },
    deleteIng(ing){
      this.bowl.ingredients = this.bowl.ingredients.filter(ingredient => {
        return ingredient !=  ing
      })
    }
  },
  created(){
    let ref = db.collection('bowls').where('slug', '==', this.$route.params.bowl_slug)
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.bowl = doc.data()
        this.bowl.id = doc.id
      })
    })
  }
}
</script>

<style>

.edit-bowl {
  margin-top:60px;
  padding: 20px;
  max-width: 500px;
}
.edit-bowl h2 {
  font-size:2em;
  margin:20px auto;
}

.edit-bowl .field {
  margin:20px auto;
  position: relative;

}

.edit-bowl .delete {
  position: absolute;
  right:0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>



