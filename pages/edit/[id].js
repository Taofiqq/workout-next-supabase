import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import toast, { Toaster } from "react-hot-toast";
import styles from "../../styles/Edit.module.css";

const EditPost = () => {
  const [workout, setWorkout] = useState(null);
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getWorkout();

    async function getWorkout() {
      if (!id) return;

      const { data } = await supabase
        .from("workouts")
        .select("*")
        .filter("id", "eq", id)
        .single();
      setWorkout(data);
    }
  }, [id]);

  if (!workout) return null;

  const handleOnChange = (e) => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value,
    });
  };

  const { workoutTitle, workoutLoad, workoutReps } = workout;
  const updateWorkout = async () => {
    const { data } = await supabase
      .from("workouts")
      .update([
        {
          workoutTitle,
          workoutLoad,
          workoutReps,
        },
      ])
      .match({ id });
    toast.success("Workout updated successfully");

    router.push(`/${workout.id}`);
    console.log(data);
  };
  return (
    <div className={styles.container}>
      <h1>Edit Workout</h1>

      <div className={styles.updateWorkout}>
        <label className={styles.label}> Title:</label>
        <input
          type="text"
          name="workoutTitle"
          value={workout.workoutTitle}
          onChange={handleOnChange}
          className={styles.updateInput}
        />
        <label className={styles.label}> Load (kg):</label>
        <input
          type="text"
          name="workoutLoad"
          value={workout.workoutLoad}
          onChange={handleOnChange}
          className={styles.updateInput}
        />
        <label className={styles.label}> Reps:</label>
        <input
          type="text"
          name="workoutReps"
          value={workout.workoutReps}
          onChange={handleOnChange}
          className={styles.updateInput}
        />

        <button onClick={updateWorkout} className={styles.updateButton}>
          Update Workout
        </button>

        <Toaster />
      </div>
    </div>
  );
};

export default EditPost;
