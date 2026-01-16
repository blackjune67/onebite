import { Link } from "react-router-dom";

export default function IndexPage() {
  return (
    <div>
      <h1>Index</h1>
      <Link to="/counter">Counter 페이지로 이동</Link>
      <Link to="/todoList">Counter 페이지로 이동</Link>
    </div>
  );
}
