import Image from "next/image";

import logoImage from "../../public/logo.svg";

import styles from "@/app/styles/home.module.scss";

export default function Home() {
  const date = new Date();

  const formattedDate = date.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return (
    <div>
      <header className={styles.header}>
        <Image src={logoImage} alt="logo image" />

        <h1>Bem-vindo de volta, Marcus</h1>
        <span>{formattedDate}</span>
      </header>
    </div>
  );
}
