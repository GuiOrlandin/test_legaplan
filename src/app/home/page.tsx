"use client";

import Image from "next/image";

import logoImage from "../../public/logo.svg";

import styles from "@/app/styles/home.module.scss";
import Task from "../components/task";
import { useEffect, useReducer, useState } from "react";
import NewTask from "../components/newTask";
import { v4 as uuidv4 } from "uuid";

export type Task = { id: string; name: string; completed: boolean };

type TaskAction =
  | { type: "addTask"; task: Task }
  | { type: "removeTask"; task: Task }
  | { type: "completeTask"; task: Task }
  | { type: "setTasks"; task: Task[] };

type CompletedTaskAction =
  | { type: "addCompletedTask"; task: Task }
  | { type: "removeCompletedTask"; task: Task }
  | { type: "uncheckTask"; task: Task }
  | { type: "setTasks"; task: Task[] };

function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "addTask":
      return [...state, action.task];
    case "removeTask":
      return state.filter((task) => task.id !== action.task.id);
    case "completeTask":
      return state.map((task) =>
        task.id === action.task.id
          ? { ...task, completed: !task.completed }
          : task
      );
    case "setTasks":
      return action.task;
    default:
      return state;
  }
}

function completedTaskReducer(
  state: Task[],
  action: CompletedTaskAction
): Task[] {
  switch (action.type) {
    case "addCompletedTask":
      return [...state, action.task];
    case "removeCompletedTask":
      return state.filter((task) => task.id !== action.task.id);
    case "uncheckTask":
      return state.map((task) =>
        task.id === action.task.id
          ? { ...task, completed: !task.completed }
          : task
      );
    case "setTasks":
      return action.task;
    default:
      return state;
  }
}

export default function Home() {
  const [addNewTaskModalIsOpen, setAddNewTaskModalIsOpen] =
    useState<boolean>(false);

  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [completedTasks, completedTaskDispatch] = useReducer(
    completedTaskReducer,
    []
  );
  const date = new Date();
  const storedTasks = localStorage.getItem("tasks");
  const storedCompletedTasks = localStorage.getItem("completedTasks");

  const formattedDate = date.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  useEffect(() => {
    if (storedTasks) {
      dispatch({
        type: "setTasks",
        task: JSON.parse(storedTasks!),
      });
    }

    if (storedCompletedTasks) {
      completedTaskDispatch({
        type: "setTasks",
        task: JSON.parse(storedCompletedTasks!),
      });
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      const completedTask = tasks.find((task) => task.completed === true);
      const tasksNotCompleted = tasks.filter((task) => task.completed !== true);
      localStorage.setItem("tasks", JSON.stringify(tasksNotCompleted));

      if (completedTask) {
        completedTaskDispatch({
          type: "addCompletedTask",
          task: completedTask,
        });

        dispatch({
          type: "setTasks",
          task: tasksNotCompleted,
        });
      }
    }

    if (completedTasks.length > 0) {
      const uncheckedTask = completedTasks.find(
        (task) => task.completed === false
      );
      const filteredCompletedTasks = completedTasks.filter(
        (task) => task.completed === true
      );

      localStorage.setItem(
        "completedTasks",
        JSON.stringify(filteredCompletedTasks)
      );

      if (uncheckedTask) {
        dispatch({
          type: "addTask",
          task: uncheckedTask,
        });

        completedTaskDispatch({
          type: "setTasks",
          task: filteredCompletedTasks,
        });
      }
    }
  }, [tasks, completedTasks]);

  return (
    <div className={styles.homePageContainer}>
      <header className={styles.header}>
        <Image src={logoImage} alt="logo image" />

        <h1>Bem-vindo de volta, Marcus</h1>
        <span>{formattedDate}</span>
      </header>

      <div className={styles.cardContainer}>
        <p>Suas tarefas de hoje</p>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Task
              key={task.id}
              removeTask={(task: Task) =>
                dispatch({ type: "removeTask", task: task })
              }
              task={task}
              toggleComplete={(task: Task) =>
                dispatch({ type: "completeTask", task: task })
              }
            />
          ))
        ) : (
          <h2>Nenhuma task adicionada!</h2>
        )}

        <div className={styles.completedTaskContainer}>
          <p>Tarefas finalizadas</p>
          {completedTasks.length > 0 &&
            completedTasks.map((task) => (
              <Task
                key={task.id}
                removeTask={(task: Task) =>
                  completedTaskDispatch({
                    type: "removeCompletedTask",
                    task: task,
                  })
                }
                task={task}
                toggleComplete={(task: Task) =>
                  completedTaskDispatch({ type: "uncheckTask", task: task })
                }
              />
            ))}
        </div>
      </div>

      <NewTask
        isOpen={addNewTaskModalIsOpen}
        toggleModal={() => setAddNewTaskModalIsOpen(!addNewTaskModalIsOpen)}
        addTask={(newTask) =>
          dispatch({
            type: "addTask",
            task: {
              id: uuidv4(),
              name: newTask,
              completed: false,
            },
          })
        }
      />

      <button onClick={() => setAddNewTaskModalIsOpen(true)}>
        Adicionar nova tarefa
      </button>
    </div>
  );
}
