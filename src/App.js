import { useEffect, useState } from 'react';
import styles from './App.module.css';
import ReactGridLayout from './components/ReactGridLayout/ReactGridLayout';
import CustomDropdown from './components/CustomDropdown/CustomDropdown';

function App() {
  const [question, setQuestion] = useState(1);
  const [columns, setColumns] = useState(null);
  const [NumberOfBoxes, setNumberOfBoxes] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(event) {
    setSubmitted(false);
    console.log("submitted", submitted);
    event.preventDefault();
    const data = new FormData(event.target);
    setColumns(Number(data.get('columns')));
    setNumberOfBoxes(Number(data.get('NumberOfBoxes')));
    console.log(typeof (data.get('columns')));
    console.log(data.get('NumberOfBoxes'));
  }

  useEffect(() => {
    if (submitted === false) {
      setSubmitted(true);
    }

  }, [columns, NumberOfBoxes]);

  return (
    <div>
      <div className={styles.container}>
        <h3>Work On Grid Assignment</h3>
        <div className={styles.tabContainer}>
          <div
            className={`${styles.tabButton} ${question === 1 ? styles.active : ''}`}
            onClick={() => setQuestion(1)}
          >
            Question 1
          </div>
          <div
            className={`${styles.tabButton} ${question === 2 ? styles.active : ''}`}
            onClick={() => setQuestion(2)}
          >
            Question 2
          </div>
        </div>
      </div>


      {question === 1 ? (
        <>
          <form className={styles.formContainer} onSubmit={handleSubmit}>
            <label className={styles.formLabel}>
              <span className={styles.labelText}>Columns</span>
              <input type="number" name="columns" className={styles.formInput} />
            </label>
            <label className={styles.formLabel}>
              <span className={styles.labelText}>Number Of Boxes</span>
              <input type="number" name="NumberOfBoxes" className={styles.formInput} />
            </label>
            <input type="submit" value="Submit" className={styles.submitButton} />
          </form>
          {submitted === true
            ?
            <ReactGridLayout columns={columns} NumberOfBoxes={NumberOfBoxes} />
            :
            null
          }
        </>
      ) : (
        <>
          <CustomDropdown />
        </>
      )}
    </div>
  );
}

export default App;
