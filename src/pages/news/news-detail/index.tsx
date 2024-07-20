import FormNews from "@/components/form-news";
import { useParams } from "react-router-dom";

const NewsDetail = () => {
  const { id } = useParams();
  return (
    <div>
      <FormNews id={Number(id)} />
    </div>
  );
};

export default NewsDetail;
