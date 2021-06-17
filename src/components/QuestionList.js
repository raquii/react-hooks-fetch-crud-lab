import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => {
        setQuestions(questions);
      });
  }, []);

  const questionItems = questions.map(question=>{
    return <QuestionItem key={question.id} question={question} onDelete={handleDelete} onAnswerChange={handleChange} />
  });

  function handleDelete(id){
    fetch(`http://localhost:4000/questions/${id}`, {method: "DELETE"})
    .then(r=>r.json())
    .then(() =>{
      const updatedQuestions = questions.filter(question=> question.id !==id)

      setQuestions(updatedQuestions)
    });
  }

  function handleChange(id, correctIndex){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map(question => {
          if (question.id === updatedQuestion.id) return updatedQuestion;

          return question;
        });

        setQuestions(updatedQuestions)
      });
  }
  

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
