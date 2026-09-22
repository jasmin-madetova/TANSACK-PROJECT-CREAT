import { useState } from "react";
import {
    Button,
    Checkbox,
    Group,
    Stack,
    Text,
    TextInput,
} from "@mantine/core";

import {
    useCreateTodo,
    useDeleteTodo,
    useGetTodos,
    useUpdateTodo,
} from "../queries";

export const TodosContent = () => {
    const [title, setTitle] = useState("");

    const { data: todos, isLoading, isError } = useGetTodos();

    const createTodo = useCreateTodo();
    const updateTodo = useUpdateTodo();
    const deleteTodo = useDeleteTodo();

    const handleCreateTodo = () => {
        if (!title.trim()) return;

        createTodo.mutate({
            title: title.trim(),
            completed: false,
        });

        setTitle("");
    };

    if (isLoading) {
        return <Text>Загрузка...</Text>;
    }

    if (isError) {
        return <Text>Ошибка при загрузке задач</Text>;
    }

    return (
        <Stack>
            <Text size="xl" fw={700}>
                Todo List
            </Text>

            <Group>
                <TextInput
                    placeholder="Введите задачу"
                    value={title}
                    onChange={(event) => setTitle(event.currentTarget.value)}
                    style={{ flex: 1 }}
                />

                <Button onClick={handleCreateTodo}>
                    Добавить
                </Button>
            </Group>

            {todos?.map((todo) => (
                <Group key={todo.id}>
                    <Checkbox
                        checked={todo.completed}
                        onChange={() =>
                            updateTodo.mutate({
                                id: todo.id,
                                completed: !todo.completed,
                            })
                        }
                    />

                    <Text
                        style={{
                            textDecoration: todo.completed
                                ? "line-through"
                                : "none",
                        }}
                    >
                        {todo.title}
                    </Text>

                    <Button
                        color="red"
                        variant="light"
                        onClick={() => deleteTodo.mutate(todo.id)}
                    >
                        Удалить
                    </Button>
                </Group>
            ))}
        </Stack>
    );
};