import { Auth, Typography, Button } from "@supabase/ui";
import { supabase } from "../supabase";
const { Text } = Typography;
import styles from "../styles/Profile.module.css";

function User(props) {
  const { user } = Auth.useUser();
  if (user)
    return (
      <>
        <Text>Signed in: {user.email}</Text>
        <Button block onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </Button>
      </>
    );
  return props.children;
}

export default function AuthProfile() {
  return (
    <div className={styles.profileContainer}>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <User supabaseClient={supabase}>
          <Auth
            supabaseClient={supabase}
            providers={["google", "facebook", "github"]}
            style={{
              width: "50%",
            }}
          />
        </User>
      </Auth.UserContextProvider>
    </div>
  );
}
