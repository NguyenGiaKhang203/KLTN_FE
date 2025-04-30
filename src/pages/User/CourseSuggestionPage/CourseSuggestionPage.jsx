import React, { useState, useEffect } from "react";

const QuizPage = () => {
  const [tests, setTests] = useState([]);
  const [currentTest, setCurrentTest] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/suggest-course/get-all-test");
        const data = await response.json();
        setTests(data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };
    fetchTests();
  }, []);

  const startQuiz = (test) => {
    setCurrentTest(test);
    setQuizStarted(true);
    setQuizSubmitted(false);
    setAnswers([]);
    setResult(null);
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => {
      const updated = prev.filter((ans) => ans.questionId !== questionId);
      updated.push({ questionId, answer });
      return updated;
    });
  };

  const submitQuiz = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/suggest-course/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      const resultData = await response.json();
      console.log("Quiz submitted:", resultData);

      setResult(resultData);
      setQuizSubmitted(true);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Chọn Bài Thi</h1>

      {/* Danh sách bài thi */}
      {!quizStarted && (
        <div>
          <h2 style={{ marginBottom: 12 }}>Danh sách bài thi</h2>
          <ul>
            {tests.map((test) => (
              <li key={test._id} style={{ marginBottom: 8 }}>
                <button onClick={() => startQuiz(test)}>
                  {test.testName || test.courseType}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Giao diện làm bài */}
      {quizStarted && !quizSubmitted && (
        <div>
          <h2>Bài thi: {currentTest.testName || currentTest.courseType}</h2>
          {currentTest.questions.map((question) => (
            <div key={question._id} style={{ marginBottom: "16px" }}>
              <p><strong>{question.questionText}</strong></p>
              {question.options.map((option, index) => (
                <label key={index} style={{ display: "block", marginBottom: 4 }}>
                  <input
                    type="radio"
                    name={`question-${question.questionId}`}
                    value={option}
                    onChange={() => handleAnswerChange(question.questionId, option)}
                  />
                  {" "}{option}
                </label>
              ))}
            </div>
          ))}
          <button onClick={submitQuiz}>Nộp bài</button>
        </div>
      )}

      {/* Kết quả bài thi */}
      {quizSubmitted && result && (
        <div style={{ marginTop: 20 }}>
          <h2>🎉 Bài thi đã nộp thành công!</h2>

          {/* Nếu bạn muốn hiển thị độ chính xác hoặc điểm */}
          {/* <p><strong>Độ chính xác:</strong> {result.accuracy}</p>
          <p><strong>Trình độ:</strong> {result.level}</p> */}

          <h3>📚 Khóa học gợi ý:</h3>
          {result.courses && result.courses.length > 0 ? (
            <ul>
              {result.courses.map((course, index) => (
                <li key={index}>
                  <strong>{course.name}</strong> (Mã: {course.courseCode})
                </li>
              ))}
            </ul>
          ) : (
            <p>Không có khóa học gợi ý.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizPage;
