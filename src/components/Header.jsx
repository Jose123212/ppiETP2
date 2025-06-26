import styles from "./Header.module.css";
import {BookOpenCheck } from "lucide-react";
export function Header() {
  // Desestruturação de props
  return (
    <header className={styles.header1}>
      <BookOpenCheck />
      <h1>Game of Lucky</h1>
    </header>
  );
}