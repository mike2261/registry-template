import { CheckIcon, RotateCcwIcon } from "lucide-react";
import { Button } from "../../ui/button";

export const GameControll = ({
  checkAnswers,
  reset,
}: {
  checkAnswers: () => void;
  reset: () => void;
}) => {
  return (
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
  );
};

