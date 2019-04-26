<template>
  <div class="index container">
    <div class="card" v-for="bowl in bowls" :key="bowl.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteBowl(bowl.id)">delete</i>
        <h2 class="orange-text">{{bowl.title}}</h2>
        <ul class="ingredients">
          <li v-for="(ing, index) in bowl.ingredients" :key="index">
            <span class="chip">{{ing}}</span>
          </li>
        </ul>
      </div>
        <span class="btn-floating btn-large halfway-fab grey">
          <router-link :to="{name:'EditBowl', params:{bowl_slug:bowl.slug} }">
            <i class="material-icons edit">edit</i>
          </router-link>
        </span>
    </div>    
  </div>
</template>

<script>
import db from'@/firebase/init'

export default {
  name: 'Index',
  data () {
    return  {
      bowls: []
    }
  },
  methods: {
    deleteBowl(id){
     //delete doc from firestore
     db.collection('bowls').doc(id).delete()
     .then(() => {
       this.bowls = this.bowls.filter(bowl => {
       return bowl.id != id
      })
     })
    }
  },
  created(){
    //fetch data from firestore
    db.collection('bowls').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let bowl = doc.data()
        bowl.id = doc.id
        this.bowls.push(bowl)
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top:60px;
}
.index h2 {
  font-size:1.8em;
  text-align: center;
  margin-top: 0;
}
.index .ingredients {
  margin: 30px auto;
}

.index .ingredients li {
  display: inline-block;
}

.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size:1.4em;
}

</style>

