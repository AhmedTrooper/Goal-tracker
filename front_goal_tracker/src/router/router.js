import {createRouter, createWebHashHistory} from "vue-router";
import Homepage from "../views/home/Homepage.vue";
import CreateFormView from "../views/form/CreateFormView.vue";
import CreatedGoalDetails from "../components/form/CreatedGoalDetails.vue";
import goalDetails from "../views/details/GoalDetails.vue";
import Performance from "../views/performance/Performance.vue";
const routes = [
    {
        path:"/",
        component:Homepage
    }, {
    path:"/create_goal",
        component: CreateFormView
    },

    {
        path: "/goal/details",
        component: goalDetails,
        props: true
    },
    {
        path:"/performance",
        component:Performance
    }
]

export const routerFull = createRouter(
    {
        history:createWebHashHistory(),
        routes
    }
);

