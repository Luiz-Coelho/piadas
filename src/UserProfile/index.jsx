import UserProfileForm from "./UserProfileForm";

import styles from "./UserProfile.module.css";

export default function UserProfile() {
  return (
    <section className={styles.section_container}>
      <UserProfileForm></UserProfileForm>
    </section>
  );
}
