'use client'
import React, { useState, useEffect } from 'react'

interface Question {
    question: string;
    correct_answer: string;
    incorrect_answers: string;
}

interface Answer {
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
}

export default function Quiz() {
    const [questions, setQuestions] = useState<Question[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [answers, setAnswers] = useState<Answer[]>([])
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [isAnswered, setIsAnswered] = useState(false)

    useEffect(() => {
        async function fetcData() {
            const response = await fetch(
                'https://opentdb.com/api.php?amount=5&category=12&difficulty=medium&type=multiple'
            )
            const data = await response.json()
            setQuestions(data.results)
        }
        fetcData();
    }, [])

    const handleAnswer = (answer: string) => {
        if (isAnswered) return;

        const currentQuestion = questions[currentIndex];
        const isCorrect = answer === currentQuestion.correct_answer;

        setAnswers((prev) => [
            ...prev,
            {
                question: currentQuestion.question,
                userAnswer: answer,
                correctAnswer: currentQuestion.correct_answer,
                isCorrect,
            }
        ]);

        setSelectedAnswer(answer);
        setIsAnswered(true);

        setTimeout(() => {
            setCurrentIndex((prev) => prev + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
        }, 15000)
    }

    if (!questions || questions.length === 0) return <p>Loading...</p>;
    if (currentIndex >= questions.length) {
        return (
            <div className="p-5 max-w-xl mx-auto ">
                <h2 className="text-xl font-bold mb-4">Hasil Quiz 🎉</h2>
                {answers.map((ans, index) => (
                    <div key={index} className="mb-4 p-3 border rounded">
                        <p className="font-semibold" dangerouslySetInnerHTML={{ __html: ans.question }} />
                        <p className="text-gray-500">
                            Jawaban Kamu:{" "}
                            <span
                                className={ans.isCorrect ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}
                                dangerouslySetInnerHTML={{ __html: ans.userAnswer }}
                            />
                        </p>
                        <p className="text-gray-500">
                            Jawaban Benar:{" "}
                            <span className="text-green-500 font-semibold" dangerouslySetInnerHTML={{ __html: ans.correctAnswer }} />
                        </p>
                    </div>
                ))}
            </div>
        )
    }

    const currentQuestion = questions[currentIndex];
    const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort();


    return (
        <div className="p-5 max-w-xl mx-auto ">
            <h2 className="text-lg font-bold mb-4" dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />

            <div className="flex flex-col gap-2 text-black">
                {allAnswers.map((answer, index) => (
                    <button
                        key={index}
                        className={`p-2 border rounded ${isAnswered
                                ? answer === currentQuestion.correct_answer
                                    ? "bg-green-500 text-white"
                                    : answer === selectedAnswer
                                        ? "bg-red-500 text-white"
                                        : "bg-gray-200"
                                : "bg-gray-100 hover:bg-gray-200"
                            }`}
                        disabled={isAnswered}
                        onClick={() => handleAnswer(answer)}
                        dangerouslySetInnerHTML={{ __html: answer }}
                    />
                ))}
            </div>

            <p className="mt-3 text-gray-500">Pertanyaan {currentIndex + 1} dari {questions.length}</p>
        </div>
    );
}
