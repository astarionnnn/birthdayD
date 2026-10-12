"use client";

import { useState, useRef, useEffect } from "react";
import { animate, stagger } from "animejs";
import confetti from "canvas-confetti";
import { quizConfig } from "@/data/quiz";

export default function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const resultCardRef = useRef<HTMLDivElement>(null);

  const currentQ = quizConfig.questions[currentIndex];
  const isAnswered = selectedOption !== null;

  // Stagger masuk tiap opsi pilihan jawaban saat nomor soal berganti
  useEffect(() => {
    if (!isFinished) {
      const validOptions = optionsRef.current.filter(Boolean);
      if (validOptions.length > 0) {
        animate(validOptions, {
          opacity: [0, 1],
          translateX: [-15, 0],
          delay: stagger(70),
          duration: 400,
          ease: "outQuad",
        });
      }
    }
  }, [currentIndex, isFinished]);

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);

    const isCorrect = idx === currentQ.correctIndex;
    const selectedBtn = optionsRef.current[idx];

    if (isCorrect) {
      setScore((prev) => prev + 1);
      // Animasi bounce selebrasi pada tombol yang benar
      if (selectedBtn) {
        animate(selectedBtn, {
          scale: [1, 1.05, 0.98, 1],
          duration: 350,
          ease: "outBack",
        });
      }
      // Confetti kecil
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
        colors: ["#ff8fab", "#e5486f", "#ffd9c7", "#48cae4"],
      });
    } else {
      // Animasi goyang (shake) saat salah
      if (cardRef.current) {
        animate(cardRef.current, {
          translateX: [-10, 10, -7, 7, -3, 3, 0],
          duration: 350,
          ease: "inOutQuad",
        });
      }
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < quizConfig.questions.length) {
      if (cardRef.current) {
        animate(cardRef.current, {
          opacity: [1, 0],
          translateY: [0, -10],
          duration: 200,
          ease: "inQuad",
        }).then(() => {
          setSelectedOption(null);
          setCurrentIndex((prev) => prev + 1);
          if (cardRef.current) {
            animate(cardRef.current, {
              opacity: [0, 1],
              translateY: [15, 0],
              duration: 350,
              ease: "outQuad",
            });
          }
        });
      } else {
        setSelectedOption(null);
        setCurrentIndex((prev) => prev + 1);
      }
    } else {
      // Selesai kuis
      setIsFinished(true);
      setTimeout(() => {
        if (resultCardRef.current) {
          animate(resultCardRef.current, {
            scale: [0.85, 1],
            opacity: [0, 1],
            duration: 600,
            ease: "outBack",
          });
        }
        // Selebrasi akhir kuis
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      }, 50);
    }
  };

  const handleRestart = () => {
    setIsFinished(false);
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
  };

  const totalQuestions = quizConfig.questions.length;
  const percentage = (score / totalQuestions) * 100;
  const evaluation =
    percentage === 100
      ? quizConfig.results.perfect
      : percentage >= 50
      ? quizConfig.results.good
      : quizConfig.results.remedial;

  return (
    <section
      id="quiz"
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-20 text-center"
    >
      <div className="w-full max-w-xl">
        {/* Header Badge */}
        <div className="inline-block rounded-full bg-peach/70 px-4 py-1 text-xs font-bold uppercase tracking-widest text-rose mb-3">
          {quizConfig.badge}
        </div>

        <h2 className="font-display text-3xl font-bold text-rose sm:text-4xl">
          {quizConfig.title}
        </h2>

        <p className="mt-2 text-sm text-ink/80 sm:text-base max-w-md mx-auto">
          {quizConfig.subtitle}
        </p>

        {/* Tampilan Pertanyaan */}
        {!isFinished ? (
          <div
            ref={cardRef}
            className="mt-8 rounded-3xl border-2 border-blush/80 bg-white/90 p-6 shadow-xl backdrop-blur-md sm:p-8 text-left"
          >
            {/* Header Nomor Pertanyaan & Progress */}
            <div className="flex items-center justify-between text-xs font-bold text-rose mb-3">
              <span>
                Pertanyaan {currentIndex + 1} dari {totalQuestions}
              </span>
              <span>Skor: {score}</span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full rounded-full bg-peach/40 overflow-hidden mb-5">
              <div
                className="h-full bg-rose transition-all duration-300 ease-out"
                style={{
                  width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
                }}
              />
            </div>

            {/* Kalimat Pertanyaan */}
            <h3 className="font-display text-lg font-bold text-ink sm:text-xl leading-snug">
              {currentQ.question}
            </h3>

            {/* Pilihan Opsi */}
            <div className="mt-5 flex flex-col gap-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let btnStyle =
                  "border-peach/70 bg-cream/40 text-ink hover:bg-peach/30";
                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle =
                      "border-emerald-400 bg-emerald-50 text-emerald-900 font-bold";
                  } else if (isSelected) {
                    btnStyle =
                      "border-rose bg-rose/10 text-rose font-semibold";
                  } else {
                    btnStyle = "border-gray-200 bg-gray-50/50 text-ink/40";
                  }
                }

                return (
                  <button
                    key={idx}
                    ref={(el) => {
                      optionsRef.current[idx] = el;
                    }}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`flex items-center justify-between rounded-2xl border-2 p-3.5 text-left text-sm transition-all sm:text-base cursor-pointer disabled:cursor-default ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {isAnswered && isCorrect && <span>✅</span>}
                    {isAnswered && isSelected && !isCorrect && <span>❌</span>}
                  </button>
                );
              })}
            </div>

            {/* Kotak Penjelasan / Pembahasan */}
            {isAnswered && (
              <div className="mt-5 rounded-2xl bg-peach/40 p-4 border border-blush/60">
                <p className="text-xs font-semibold text-rose uppercase tracking-wide">
                  {selectedOption === currentQ.correctIndex
                    ? "🎉 Jawabanmu Tepat!"
                    : "😜 Ups, Kurang Tepat!"}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-ink/90">
                  {currentQ.explanation}
                </p>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="rounded-full bg-rose px-6 py-2 font-display text-xs sm:text-sm font-bold text-white shadow hover:bg-rose/90 transition-transform active:scale-95 cursor-pointer"
                  >
                    {currentIndex + 1 < totalQuestions
                      ? "Lanjut Pertanyaan Berikutnya ➡️"
                      : "Lihat Hasil Akhir 🏆"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Tampilan Hasil Akhir Kuis */
          <div
            ref={resultCardRef}
            className="mt-8 rounded-3xl border-2 border-blush/80 bg-white/95 p-6 shadow-2xl backdrop-blur-md sm:p-8 text-center"
          >
            <div className="text-6xl mb-3">{evaluation.emoji}</div>

            <div className="inline-block rounded-full bg-peach/60 px-4 py-1 text-xs font-bold text-rose mb-2">
              SKOR: {score} / {totalQuestions} ({Math.round(percentage)}%)
            </div>

            <h3 className="font-display text-2xl font-bold text-rose sm:text-3xl">
              {evaluation.title}
            </h3>

            <p className="mt-3 text-sm text-ink/80 sm:text-base max-w-md mx-auto leading-relaxed">
              {evaluation.desc}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleRestart}
                className="w-full sm:w-auto rounded-full border border-rose/40 bg-white px-5 py-2.5 font-display text-xs font-bold text-rose shadow-sm hover:bg-peach/30 transition-colors cursor-pointer"
              >
                🔄 Ulangi Kuis
              </button>

              <a
                href="#runaway"
                className="w-full sm:w-auto rounded-full bg-rose px-6 py-2.5 font-display text-xs font-bold text-white shadow hover:bg-rose/90 transition-transform active:scale-95 cursor-pointer"
              >
                Pertanyaan Pamungkas! 👉
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
