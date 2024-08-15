

import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    jobs: data.job_postings,
    current: "Most relevant",
};

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        jobOrder(state, action) {
            if (action.payload === "relevant") {
                state.jobs = data.job_postings;
                state.current = "Most relevant";
            } else if (action.payload === "alphabet") {
                const sortedJobs = [...state.jobs].sort((a, b) => a.title.localeCompare(b.title));
                state.jobs = sortedJobs;
                state.current = "Alphabetically";
            }
        },

    },
});

export const { jobOrder } = dataSlice.actions;
export default dataSlice;


// const jobOrder = (flag: string) => {
//     if (flag === "relevant") {
//       // Reset to the original order
//       setJobs(data.job_postings);
//       setCurrent("Most relevant");
//     } else if (flag === "alphabet") {
//       // Sort alphabetically by title
//       const sortedJobs = [...jobs].sort((a, b) => a.title.localeCompare(b.title));
//       setJobs(sortedJobs);
//       setCurrent("Alphabetically");
//     }
//   }