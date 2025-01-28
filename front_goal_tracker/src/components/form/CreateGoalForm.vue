<script>
import axios from 'axios';

export default {
  name: "CreateGoalForm",
  data() {
    return {
      goal_name: '',
      goal_description: '',
      goal_start_date: '',
      goal_end_date: '',
      isEmpty: true,
      isOk : false,
      serverResponse : null

    };
  },
  methods: {
async handleSubmit() {
  const url = 'http://localhost:3000/create_goal';
  const newGoal = {
    goal_name : this.goal_name,
    goal_description : this.goal_description,
    goal_end_date : this.goal_end_date,
  };
 const res = await axios.post(url,newGoal);
  if(res.status === 200) {
    this.serverResponse = res.data;
    this.$router.push('/',{query:{serverResponse : this.serverResponse}});


  }
},
    validateForm() {
      (this.goal_name ==="" || this.goal_description ==="" || this.goal_end_date ==="") ? this.isEmpty = true : this.isEmpty = false ;
      (this.goal_name ==="" || this.goal_description ===""  || this.goal_end_date ==="") ? this.isOk = false : this.isOk = true ;

    },
    clickDatePicker() {
      this.$refs.datePicker.showPicker()


    },
    datePickerHandler(){
      this.goal_end_date = this.$refs.datePicker.value
    }
  },
  watch: {
    goal_name() {
this.validateForm();
  },
    goal_description() {
      this.validateForm();
    },
    goal_start_date() {
      this.validateForm();
    },
    goal_end_date() {
      this.validateForm();
    }
  }
}

</script>

<template>
  <div class="bg-gray500 form_section w-screen h-fit md:h-screen grid items-center justify-items-center">
    <form :class="isOk ? 'border-green-500 border' : 'border-none'" action="http://localhost:3000/create_goal" method="post" @submit.prevent="handleSubmit"
          class=" card  grid p-10 gap-5 w-fit border-black-500 shadow-md shadow-black justify-self-center
 rounded-md">
      <h1 v-if="isEmpty" class="text-red-500 font-bold p-1 grid content-center justify-items-center">No field can be empty</h1>

      <label for="goal_name" class="font-bold text-black  justify-self-center">Goal :</label>
      <input type="text" name="goal_name" v-model="goal_name" class="font-medium text-black outline-none p-3 rounded-md border-[1px]]">
      <label for="goal_description" class="justify-self-center font-bold">Description :</label>
      <textarea type="text" name="goal_description" v-model="goal_description" rows="5"
                class="font-normal outline-none p-3 rounded-md border-[1px] border-gray-800"></textarea>

      <div class="grid font-bold grid-cols-2 w-fit date_picker_container  p-2 justify-items-center">
        <input  ref="datePicker" type="date" class= "hidden ml-96 justify-self-center select-none h-fit font-bold p-2 text-white rounded-md" name="goal_end_date" v-model="goal_end_date">
        <img @click="clickDatePicker" src="/deadline.gif" alt="Calendar" class="w-12 cursor-pointer float-left">
        <h1 v-if="goal_end_date" class=" w-fit grid content-center justify-items-center">End : {{goal_end_date}}</h1>
      </div>



      <button v-if="!isEmpty" class="w-fit p-3 text-white bg-black rounded-md font-medium border-[0px] outline-none justify-self-center" type="submit" >Add Goal</button>
    </form>

  </div>
</template>

<style scoped>
input {
  border: 1px solid black
}
</style>