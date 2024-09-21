"use client";

import styles from "@/app/styles/task.module.scss";
import trashIcon from "../../public/trashIcon.svg";
import Image from "next/image";
import { useState } from "react";
import NewTask from "./newTask";

interface TaskProps {
  addTask: (task: string) => void;
  removeTask: (task: string) => void;
  taskContent: string;
}

export default function Task({ addTask, taskContent, removeTask }: TaskProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={styles.taskContainer}>
      <div>
        <input id="taskCheckbox" type="checkbox" />
        <label htmlFor="taskCheckbox">{taskContent}</label>
      </div>

      <Image src={trashIcon} alt="trash icon" onClick={() => setIsOpen(true)} />

      <NewTask
        isOpen={isOpen}
        toggleModal={() => setIsOpen(!isOpen)}
        addTask={addTask}
      />
    </div>
  );
}
