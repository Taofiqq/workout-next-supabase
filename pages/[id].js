import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { supabase } from "../supabase";
import styles from "../styles/SingleWorkout.module.css";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { formatDistanceToNow } from "date-fns/";

const Workout = ({ workout }) => {
  const router = useRouter();

  const deleteWorkout = async (id) => {
    const { data } = await supabase.from("workouts").delete().match({ id });
    toast.success("Workout deleted successfully");
    setTimeout(() => {
      router.push(`/`);
    }, 2000);
  };
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <h1> Title:{workout.workoutTitle}</h1>
        <p>Load (g): {workout.workoutLoad}</p>
        <p>Reps:{workout.workoutReps}</p>
        <p>
          Date:{" "}
          {formatDistanceToNow(new Date(workout.inserted_at), {
            addSuffix: true,
          })}
        </p>

        <div className={styles.buttons}>
          <Link href={`/edit/${workout.id}`}>
            <a className={styles.edit}>
              <FiEdit />{" "}
            </a>
          </Link>
          <button
            onClick={() => deleteWorkout(workout.id)}
            className={styles.delete}
          >
            <FaTrash />
          </button>
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const { data, error } = await supabase.from("workouts").select("id");
  const paths = data.map((workout) => ({
    params: { id: JSON.stringify(workout.id) },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const { data } = await supabase
    .from("workouts")
    .select()
    .filter("id", "eq", id)
    .single();
  return {
    props: {
      workout: data,
    },
  };
}
export default Workout;
