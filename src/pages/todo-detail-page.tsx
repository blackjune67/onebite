import { useParams } from "react-router-dom";

export default function TodoDetailPage() {
    const params = useParams();
    const id = params.id();
    return <div>TodoDetailPage</div>;
}