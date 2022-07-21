import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { supabase } from "../supabase";

import WorkoutCard from "../components/WorkoutCard";

export default function Home({ user }) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getWorkouts();
  }, []);

  const getWorkouts = async () => {
    const { data, error } = await supabase.from("workouts").select("*");
    setWorkouts(data);
    setLoading(false);
  };

  if (loading)
    return (
      <div
        style={{
          height: "70vh",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Fetching Workouts...
      </div>
    );
  return (
    <div>
      {!user ? (
        <div className={styles.container}>
          <p>
            Hi there, Welcome to Adrenargy, A workout app to keep logs of your
            Gym Workout activities
          </p>

          <p>Please Login to View your Activity Dashboard</p>
        </div>
      ) : (
        <div className={styles.cardContainer}>
          <h1>Welcome to your dashboard</h1>
          {workouts?.length === 0 && (
            <div>
              <p>You have no workouts yet</p>
              <Link href="/create">
                <button> Create a New One</button>
              </Link>
            </div>
          )}
          <div className={styles.workoutCard}>
            {workouts?.map((workout, index) => {
              return (
                <WorkoutCard
                  key={index}
                  workout={workout}
                  setWorkouts={setWorkouts}
                  setLoading={setLoading}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
