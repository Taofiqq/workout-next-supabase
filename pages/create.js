import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import toast, { Toaster } from "react-hot-toast";
import styles from "../styles/Create.module.css";
import { useRouter } from "next/router";

const Create = () => {
  const router = useRouter();

  const initialState = {
    workoutTitle: "",
    workoutLoad: "",
    workoutReps: "",
  };

  const [workoutData, setWorkoutData] = useState(initialState);

  const { workoutTitle, workoutLoad, workoutReps } = workoutData;

  const handleOnChange = (e) => {
    setWorkoutData({
      ...workoutData,
      [e.target.name]: e.target.value,
    });
  };

  const createWorkout = async () => {
    const user = supabase.auth.user();

    const { data, error } = await supabase
      .from("workouts")
      .insert([
        {
          workoutTitle,
          workoutLoad,
          workoutReps,
          user_id: user.id,
          user_email: user.email,
        },
      ])
      .single();
    toast.success("Workout created successfully");
    setWorkoutData(initialState);
    setTimeout(() => {
      router.push(`/`);
    }, 2000);
  };
  return (
    <div className={styles.createContainer}>
      <p>Create a New Workout</p>

      <div className={styles.createForm}>
        <label className={styles.label}>Title:</label>
        <input
          type="text"
          name="workoutTitle"
          value={workoutTitle}
          onChange={handleOnChange}
          className={styles.createInput}
        />
        <label className={styles.label}>Load (kg):</label>
        <input
          type="text"
          name="workoutLoad"
          value={workoutLoad}
          onChange={handleOnChange}
          className={styles.createInput}
        />
        <label className={styles.label}>Reps:</label>
        <input
          type="text"
          name="workoutReps"
          value={workoutReps}
          onChange={handleOnChange}
          className={styles.createInput}
        />

        <button className={styles.createButton} onClick={createWorkout}>
          Create Workout
        </button>

        <Toaster />
      </div>
    </div>
  );
};

export default Create;
