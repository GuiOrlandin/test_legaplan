import styles from "@/app/styles/newTask.module.scss";
import { useState } from "react";

interface NewTaskProps {
  isOpen: boolean;
  toggleModal: () => void;
  addTask: (task: string) => void;
}

export default function NewTask({
  isOpen,
  addTask,
  toggleModal,
}: NewTaskProps) {
  const [task, setTask] = useState<string>("");

  function handleAddTask() {
    setTask(task);
    toggleModal();
  }

  return (
    <>
      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.newTaskContainer}>
            <h1>Nova tarefa</h1>
            <div>
              <p>Titulo</p>
              <input
                type="text"
                id="taskName"
                onChange={(e) => setTask(e.target.value)}
                placeholder="Digite"
              />
            </div>

            <div>
              <button onClick={() => toggleModal()}>Cancelar</button>
              <button onClick={() => handleAddTask()}>Adicionar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
