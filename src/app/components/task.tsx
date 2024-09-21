"use client";

import styles from "@/app/styles/task.module.scss";
import trashIcon from "../../public/trashIcon.svg";
import Image from "next/image";
import { useState } from "react";
import DeleteTask from "./deleteTask";
import type { Task } from "@/app/home/page";

interface TaskProps {
  removeTask: (task: Task) => void;
  task: Task;
  toggleComplete?: (task: Task) => void;
}

export default function Task({ task, removeTask, toggleComplete }: TaskProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={styles.taskContainer}>
      <div>
        <input
          id={task.id}
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete!(task)}
        />
        <label htmlFor={task.id}>{task.name}</label>
      </div>

      <DeleteTask
        isOpen={isOpen}
        removeTask={() => removeTask(task)}
        toggleModal={() => setIsOpen(false)}
      />
      <Image src={trashIcon} alt="trash icon" onClick={() => setIsOpen(true)} />
    </div>
  );
}
