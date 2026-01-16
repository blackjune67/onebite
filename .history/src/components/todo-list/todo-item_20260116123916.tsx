import { Button } from "../ui/button";

export default function TodoItem(
    {
        id,
        content
    }: {
id: number;
content: string;
    }) {
    return <div>{content}
    <Button>삭제</Button>
    </div>;
}