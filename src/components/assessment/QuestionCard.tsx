interface QuestionProps {
  number: number;
  total: number;
  category: string;
  question: string;
}

export default function Question({
  number,
  total,
  category,
  question,
}: QuestionProps) {
  return (
    <div className="my-5">
      {/* <h4>
        Question {number}/{total}
      </h4> */}
      <div className="mb-5">
        <p className="text-red-500 font-semibold text-sm mb-5">{category}</p>
        <hr />
      </div>

      <p className="text-lg">{question}</p>
    </div>
  );
}
