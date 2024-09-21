"use client";

import Image from "next/image";

import logoImage from "../../public/logo.svg";

import styles from "@/app/styles/home.module.scss";
import Task from "../components/task";
import { useReducer, useState } from "react";

type Task = string;

type TaskAction =
  | { type: "addTask"; task: Task }
  | { type: "removeTask"; task: Task };

function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "addTask":
      return [...state, action.task];
    case "removeTask":
      return state.filter((task) => task !== action.task);
    default:
      return state;
  }
}

export default function Home() {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const date = new Date();

  const formattedDate = date.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return (
    <div className={styles.homePageContainer}>
      <header className={styles.header}>
        <Image src={logoImage} alt="logo image" />

        <h1>Bem-vindo de volta, Marcus</h1>
        <span>{formattedDate}</span>
      </header>

      <div className={styles.cardContainer}>
        <Task
          addTask={(newTask) => dispatch({ type: "addTask", task: newTask })}
          removeTask={(task) => dispatch({ type: "removeTask", task: task })}
          taskContent="lavar a mão"
        />
      </div>
    </div>
  );
}
