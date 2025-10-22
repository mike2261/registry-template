import { CheckIcon, RotateCcwIcon } from "lucide-react";
import { Button } from "../../ui/button";

export const GameControll = ({
  checkAnswers,
  reset,
  result,
}: {
  checkAnswers: () => void;
  reset: () => void;
  result?: {
    isCorrect: boolean;
    correctCount: number;
    totalCount: number;
  } | null;
}) => {
  return (
    <div className="flex flex-col gap-y-4 w-full">
      {result && (
        <div className="text-center p-4 rounded-lg bg-gray-100">
          {result.isCorrect ? (
            <p className="text-green-600 font-semibold">
              🎉 Chúc mừng! Bạn đã hoàn thành đúng tất cả {result.totalCount}{" "}
              kết nối!
            </p>
          ) : (
            <p className="text-orange-600 font-semibold">
              Bạn đã đúng {result.correctCount}/{result.totalCount} kết nối. Hãy
              thử lại!
            </p>
          )}
        </div>
      )}
      <div className="flex justify-end w-full items-center gap-x-2">
        <Button
          onClick={reset}
          className="rounded-full size-9 border-gray-300 cursor-pointer"
        >
          <RotateCcwIcon className="size-4" />
        </Button>
        <Button onClick={checkAnswers} className="rounded-xl cursor-pointer">
          Kiểm tra
          <CheckIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
};
