import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "../supabase";
import styles from "../styles/Home.module.css";
import { formatDistanceToNow } from "date-fns/";

const WorkoutCard = ({ workout, setWorkouts, setLoading }) => {
  return (
    <Link href={`/${workout.id}`}>
      <div key={workout.id} className={styles.workoutCardContainer}>
        <div>
          <h1>Title: {workout.workoutTitle}</h1>
          <p>Load (kg):{workout.workoutLoad}</p>
          <p>Reps: {workout.workoutReps}</p>
          <p>
            Date:{" "}
            {formatDistanceToNow(new Date(workout.inserted_at), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
