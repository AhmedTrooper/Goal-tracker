<script>
import axios from "axios";
import Heading from "./Heading.vue";

export default {
  name: "goal_container",
  components: {Heading},
  data(){
    return{
      goals:[],
      showFinishDialogue:false,
      showDiscardDialogue:false,
      showDeleteDialogue:false,
      goal_id_to_delete:"",
      goalToDiscard:"",
      goalToFinish:"",
      resourcesLink:["https://www.youtube.com/watch?v=QnG8u-7d8XU","https://www.youtube.com/watch?v=QnG8u-7d8XU"]

    };
  },
  methods:{
    async fetchGoals(){
     try {
       const url = "http://localhost:3000/api";
       const res = await axios.get(url);
if(res.status === 200){
  this.goals = res.data;
}
     } catch (e) {
       console.log(e)
     }
    },
    toggleFinishedDialogue(id){
      this.goalToFinish = id;
      this.showFinishDialogue = !this.showFinishDialogue;
    },
    toggleDiscardDialogue(id){
      this.goalToDiscard = id
this.showDiscardDialogue = !this.showDiscardDialogue;
    },toggleDeleteDialogue(id){
      this.goal_id_to_delete = id;
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
    this.fetchGoals();
  }
}
</script>

<template>
  <Heading v-if="goals.length" :goals="goals.length"></Heading>
  <div v-if="goals.length===0" class="no_goal_found w-screen h-screen mt-32 fixed grid">
    <div class="card justify-self-center self-center" >No goal found!!!</div>

  </div>

  <div v-if="goals.length >0" class="goalSection grid  gap-5 p-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
    <div
        class="h-fit p-1 bg-transparent rounded-lg goal w-[300px] grid  gap-1 shadow-md shadow-black  border-2"
        v-for="(goal,index) in goals" key="goal._id"
        :class="!goal.is_finished  ? goal.is_discarded ? 'border-red-500':'' : 'border-green-500'" >
      <h1
          :class="!goal.is_finished  ? goal.is_discarded ? 'bg-red-500 text-white':'' : 'bg-green-500 text-white'"
          class="w-fit border-2  p-3 rounded-lg  font-bold" >{{index+1}}</h1>
      <img
          class="w-1/2 justify-self-center rounded-t-lg"
          src="../../assets/task.png"
          alt="tree">
      <h1
          :class="!goal.is_finished  ? goal.is_discarded ? 'bg-red-500':'bg-emerald-950' : 'bg-green-500'"
          class=" p-3 rounded-sm text-white font-bold text-center">{{goal.goal_name}}</h1>
      <h2
          class="p-10 col-span-full text-[15px] text-gray-500 w-full h-fit overflow-x-scroll overflow-y-scroll max-h-36">
        {{goal.goal_description}}
      </h2>




      <div class="grid grid-cols-3">
        <div
            v-if="!goal.is_finished && !goal.is_discarded"
            class="p-2 text-green-500">

          {{
            (Math.floor((new Date(goal.goal_end_date) - new Date(goal.createdAt))/(1000*60*60))) > 24 ?
                "DL : " + (Math.floor((new Date(goal.goal_end_date) - new Date(goal.createdAt))/(1000*60*60*24))+1) : discardGoalAutomatically(goal._id)
          }}

        </div>
        <h3 v-if="!goal.is_finished && !goal.is_discarded" class="p-2 text-red-500 font-normal col-span-2">Ends : {{goal.goal_end_date.slice(0,10)}}</h3>

      </div>





      <button
          @click="goalDetails(goal._id)"
          class="w-full   text-center p-2 font-bold text-white rounded-t-md"
          :class="!goal.is_finished  ? goal.is_discarded ? 'bg-red-500':'bg-emerald-950' : 'bg-green-500'"

      >
        Details
      </button>




      <h1
          v-if="goal.is_finished"
          class="w-full bg-green-500 text-center p-2 font-bold text-white">
        Finished
      </h1>
      <h1
          v-if="goal.is_discarded"
          class="w-full bg-red-500 text-center p-2 font-bold text-white">
        Discarded
      </h1>


    </div>






  </div>
</template>

<style scoped>

</style>