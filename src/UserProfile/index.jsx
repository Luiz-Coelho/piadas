import UserProfileForm from "./UserProfileForm";

import styles from "./UserProfile.module.css";
import Container from "../components/Container";

export default function UserProfile() {
  return (
    <Container>
      <section className={styles.section_container}>
        <UserProfileForm></UserProfileForm>
      </section>
    </Container>
  );
}
