import { useState } from "react";
import {
  Button,
  Checkbox,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import {
  useCreateTodo,
  useDeleteTodo,
  useGetTodos,
  useUpdateTodo,
} from "../queries";

export const TodosContent = () => {
  const [opened, setOpened] = useState(false);

  const { data: todos, isLoading, isError } = useGetTodos();

  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const form = useForm({
    initialValues: {
      title: "",
    },

    validate: {
      title: (value) => {
        if (!value.trim()) {
          return "Название задачи обязательно";
        }

        if (value.trim().length < 5) {
          return "Минимум 5 символов";
        }

        return null;
      },
    },
  });

  const handleCreateTodo = (values: { title: string }) => {
    createTodo.mutate(
      {
        title: values.title.trim(),
        completed: false,
      },
      {
        onSuccess: () => {
          form.reset();
          setOpened(false);
        },
      },
    );
  };

  if (isLoading) {
    return <Text>Загрузка...</Text>;
  }

  if (isError) {
    return <Text>Ошибка при загрузке задач</Text>;
  }

  return (
    <>
      <Stack>
        <Group justify="space-between">
          <Title order={3}>Список задач</Title>

          <Button onClick={() => setOpened(true)}>
            Создать
          </Button>
        </Group>

        <Stack gap="sm">
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
                  flex: 1,
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
      </Stack>

      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          form.reset();
        }}
      >
        <form onSubmit={form.onSubmit(handleCreateTodo)}>
          <Stack>
            <TextInput
              label="Название задачи"
              placeholder="Введите задачу"
              {...form.getInputProps("title")}
            />

            <Group justify="flex-end">
              <Button
                variant="default"
                onClick={() => {
                  setOpened(false);
                  form.reset();
                }}
              >
                Отмена
              </Button>

              <Button
                type="submit"
                loading={createTodo.isPending}
              >
                Создать
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
};