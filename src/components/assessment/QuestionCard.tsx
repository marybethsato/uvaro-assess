interface QuestionProps {
  category: string;
  question: string;
}

export default function Question({ category, question }: QuestionProps) {
  return (
    <div className="my-5">
      <div className="mb-5">
        <p className="text-red-500 font-semibold text-sm mb-5">{category}</p>
        <hr />
      </div>

      <p className="text-lg">{question}</p>
    </div>
  );
}
