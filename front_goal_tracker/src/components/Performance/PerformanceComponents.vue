<template>
  <div class="p-20 h-screen grid justify-items-center items-center">
    <Bar class="w-full" v-if="showChart"
         id="my-chart-id"
         :options="chartOptions"
         :data="chartData"
    />
  </div>

</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import axios from "axios";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      allGoals:[],
      showChart: false,
      chartOptions: {
        responsive: true
      }
    }
  },methods:{
    async fetchGoals(){
      try {
        const url = "http://localhost:3000/api";
        const res = await axios.get(url);
        if(res.status === 200){
          this.allGoals = res.data;
          console.log(res.data)
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  beforeMount() {
    this.showChart = true;
  },
  computed: {
    chartData() {
      return {
        // labels:"Performance",
        labels: ['Totals' ,'Finished', 'Discarded', 'Not Finished' ],
        datasets: [

          {
            label: 'Performance',
            backgroundColor: [ '#789345','#41B883', 'red', '#00D8FF', ],
            data: [this.allGoals.length,this.finishedGoals, this.discardedGoals, this.notFinishedGoals]
          }
        ],

      }
    },
    finishedGoals() {
      return this.allGoals.filter(goal => goal.is_finished).length

    },
    discardedGoals() {
      return this.allGoals.filter(goal => goal.is_discarded).length
    },
    notFinishedGoals() {
      return this.allGoals.filter(goal => !goal.is_finished && !goal.is_discarded).length
    }
  },
  created() {
    this.fetchGoals();
  },

}
</script>