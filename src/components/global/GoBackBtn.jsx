import { Link } from "react-router-dom";
import { Button } from "../Button";
import { ChevronLeft } from "lucide-react";

const GoBackBtn = ({text="back"}) => {
  return (
    <Link to={-1}>
      <Button
        variant="outline"
        color="ghost"
        startIcon={<ChevronLeft className="w-4 h-4" />}
      >
        <span className="">{text}</span>
      </Button>
    </Link>
  );
};

export default GoBackBtn;
