import React, { useState, useEffect } from "react";
import {
  Container,
  TestListContainer,
  QuestionContainer,
  OptionLabel,
  StyledButton,
  ResultContainer,
  CustomTitle,
  StyledList,
  CourseItemLink,
} from "./style";
import { Typography } from "antd";
import { Link } from "react-router-dom";

const { Paragraph } = Typography;

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

      // Tính số câu đúng nếu có correctAnswer từ currentTest
      let correctCount = 0;
      if (currentTest && currentTest.questions) {
        correctCount = currentTest.questions.reduce((count, question) => {
          const userAnswer = answers.find((a) => a.questionId === question.questionId)?.answer;
          if (userAnswer === question.correctAnswer) count += 1;
          return count;
        }, 0);
      }

      setResult({ ...resultData, correctCount });
      setQuizSubmitted(true);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  return (
    <Container>
      <CustomTitle level={2}>Chọn Bài Thi</CustomTitle>

      {!quizStarted && (
        <TestListContainer>
          <ul>
            {tests.map((test) => (
              <li key={test._id}>
                <StyledButton onClick={() => startQuiz(test)} type="primary">
                  {test.testName || test.courseType}
                </StyledButton>
              </li>
            ))}
          </ul>
        </TestListContainer>
      )}

      {quizStarted && !quizSubmitted && currentTest && (
        <div>
          <CustomTitle level={4}>Bài thi: {currentTest.testName || currentTest.courseType}</CustomTitle>
          {currentTest.questions.map((question) => (
            <QuestionContainer key={question._id}>
              <Paragraph strong>{question.questionText}</Paragraph>
              {question.options.map((option, index) => (
                <OptionLabel key={index}>
                  <input
                    type="radio"
                    name={`question-${question.questionId}`}
                    value={option}
                    onChange={() => handleAnswerChange(question.questionId, option)}
                  />
                  {option}
                </OptionLabel>
              ))}
            </QuestionContainer>
          ))}
          <StyledButton type="primary" onClick={submitQuiz}>
            Nộp bài
          </StyledButton>
        </div>
      )}

      {quizSubmitted && result && (
        <ResultContainer>
          <CustomTitle level={3}>🎉 Bài thi đã nộp thành công!</CustomTitle>

          <Typography.Title level={4}>
            ✅ Bạn trả lời đúng {result.correctCount} / {currentTest.questions.length} câu hỏi
          </Typography.Title>

          <Typography.Title level={4}>📚 Khóa học gợi ý:</Typography.Title>
          {result.courses && result.courses.length > 0 ? (
            <StyledList
              bordered
              dataSource={result.courses}
              renderItem={(course) => (
                <CourseItemLink>
                  <Link to={`/course-details/${course._id}`}>
                    {course.name} (Mã: {course.courseCode})
                  </Link>
                </CourseItemLink>
              )}
            />
          ) : (
            <Paragraph>Không có khóa học gợi ý.</Paragraph>
          )}
        </ResultContainer>
      )}
    </Container>
  );
};

export default QuizPage;
