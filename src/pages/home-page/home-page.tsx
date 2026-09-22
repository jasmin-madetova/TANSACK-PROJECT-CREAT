import {
  Card,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Profile2User, AlignLeft } from "iconsax-reactjs";
import { Link } from "react-router-dom";

import { ROUTES } from "../../routes/routes";

const HomePage = () => {
  return (
    <Stack>
      <Title c={"blue"} order={2}>Добро пожаловать!</Title>

      <Text c="black">
        Выберите раздел
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        <Card
          component={Link}
          to={ROUTES.USERS}
          withBorder
          shadow="sm"
          padding="xl"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Stack align="center" gap="sm">
            <Profile2User size={48} />

            <Title order={3}>Users</Title>

            <Text ta="center" c="black">
              USERS
            </Text>
          </Stack>
        </Card>

        <Card
          component={Link}
          to={ROUTES.TODOS}
          withBorder
          shadow="sm"
          padding="xl"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Stack align="center" gap="sm">
            <AlignLeft size={48} />

            <Title order={3} c={"black"}>To-do List</Title>

            <Text ta="center" c="black">
              TODO-LISTS
            </Text>
          </Stack>
        </Card>
      </SimpleGrid>
    </Stack>
  );
};

export default HomePage;