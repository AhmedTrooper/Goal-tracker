<script>
import axios from "axios";

export default {
  name: "GoalDetailsComponent",
  data(){
    return {
      goalId:this.$route.query["goal_id"],
      goal:{},
      showFinishDialogue:false,
      showDiscardDialogue:false,
      showDeleteDialogue:false,
    }
  },
  methods:{
    async fetchGoal(id){
      try {
        const url = `http://localhost:3000/api/goal/details/${id}`;
        const res = await axios.get(url);
        if(res.status === 200){
          this.goal = res.data;
        } else {
          this.goal.error = res.data;
        }
      } catch (e) {
        console.log(e)
      }
    },
    toggleFinishedDialogue(){
      this.showFinishDialogue = !this.showFinishDialogue;
    },
    toggleDiscardDialogue(){
      this.showDiscardDialogue = !this.showDiscardDialogue;
    },toggleDeleteDialogue(){
      this.showDeleteDialogue = !this.showDeleteDialogue;
    },
    async deleteGoal(id){
      try {
        const res = await axios.delete(`http://localhost:3000/delete_goal/${id}`);

        if(res.status === 200){
          this.goals = this.goals.filter((goal)=> goal._id !== id);
        }

      } catch (e) {
        console.log(e)
      }
      this.showDeleteDialogue = !this.showDeleteDialogue;



    },
    async discardGoal(id){

      try {
        const res = await axios.patch(`http://localhost:3000/discard_goal/${id}`);
        if(res.status === 200){
          this.goals = this.goals.map((goal)=>{
            if(goal._id === id){
              return {...goal,is_discarded : true};
            }
            return goal;
          });

          //await  this.fetchGoals();
        }
      } catch (e) {
        console.log(e)
      }

      this.showDiscardDialogue = !this.showDiscardDialogue;



    },
    async finishGoal(id){

      try {
        const res = await axios.patch(`http://localhost:3000/finish_goal/${id}`);
        if(res.status === 200){
          this.goals = this.goals.map((goal)=>{
            if(goal._id === id){
              return {...goal,is_finished : true};
            }
            return goal;
          });

          //await  this.fetchGoals();

        }
      } catch (e) {
        console.log(e)
      }

      this.showFinishDialogue = !this.showFinishDialogue;



    },
    async discardGoalAutomatically(id){

      try {
        const res = await axios.patch(`http://localhost:3000/discard_goal/${id}`);
        if(res.status === 200){
          this.goals = this.goals.map((goal)=>{
            if(goal._id === id){
              return {...goal,is_discarded : true};
            }
            return goal;
          });

          //await  this.fetchGoals();
        }
      } catch (e) {
        console.log(e)
      }




    },
    goalDetails(id){
      this.$router.push({
        path:`/goal/details`,
        query:{goal_id : id}
      });
    }
  },
  created() {
    this.fetchGoal(this.$route.query["goal_id"]);}
}
</script>

<template>
  <div v-if="goal.goal_name !== undefined" class="grid bg-blue-2006 p-10">
    <header class="grid w-full justify-self-center md:grid-cols-2 lg:grid-cols-4 gap-3  font-bold text-white justify-content-center">
      <button v-if="!goal.is_finished && !goal.is_discarded" class="bg-violet-500 p-3 rounded-sm text-center shadow-sm shadow-black w-fit">Update</button>
      <button v-if="!goal.is_finished && !goal.is_discarded" @click="toggleDeleteDialogue" class="bg-red-500 p-3 rounded-sm text-center shadow-sm shadow-black w-fit">Delete</button>
      <button v-if="!goal.is_finished && !goal.is_discarded" @click="toggleDiscardDialogue" class="bg-yellow-500 p-3 rounded-sm text-center shadow-sm shadow-black w-fit">Discard</button>
      <button v-if="!goal.is_finished && !goal.is_discarded" @click="toggleFinishedDialogue" class="bg-green-500 p-3 rounded-sm text-center shadow-sm shadow-black w-fit">Finish</button>
      <h1 v-if="goal.is_finished" class="   w-full bg-green-500 text-center p-2 font-bold text-white">Finished</h1>
      <h1 v-if="goal.is_discarded" class="   w-full bg-red-500 text-center p-2 font-bold text-white">Discarded</h1>

    </header>
    <div class="grid">

      <h2>{{goal.goal_end_date}}</h2>
      <h2 v-if="!goal.is_finished && !goal.is_discarded">{{goal.is_finished}}</h2>
      <h2 v-if="!goal.is_finished && !goal.is_discarded">{{goal.is_discarded}}</h2>
      <h2>Created at : {{goal.createdAt}}</h2>
      <h2>{{goal.is_finished ? "Finished at" : goal.is_discarded ? "Discarded at" : "Updated at"}} : {{goal.updatedAt}}</h2>
      <div>
        <h1 class="font-bold text-center mt-5 text-3xl text-gray-700">{{goal.goal_name}}</h1>
        <h2 class="font-medium mt-5  overflow-x-scroll p-10">{{goal.goal_description}}</h2>
      </div>
    </div>

<!--    Dialogue-->
    <div v-if="showFinishDialogue" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-lg font-bold mb-2">Are you sure you finished it?</h2>
        <div class="grid gap-5 p-3 confirm_btn_section grid-cols-2  justify-content-center">
          <button @click="finishGoal(goalId)" class="p-3 bg-green-500 text-white font-bold">Yes</button>
          <button @click="toggleFinishedDialogue" class="p-3 bg-red-500 text-white font-bold">Back</button>
        </div>
      </div>
    </div>

    <div v-if="showDiscardDialogue" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-lg font-bold mb-2">Are you sure to discard it?</h2>
        <div class="grid gap-5 p-3 confirm_btn_section grid-cols-2  justify-content-center">
          <button @click="discardGoal(goalId)" class="p-3 bg-green-500 text-white font-bold">Yes</button>
          <button @click="toggleDiscardDialogue" class="p-3 bg-red-500 text-white font-bold">Back</button>
        </div>
      </div>
    </div>

    <div v-if="showDeleteDialogue" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-lg font-bold mb-2">Delete it?</h2>
        <div class="grid gap-5 p-3 confirm_btn_section grid-cols-2  justify-content-center">
          <button @click="deleteGoal(goalId)" class="p-3 bg-green-500 text-white font-bold">Yes</button>
          <button @click="toggleDeleteDialogue" class="p-3 bg-red-500 text-white font-bold">Back</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>