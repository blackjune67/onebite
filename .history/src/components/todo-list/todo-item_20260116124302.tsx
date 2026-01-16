import { Button } from "../ui/button";

export default function TodoItem(
    {
        id,
        content
    }: {
id: number;
content: string;
    }) {
    return (<div className="flex items-center justify-between">{content}
    <Button variant={"destructive"}>삭제</Button>
    </div>);
}