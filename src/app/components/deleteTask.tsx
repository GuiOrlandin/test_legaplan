import styles from "@/app/styles/deleteTask.module.scss";

interface DeleteTaskProps {
  isOpen: boolean;
  toggleModal: () => void;
  removeTask: () => void;
}

export default function DeleteTask({
  isOpen,
  removeTask,
  toggleModal,
}: DeleteTaskProps) {
  return (
    <>
      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.deleteTaskContainer}>
            <h1>Deletar tarefa</h1>
            <p>Tem certeza que você deseja deletar essa tarefa?</p>

            <div>
              <button onClick={() => toggleModal()}>Cancelar</button>
              <button onClick={() => removeTask()}>Deletar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
